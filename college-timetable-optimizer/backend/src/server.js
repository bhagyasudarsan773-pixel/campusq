import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { getConfig, updateQualcommConfig } from './config/env.js';
import {
  DAYS,
  DAY_LABELS,
  TIME_SLOTS,
  SEMESTERS,
  DEPARTMENTS,
  FACULTY,
  CLASSROOMS,
  BATCHES,
  COURSES,
  PRESET_SCHEDULES,
} from './data/seedData.js';
import { detectConflicts } from './engine/conflictDetector.js';
import { optimizeTimetable } from './engine/cspSolver.js';
import {
  analyzeConflictsWithQualcommAI,
  chatWithQualcommCopilot,
  verifyQualcommConnection,
} from './services/qualcommAiService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FRONTEND_DIR = path.resolve(__dirname, '../../frontend');

const BATCH_COLORS = ['#3b82f6', '#8b5cf6', '#14b8a6', '#f97316', '#ec4899', '#10b981'];

const state = {
  activePreset: 'whole-college-conflict',
  resources: {
    semesters: structuredClone(SEMESTERS),
    departments: structuredClone(DEPARTMENTS),
    faculty: structuredClone(FACULTY),
    classrooms: structuredClone(CLASSROOMS),
    batches: structuredClone(BATCHES),
    courses: structuredClone(COURSES),
  },
  sessions: structuredClone(PRESET_SCHEDULES['whole-college-conflict'].sessions),
  lastOptimizationResult: null,
};

function buildFullStatePayload() {
  const conflictReport = detectConflicts(state.sessions, state.resources);
  const optimizationPreview = optimizeTimetable(state.sessions, state.resources);
  const cfg = getConfig();

  return {
    activePreset: state.activePreset,
    presets: Object.entries(PRESET_SCHEDULES).map(([key, val]) => ({
      key,
      name: val.name,
      description: val.description,
      sessionCount: val.sessions.length,
    })),
    metadata: {
      days: DAYS,
      dayLabels: DAY_LABELS,
      timeSlots: TIME_SLOTS,
      semesters: state.resources.semesters,
      departments: state.resources.departments,
    },
    resources: state.resources,
    conflictReport,
    optimizationPreview: {
      resolutionLog: optimizationPreview.resolutionLog,
      telemetry: optimizationPreview.telemetry,
      afterSummary: optimizationPreview.afterReport.summary,
    },
    lastOptimizationResult: state.lastOptimizationResult,
  };
}

function sendJson(res, statusCode, data) {
  const payload = JSON.stringify(data);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Qualcomm-Api-Key',
  });
  res.end(payload);
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1e6) {
        reject(new Error('Request body too large'));
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error('Invalid JSON payload'));
      }
    });
    req.on('error', reject);
  });
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

