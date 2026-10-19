import test from 'node:test';
import assert from 'node:assert/strict';

import {
  FACULTY,
  CLASSROOMS,
  BATCHES,
  COURSES,
  PRESET_SCHEDULES,
} from '../src/data/seedData.js';
import { detectConflicts } from '../src/engine/conflictDetector.js';
import { optimizeTimetable } from '../src/engine/cspSolver.js';

const resources = {
  faculty: FACULTY,
  classrooms: CLASSROOMS,
  batches: BATCHES,
  courses: COURSES,
};

test('Monday 9 AM Triple-Conflict Preset detects Faculty, Classroom, Capacity, and Batch conflicts', () => {
  const sessions = PRESET_SCHEDULES['simple-example'].sessions;
  const report = detectConflicts(sessions, resources);

  assert.equal(report.summary.isConflictFree, false);
  assert.ok(report.summary.countsByCategory.FACULTY >= 1, 'Should detect Prof. Sharma conflict');
  assert.ok(report.summary.countsByCategory.CLASSROOM >= 2, 'Should detect Room 101 double-booking and capacity conflict');
  assert.ok(report.summary.countsByCategory.STUDENT_BATCH >= 1, 'Should detect CS-Year 2 batch overlap');

  const subtypes = new Set(report.conflicts.map((c) => c.subtype));
  assert.ok(subtypes.has('FACULTY_DOUBLE_BOOKING'));
  assert.ok(subtypes.has('CLASSROOM_DOUBLE_BOOKING'));
  assert.ok(subtypes.has('CLASSROOM_CAPACITY_EXCEEDED'));
  assert.ok(subtypes.has('STUDENT_BATCH_DOUBLE_BOOKING'));
});

test('CSP Optimizer resolves all conflicts in Monday 9 AM Triple-Conflict Example', () => {
  const sessions = PRESET_SCHEDULES['simple-example'].sessions;
  const result = optimizeTimetable(sessions, resources);

  assert.equal(result.afterReport.summary.totalConflicts, 0);
  assert.equal(result.afterReport.summary.healthScore, 100);
  assert.ok(result.resolutionLog.length >= 2, 'Should log exact schedule changes');
});

test('CSP Optimizer resolves all conflicts in Full Campus Preset (including Room Type & Unavailable Slot)', () => {
  const sessions = PRESET_SCHEDULES['default-conflict'].sessions;
  const initial = detectConflicts(sessions, resources);
  assert.ok(initial.summary.totalConflicts >= 5);

  const solved = optimizeTimetable(sessions, resources);
  assert.equal(solved.afterReport.summary.totalConflicts, 0);
  assert.equal(solved.afterReport.summary.healthScore, 100);
});