export function createAppServer() {
  return http.createServer(async (req, res) => {
    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Qualcomm-Api-Key',
      });
      return res.end();
    }

    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const pathname = url.pathname;

    try {
      if (pathname === '/api/health' && req.method === 'GET') {
        const cfg = getConfig();
        return sendJson(res, 200, {
          status: 'ok',
          service: 'College Timetable Optimizer API',
          qualcommAiConfigured: cfg.hasQualcommKey,
          model: cfg.qualcommModel,
          timestamp: new Date().toISOString(),
        });
      }

      if (pathname === '/api/state' && req.method === 'GET') {
        return sendJson(res, 200, buildFullStatePayload());
      }

      // Clear all classes so the user can build their own timetable from scratch
      if (pathname === '/api/schedule/clear' && req.method === 'POST') {
        state.activePreset = 'empty';
        state.sessions = [];
        state.lastOptimizationResult = null;
        return sendJson(res, 200, buildFullStatePayload());
      }

      if (pathname === '/api/schedule/preset' && req.method === 'POST') {
        const body = await parseJsonBody(req);
        const presetKey = body.preset || 'simple-example';
        if (presetKey === 'empty') {
          state.activePreset = 'empty';
          state.sessions = [];
          state.lastOptimizationResult = null;
          return sendJson(res, 200, buildFullStatePayload());
        }
        const preset = PRESET_SCHEDULES[presetKey];
        if (!preset) {
          return sendJson(res, 400, { error: `Unknown preset: ${presetKey}` });
        }
        state.activePreset = presetKey;
        state.sessions = structuredClone(preset.sessions);
        state.lastOptimizationResult = null;
        return sendJson(res, 200, buildFullStatePayload());
      }

      // Flexible user input endpoint: allows typing custom Department, Subject, Teacher, Batch (+ Size), and Room (+ Capacity)
      // or picking existing ones!
      if (pathname === '/api/schedule/custom-entry' && req.method === 'POST') {
        const body = await parseJsonBody(req);
        const {
          deptCode: rawDeptCode = 'CSE',
          customDeptName,
          semester: rawSemester = 3,
          subjectTitle,
          requiredRoomType = 'LECTURE',
          teacherName,
          batchName,
          batchSize = 60,
          roomId,
          customRoomName,
          customRoomCapacity = 60,
          customRoomType = 'LECTURE',
          day = 'Mon',
          slot = '09:00 - 10:00',
        } = body;

        if (!subjectTitle || !teacherName || !batchName) {
          return sendJson(res, 400, {
            error: 'Subject, Teacher Name, and Student Batch are required.',
          });
        }

        const resolvedSem = Number(rawSemester) >= 1 && Number(rawSemester) <= 8 ? Number(rawSemester) : 3;

        // 0. Resolve or create Department
        let resolvedDeptCode = rawDeptCode === 'ALL' ? 'CSE' : rawDeptCode;
        let resolvedDeptName = 'Computer Science & Engineering (CSE)';
        if (customDeptName && customDeptName.trim()) {
          const cleanDept = customDeptName.trim();
          const shortCode = cleanDept
            .replace(/[^A-Za-z]/g, '')
            .slice(0, 4)
            .toUpperCase() || 'DEPT';
          let existingDept = state.resources.departments.find(
            (d) => d.name.toLowerCase() === cleanDept.toLowerCase() || d.id === shortCode
          );
          if (!existingDept) {
            existingDept = { id: shortCode, code: shortCode, name: cleanDept };
            state.resources.departments.push(existingDept);
          }
          resolvedDeptCode = existingDept.id;
          resolvedDeptName = existingDept.name;
        } else {
          const foundDept = state.resources.departments.find((d) => d.id === resolvedDeptCode);
          if (foundDept) {
            resolvedDeptName = foundDept.name;
          }
        }

        // 1. Find or create Faculty
        let fac = state.resources.faculty.find(
          (f) => f.name.toLowerCase() === teacherName.trim().toLowerCase() || f.id === teacherName
        );
        if (!fac) {
          fac = {
            id: `F${state.resources.faculty.length + 1}`,
            name: teacherName.trim(),
            department: resolvedDeptName,
            deptCode: resolvedDeptCode,
            specialization: subjectTitle.trim(),
            maxDailyHours: 4,
            unavailableSlots: [],
            avatarColor: '#6366f1',
          };
          state.resources.faculty.push(fac);
        }

        // 2. Find or create Student Batch (and update size if specified)
        let batch = state.resources.batches.find(
          (b) => b.name.toLowerCase() === batchName.trim().toLowerCase() || b.id === batchName
        );
        const parsedBatchSize = Number(batchSize) > 0 ? Number(batchSize) : 60;
        if (!batch) {
          batch = {
            id: `B${state.resources.batches.length + 1}`,
            name: batchName.trim(),
            size: parsedBatchSize,
            department: resolvedDeptName,
            deptCode: resolvedDeptCode,
            semester: resolvedSem,
            color: BATCH_COLORS[state.resources.batches.length % BATCH_COLORS.length],
          };
          state.resources.batches.push(batch);
        } else if (body.batchSize !== undefined && Number(body.batchSize) > 0) {
          batch.size = Number(body.batchSize);
        }

        // 3. Find or create Classroom
        let room = null;
        if (customRoomName && customRoomName.trim()) {
          room = state.resources.classrooms.find(
            (r) => r.name.toLowerCase() === customRoomName.trim().toLowerCase()
          );
          if (!room) {
            room = {
              id: `R${state.resources.classrooms.length + 1}`,
              name: customRoomName.trim(),
              capacity: Number(customRoomCapacity) || 60,
              type: customRoomType || requiredRoomType || 'LECTURE',
              building: `${resolvedDeptCode} Block`,
              features: [],
            };
            state.resources.classrooms.push(room);
          }
        } else {
          room =
            state.resources.classrooms.find((r) => r.id === roomId || r.name === roomId) ||
            state.resources.classrooms[0];
        }

        // 4. Find or create Course
        let course = state.resources.courses.find(
          (c) =>
            c.title.toLowerCase() === subjectTitle.trim().toLowerCase() &&
            c.requiredRoomType === requiredRoomType
        );
        if (!course) {
          const nextIdx = state.resources.courses.length + 1;
          course = {
            id: `C${nextIdx}`,
            code: `${resolvedDeptCode}${resolvedSem * 100 + nextIdx}`,
            title: subjectTitle.trim(),
            department: resolvedDeptName,
            deptCode: resolvedDeptCode,
            semester: resolvedSem,
            facultyId: fac.id,
            batchId: batch.id,
            secondaryBatchIds: [],
            requiredRoomType: requiredRoomType || 'LECTURE',
            weeklySessions: 1,
          };
          state.resources.courses.push(course);
        }

        // 5. Create scheduled session
        const nextNum =
          state.sessions.reduce((max, s) => {
            const m = /^S(\d+)$/.exec(s.id);
            return m ? Math.max(max, Number(m[1])) : max;
          }, 0) + 1;

        state.sessions.push({
          id: `S${nextNum}`,
          courseId: course.id,
          facultyId: fac.id,
          batchId: batch.id,
          roomId: room.id,
          semester: batch.semester || course.semester || resolvedSem,
          day,
          slot,
        });

        state.activePreset = 'custom';
        state.lastOptimizationResult = null;
        return sendJson(res, 200, buildFullStatePayload());
      }

      // Natural Language Timetable Parser for Hackathon Live Demo
      if (pathname === '/api/schedule/nl-add' && req.method === 'POST') {
        const body = await parseJsonBody(req);
        const text = (body.prompt || '').trim();
        if (!text) {
          return sendJson(res, 400, { error: 'Please enter a scheduling sentence.' });
        }

        const lower = text.toLowerCase();

        // Match Day
        let day = 'Mon';
        if (lower.includes('tue')) day = 'Tue';
        else if (lower.includes('wed')) day = 'Wed';
        else if (lower.includes('thu')) day = 'Thu';
        else if (lower.includes('fri')) day = 'Fri';

        // Match Time Slot
        let slot = '09:00 - 10:00';
        if (lower.includes('10:00') || lower.includes('10 am') || lower.includes('10am')) {
          slot = '10:00 - 11:00';
        } else if (lower.includes('11:00') || lower.includes('11 am') || lower.includes('11am')) {
          slot = '11:00 - 12:00';
        } else if (lower.includes('01:00') || lower.includes('1 pm') || lower.includes('1pm') || lower.includes('13:00')) {
          slot = '01:00 - 02:00';
        } else if (lower.includes('02:00') || lower.includes('2 pm') || lower.includes('2pm') || lower.includes('14:00')) {
          slot = '02:00 - 03:00';
        }

        // Match Classroom
        let room =
          state.resources.classrooms.find((r) => lower.includes(r.name.toLowerCase())) ||
          state.resources.classrooms[0];

        // Match Batch
        let batch =
          state.resources.batches.find((b) => lower.includes(b.name.toLowerCase())) ||
          (lower.includes('it')
            ? state.resources.batches.find((b) => b.name.includes('IT'))
            : lower.includes('2nd')
            ? state.resources.batches.find((b) => b.name.includes('2nd'))
            : state.resources.batches[0]);

        // Match Teacher
        let fac =
          state.resources.faculty.find(
            (f) =>
              lower.includes(f.name.toLowerCase()) ||
              lower.includes(f.name.split(' ').pop().toLowerCase())
          ) || state.resources.faculty[0];

        // Match Course or extract Subject
        let course = state.resources.courses.find((c) =>
          lower.includes(c.title.toLowerCase())
        );

        if (!course) {
          const isLab = lower.includes('lab');
          const nextIdx = state.resources.courses.length + 1;
          const extractedTitle =
            text.match(/schedule\s+(.+?)\s+(?:by|with|for|in|on)\b/i)?.[1] ||
            'Custom AI Subject';
          course = {
            id: `C${nextIdx}`,
            code: `SUB${100 + nextIdx}`,
            title: extractedTitle.trim(),
            facultyId: fac.id,
            batchId: batch.id,
            secondaryBatchIds: [],
            requiredRoomType: isLab ? 'COMPUTER_LAB' : 'LECTURE',
            weeklySessions: 1,
          };
          state.resources.courses.push(course);
        }

        const nextNum =
          state.sessions.reduce((max, s) => {
            const m = /^S(\d+)$/.exec(s.id);
            return m ? Math.max(max, Number(m[1])) : max;
          }, 0) + 1;

        state.sessions.push({
          id: `S${nextNum}`,
          courseId: course.id,
          facultyId: fac.id,
          batchId: batch.id,
          roomId: room.id,
          day,
          slot,
        });

        state.activePreset = 'custom';
        state.lastOptimizationResult = null;
        return sendJson(res, 200, buildFullStatePayload());
      }

      if (pathname === '/api/schedule/session' && req.method === 'POST') {
        const body = await parseJsonBody(req);
        const { id, courseId, facultyId, batchId, roomId, day, slot } = body;

        if (!courseId || !roomId || !day || !slot) {
          return sendJson(res, 400, {
            error: 'courseId, roomId, day, and slot are required fields.',
          });
        }

        const course = state.resources.courses.find((c) => c.id === courseId);
        const resolvedFacultyId = facultyId || course?.facultyId || 'F1';
        const resolvedBatchId = batchId || course?.batchId || 'B1';

        if (id) {
          const existingIdx = state.sessions.findIndex((s) => s.id === id);
          if (existingIdx !== -1) {
            state.sessions[existingIdx] = {
              ...state.sessions[existingIdx],
              courseId,
              facultyId: resolvedFacultyId,
              batchId: resolvedBatchId,
              roomId,
              day,
              slot,
            };
          } else {
            state.sessions.push({
              id,
              courseId,
              facultyId: resolvedFacultyId,
              batchId: resolvedBatchId,
              roomId,
              day,
              slot,
            });
          }
        } else {
          const nextNum =
            state.sessions.reduce((max, s) => {
              const m = /^S(\d+)$/.exec(s.id);
              return m ? Math.max(max, Number(m[1])) : max;
            }, 0) + 1;
          state.sessions.push({
            id: `S${nextNum}`,
            courseId,
            facultyId: resolvedFacultyId,
            batchId: resolvedBatchId,
            roomId,
            day,
            slot,
          });
        }

        state.activePreset = 'custom';
        return sendJson(res, 200, buildFullStatePayload());
      }

      if (pathname.startsWith('/api/schedule/session/') && req.method === 'DELETE') {
        const sessionId = decodeURIComponent(pathname.replace('/api/schedule/session/', ''));
        state.sessions = state.sessions.filter((s) => s.id !== sessionId);
        state.activePreset = 'custom';
        return sendJson(res, 200, buildFullStatePayload());
      }

      // Add custom Department / Course / Teacher / Classroom / Student Batch directly
      if (pathname === '/api/resources/add' && req.method === 'POST') {
        const body = await parseJsonBody(req);
        const { category } = body;
        const matchedDept = state.resources.departments.find(
          (d) => d.id === body.deptCode || d.name === body.department
        );
        const deptName = matchedDept ? matchedDept.name : body.department || 'Computer Science & Engineering (CSE)';
        const deptCode = matchedDept ? matchedDept.id : body.deptCode || 'CSE';
        const resolvedSem = Number(body.semester) >= 1 && Number(body.semester) <= 8 ? Number(body.semester) : 3;

        if (category === 'DEPARTMENT' && body.name) {
          const cleanCode = (body.code || body.name)
            .replace(/[^A-Za-z]/g, '')
            .slice(0, 5)
            .toUpperCase() || `D${state.resources.departments.length + 1}`;
          if (!state.resources.departments.some((d) => d.id === cleanCode)) {
            state.resources.departments.push({
              id: cleanCode,
              code: cleanCode,
              name: body.name.trim(),
            });
          }
        } else if (category === 'COURSE' && body.name) {
          const nextIdx = state.resources.courses.length + 1;
          const defaultFac =
            state.resources.faculty.find((f) => f.deptCode === deptCode) ||
            state.resources.faculty[0];
          const defaultBatch =
            state.resources.batches.find((b) => b.deptCode === deptCode) ||
            state.resources.batches[0];
          state.resources.courses.push({
            id: `C${nextIdx}`,
            code: (body.code || `${deptCode}${resolvedSem * 100 + nextIdx}`).trim().toUpperCase(),
            title: body.name.trim(),
            department: deptName,
            deptCode,
            semester: resolvedSem,
            facultyId: defaultFac ? defaultFac.id : 'F1',
            batchId: defaultBatch ? defaultBatch.id : 'B1',
            secondaryBatchIds: [],
            requiredRoomType: body.requiredRoomType || 'LECTURE',
            weeklySessions: 2,
          });
        } else if (category === 'FACULTY' && body.name) {
          state.resources.faculty.push({
            id: `F${state.resources.faculty.length + 1}`,
            name: body.name.trim(),
            department: deptName,
            deptCode,
            specialization: body.specialization || `${deptCode} Faculty`,
            maxDailyHours: Number(body.maxDailyHours) || 4,
            unavailableSlots: [],
            avatarColor: '#6366f1',
          });
        } else if (category === 'ROOM' && body.name) {
          state.resources.classrooms.push({
            id: `R${state.resources.classrooms.length + 1}`,
            name: body.name.trim(),
            capacity: Number(body.capacity) || 60,
            type: body.roomType || 'LECTURE',
            building: body.building || `${deptCode} Block`,
            features: [],
          });
        } else if (category === 'BATCH' && body.name) {
          state.resources.batches.push({
            id: `B${state.resources.batches.length + 1}`,
            name: body.name.trim(),
            size: Number(body.size) || 60,
            department: deptName,
            deptCode,
            semester: resolvedSem,
            color: BATCH_COLORS[state.resources.batches.length % BATCH_COLORS.length],
          });
        }
        return sendJson(res, 200, buildFullStatePayload());
      }

      if (pathname === '/api/optimize' && req.method === 'POST') {
        const result = optimizeTimetable(state.sessions, state.resources);
        state.sessions = structuredClone(result.optimizedSessions);
        state.lastOptimizationResult = {
          timestamp: new Date().toISOString(),
          resolutionLog: result.resolutionLog,
          telemetry: result.telemetry,
          beforeSummary: result.beforeSummary,
          afterSummary: result.afterReport.summary,
        };
        return sendJson(res, 200, {
          ...buildFullStatePayload(),
          optimizationResult: state.lastOptimizationResult,
        });
      }

      if (pathname === '/api/ai/analyze' && req.method === 'POST') {
        const body = await parseJsonBody(req);
        const headerKey = req.headers['x-qualcomm-api-key'];
        const conflictReport = detectConflicts(state.sessions, state.resources);
        const optimizationPreview = optimizeTimetable(state.sessions, state.resources);

        const analysis = await analyzeConflictsWithQualcommAI(
          conflictReport,
          optimizationPreview,
          {
            apiKey: body.apiKey || headerKey,
            endpoint: body.endpoint,
            model: body.model,
          }
        );

        return sendJson(res, 200, analysis);
      }

      if (pathname === '/api/ai/chat' && req.method === 'POST') {
        const body = await parseJsonBody(req);
        const headerKey = req.headers['x-qualcomm-api-key'];
        const conflictReport = detectConflicts(state.sessions, state.resources);
        const optimizationPreview = optimizeTimetable(state.sessions, state.resources);

        const chatResponse = await chatWithQualcommCopilot(
          body.message || '',
          conflictReport,
          optimizationPreview,
          {
            apiKey: body.apiKey || headerKey,
            endpoint: body.endpoint,
            model: body.model,
          },
          state.resources
        );

        return sendJson(res, 200, chatResponse);
      }

      if (pathname === '/api/config/qualcomm' && req.method === 'POST') {
        const body = await parseJsonBody(req);
        const updated = updateQualcommConfig({
          apiKey: body.apiKey,
          endpoint: body.endpoint,
          model: body.model,
        });

        let verification = null;
        if (body.verify) {
          verification = await verifyQualcommConnection({
            apiKey: updated.rawKey,
            endpoint: updated.qualcommEndpoint,
            model: updated.qualcommModel,
          });
        }

        return sendJson(res, 200, {
          qualcommConfig: {
            hasKey: updated.hasQualcommKey,
            maskedKey: updated.maskedKey,
            endpoint: updated.qualcommEndpoint,
            model: updated.qualcommModel,
          },
          verification,
        });
      }

      // --- STATIC FRONTEND SERVING ---
      let filePath = pathname === '/' ? '/index.html' : pathname;
      const resolvedPath = path.resolve(FRONTEND_DIR, `.${filePath}`);

      if (!resolvedPath.startsWith(FRONTEND_DIR)) {
        res.writeHead(403);
        return res.end('Forbidden');
      }

      if (fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isFile()) {
        const ext = path.extname(resolvedPath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': contentType });
        fs.createReadStream(resolvedPath).pipe(res);
      } else {
        const indexHtml = path.join(FRONTEND_DIR, 'index.html');
        if (fs.existsSync(indexHtml)) {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          fs.createReadStream(indexHtml).pipe(res);
        } else {
          sendJson(res, 404, { error: 'Not found' });
        }
      }
    } catch (err) {
      sendJson(res, 500, { error: err.message || 'Internal Server Error' });
    }
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  const cfg = getConfig();
  const server = createAppServer();
  server.listen(cfg.port, () => {
    console.log(
      `\n🚀 College Timetable Optimizer Server running at http://${cfg.host}:${cfg.port}`
    );
    console.log(
      `⚡ Qualcomm AI Endpoint: ${cfg.qualcommEndpoint} | Model: ${cfg.qualcommModel} | Key Configured: ${cfg.hasQualcommKey ? 'YES (' + cfg.maskedKey + ')' : 'NO (Using Hybrid Neuro-Symbolic Fallback)'}\n`
    );
  });
}
