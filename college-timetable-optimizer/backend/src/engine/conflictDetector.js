import { DAY_LABELS } from '../data/seedData.js';

/**
 * Enriches raw session objects with resolved Faculty, Course, Classroom, and Batch metadata.
 */
export function enrichSessions(sessions, { faculty, classrooms, batches, courses }) {
  const facultyMap = new Map(faculty.map((f) => [f.id, f]));
  const roomMap = new Map(classrooms.map((r) => [r.id, r]));
  const batchMap = new Map(batches.map((b) => [b.id, b]));
  const courseMap = new Map(courses.map((c) => [c.id, c]));

  return sessions.map((s) => {
    const course = courseMap.get(s.courseId) || {
      id: s.courseId,
      code: s.courseId,
      title: 'Unknown Course',
      requiredRoomType: 'LECTURE',
    };
    const fac = facultyMap.get(s.facultyId || course.facultyId) || {
      id: s.facultyId,
      name: 'Unassigned Faculty',
      unavailableSlots: [],
      maxDailyHours: 4,
    };
    const room = roomMap.get(s.roomId) || {
      id: s.roomId,
      name: 'Unassigned Room',
      capacity: 0,
      type: 'LECTURE',
    };
    const batch = batchMap.get(s.batchId || course.batchId) || {
      id: s.batchId,
      name: 'Unknown Batch',
      size: 0,
    };

    const resolvedSem = Number(s.semester || batch.semester || course.semester || 1);
    return {
      ...s,
      facultyId: fac.id,
      batchId: batch.id,
      roomId: room.id,
      courseCode: course.code,
      courseTitle: course.title,
      department: batch.department || course.department || fac.department || 'General',
      deptCode: batch.deptCode || course.deptCode || fac.deptCode || 'GEN',
      semester: resolvedSem,
      semesterLabel: `S${resolvedSem}`,
      requiredRoomType: course.requiredRoomType,
      facultyName: fac.name,
      facultyDept: fac.department || 'General',
      facultyColor: fac.avatarColor || '#6366f1',
      roomName: room.name,
      roomCapacity: room.capacity,
      roomType: room.type,
      batchName: batch.name,
      batchSize: batch.size,
      batchColor: batch.color || '#3b82f6',
      dayLabel: DAY_LABELS[s.day] || s.day,
    };
  });
}

/**
 * Core CSP & Graph Coloring Conflict Detection Engine.
 * Evaluates Faculty, Classroom, and Student-Batch constraints across all scheduled sessions.
 */
export function detectConflicts(rawSessions, resources) {
  const sessions = enrichSessions(rawSessions, resources);
  const facultyMap = new Map(resources.faculty.map((f) => [f.id, f]));
  const conflicts = [];
  const conflictEdges = [];
  const sessionConflictsMap = {};

  for (const s of sessions) {
    sessionConflictsMap[s.id] = [];
  }

  const addConflict = (conflict) => {
    conflicts.push(conflict);
    for (const sid of conflict.sessionIds) {
      if (!sessionConflictsMap[sid]) sessionConflictsMap[sid] = [];
      sessionConflictsMap[sid].push({
        id: conflict.id,
        category: conflict.category,
        subtype: conflict.subtype,
        severity: conflict.severity,
        title: conflict.title,
      });
    }
  };

  // Group sessions by (day, slot) for simultaneous collision checks
  const byTimeSlot = new Map();
  for (const s of sessions) {
    const key = `${s.day}|${s.slot}`;
    if (!byTimeSlot.has(key)) byTimeSlot.set(key, []);
    byTimeSlot.get(key).push(s);
  }

  let conflictCounter = 1;

  // 1. Check simultaneous Time-Slot Collisions (Faculty, Classroom, Student-Batch)
  for (const [timeKey, slotSessions] of byTimeSlot.entries()) {
    const [day, slot] = timeKey.split('|');
    const dayName = DAY_LABELS[day] || day;

    // 1A. Faculty Double-Booking within (day, slot)
    const byFaculty = new Map();
    for (const s of slotSessions) {
      if (!byFaculty.has(s.facultyId)) byFaculty.set(s.facultyId, []);
      byFaculty.get(s.facultyId).push(s);
    }

    for (const [facultyId, facSessions] of byFaculty.entries()) {
      if (facSessions.length > 1) {
        const facName = facSessions[0].facultyName;
        const courseList = facSessions.map((x) => `${x.courseTitle} (${x.batchName})`).join(' & ');
        const cid = `CONF-${conflictCounter++}`;
        addConflict({
          id: cid,
          category: 'FACULTY',
          subtype: 'FACULTY_DOUBLE_BOOKING',
          severity: 'CRITICAL',
          day,
          dayLabel: dayName,
          slot,
          sessionIds: facSessions.map((x) => x.id),
          resourceId: facultyId,
          resourceName: facName,
          title: `Faculty Double-Booked: ${facName}`,
          description: `${facName} is assigned to teach ${facSessions.length} classes simultaneously on ${dayName} (${slot}): ${courseList}.`,
          constraintFormula: `∑ X(faculty="${facName}", t="${day} ${slot}") ≤ 1  [Actual = ${facSessions.length}]`,
          suggestedFix: `Move one of ${facName}'s classes (${facSessions.slice(1).map((x) => x.courseTitle).join(', ')}) to an open slot where both ${facName} and the student batch are free.`,
        });

        // Add conflict graph edges between all colliding sessions
        for (let i = 0; i < facSessions.length; i++) {
          for (let j = i + 1; j < facSessions.length; j++) {
            conflictEdges.push({
              source: facSessions[i].id,
              target: facSessions[j].id,
              category: 'FACULTY',
              reason: `Shared Faculty: ${facName}`,
            });
          }
        }
      }
    }

    // 1B. Classroom Double-Booking within (day, slot)
    const byRoom = new Map();
    for (const s of slotSessions) {
      if (!byRoom.has(s.roomId)) byRoom.set(s.roomId, []);
      byRoom.get(s.roomId).push(s);
    }

    for (const [roomId, roomSessions] of byRoom.entries()) {
      if (roomSessions.length > 1) {
        const roomName = roomSessions[0].roomName;
        const courseList = roomSessions.map((x) => `${x.courseTitle} (${x.batchName})`).join(' & ');
        const cid = `CONF-${conflictCounter++}`;
        addConflict({
          id: cid,
          category: 'CLASSROOM',
          subtype: 'CLASSROOM_DOUBLE_BOOKING',
          severity: 'CRITICAL',
          day,
          dayLabel: dayName,
          slot,
          sessionIds: roomSessions.map((x) => x.id),
          resourceId: roomId,
          resourceName: roomName,
          title: `Classroom Double-Booked: ${roomName}`,
          description: `${roomName} is booked for ${roomSessions.length} different courses simultaneously on ${dayName} (${slot}): ${courseList}.`,
          constraintFormula: `∑ X(room="${roomName}", t="${day} ${slot}") ≤ 1  [Actual = ${roomSessions.length}]`,
          suggestedFix: `Reallocate ${roomSessions.slice(1).map((x) => x.courseTitle).join(', ')} to an unoccupied classroom of matching capacity and equipment type, or shift to another time slot.`,
        });

        for (let i = 0; i < roomSessions.length; i++) {
          for (let j = i + 1; j < roomSessions.length; j++) {
            conflictEdges.push({
              source: roomSessions[i].id,
              target: roomSessions[j].id,
              category: 'CLASSROOM',
              reason: `Shared Room: ${roomName}`,
            });
          }
        }
      }
    }

    // 1C. Student-Batch Double-Booking within (day, slot)
    const byBatch = new Map();
    for (const s of slotSessions) {
      if (!byBatch.has(s.batchId)) byBatch.set(s.batchId, []);
      byBatch.get(s.batchId).push(s);
    }

    for (const [batchId, batchSessions] of byBatch.entries()) {
      if (batchSessions.length > 1) {
        const batchName = batchSessions[0].batchName;
        const courseList = batchSessions.map((x) => `${x.courseTitle} (${x.facultyName})`).join(' & ');
        const cid = `CONF-${conflictCounter++}`;
        addConflict({
          id: cid,
          category: 'STUDENT_BATCH',
          subtype: 'STUDENT_BATCH_DOUBLE_BOOKING',
          severity: 'CRITICAL',
          day,
          dayLabel: dayName,
          slot,
          sessionIds: batchSessions.map((x) => x.id),
          resourceId: batchId,
          resourceName: batchName,
          title: `Student-Batch Overlap: ${batchName}`,
          description: `Cohort ${batchName} (${batchSessions[0].batchSize} students) is scheduled to attend ${batchSessions.length} classes at the exact same time on ${dayName} (${slot}): ${courseList}.`,
          constraintFormula: `∑ X(batch="${batchName}", t="${day} ${slot}") ≤ 1  [Actual = ${batchSessions.length}]`,
          suggestedFix: `Graph-coloring constraint violated: assign distinct time slots (colors) to connected courses ${batchSessions.map((x) => x.courseCode).join(' and ')}.`,
        });

        for (let i = 0; i < batchSessions.length; i++) {
          for (let j = i + 1; j < batchSessions.length; j++) {
            conflictEdges.push({
              source: batchSessions[i].id,
              target: batchSessions[j].id,
              category: 'STUDENT_BATCH',
              reason: `Shared Batch: ${batchName}`,
            });
          }
        }
      }
    }
  }

  // 2. Per-Session Attribute Constraints (Room Capacity, Room Type, Faculty Availability)
  for (const s of sessions) {
    // 2A. Classroom Capacity Check
    if (s.batchSize > s.roomCapacity) {
      const cid = `CONF-${conflictCounter++}`;
      addConflict({
        id: cid,
        category: 'CLASSROOM',
        subtype: 'CLASSROOM_CAPACITY_EXCEEDED',
        severity: 'CRITICAL',
        day: s.day,
        dayLabel: s.dayLabel,
        slot: s.slot,
        sessionIds: [s.id],
        resourceId: s.roomId,
        resourceName: s.roomName,
        title: `Capacity Exceeded in ${s.roomName}`,
        description: `${s.courseTitle} for ${s.batchName} (${s.batchSize} students) is assigned to ${s.roomName}, which only holds ${s.roomCapacity} seats (${s.batchSize - s.roomCapacity} students over capacity).`,
        constraintFormula: `Size(${s.batchName}) = ${s.batchSize} ≤ Capacity(${s.roomName}) = ${s.roomCapacity}`,
        suggestedFix: `Relocate ${s.courseTitle} to a room with capacity ≥ ${s.batchSize} (e.g., Auditorium A [100] or Smart Room 202 [65]).`,
      });
    }

    // 2B. Classroom Equipment / Type Check
    if (s.requiredRoomType && s.roomType && s.requiredRoomType !== s.roomType) {
      const cid = `CONF-${conflictCounter++}`;
      addConflict({
        id: cid,
        category: 'CLASSROOM',
        subtype: 'CLASSROOM_TYPE_MISMATCH',
        severity: 'CRITICAL',
        day: s.day,
        dayLabel: s.dayLabel,
        slot: s.slot,
        sessionIds: [s.id],
        resourceId: s.roomId,
        resourceName: s.roomName,
        title: `Room Equipment Mismatch: ${s.courseTitle}`,
        description: `${s.courseTitle} requires a ${s.requiredRoomType}, but ${s.roomName} is a ${s.roomType}.`,
        constraintFormula: `RoomType(${s.roomName}) = "${s.roomType}" == Required("${s.requiredRoomType}")`,
        suggestedFix: `Move ${s.courseTitle} into a compatible ${s.requiredRoomType} with ≥ ${s.batchSize} seats.`,
      });
    }

    // 2C. Faculty Unavailable Slot Check
    const fac = facultyMap.get(s.facultyId);
    const slotKey = `${s.day}|${s.slot}`;
    if (fac && Array.isArray(fac.unavailableSlots) && fac.unavailableSlots.includes(slotKey)) {
      const cid = `CONF-${conflictCounter++}`;
      addConflict({
        id: cid,
        category: 'FACULTY',
        subtype: 'FACULTY_UNAVAILABLE',
        severity: 'WARNING',
        day: s.day,
        dayLabel: s.dayLabel,
        slot: s.slot,
        sessionIds: [s.id],
        resourceId: s.facultyId,
        resourceName: s.facultyName,
        title: `Faculty Blocked Slot: ${s.facultyName}`,
        description: `${s.facultyName} is marked unavailable on ${s.dayLabel} (${s.slot}) due to research/committee block, but is scheduled for ${s.courseTitle}.`,
        constraintFormula: `Available(${s.facultyName}, "${s.day} ${s.slot}") == TRUE  [Actual = FALSE]`,
        suggestedFix: `Reschedule ${s.courseTitle} to another slot where ${s.facultyName} and ${s.batchName} are available.`,
      });
    }
  }

  // 3. Faculty Daily Overload Check
  const facultyDayCounts = new Map();
  for (const s of sessions) {
    const key = `${s.facultyId}|${s.day}`;
    if (!facultyDayCounts.has(key)) facultyDayCounts.set(key, []);
    facultyDayCounts.get(key).push(s);
  }

  for (const [key, daySessions] of facultyDayCounts.entries()) {
    const [facultyId, day] = key.split('|');
    const fac = facultyMap.get(facultyId);
    const maxHours = fac?.maxDailyHours || 3;
    if (daySessions.length > maxHours) {
      const cid = `CONF-${conflictCounter++}`;
      addConflict({
        id: cid,
        category: 'FACULTY',
        subtype: 'FACULTY_OVERLOAD',
        severity: 'WARNING',
        day,
        dayLabel: DAY_LABELS[day] || day,
        slot: 'Daily Total',
        sessionIds: daySessions.map((x) => x.id),
        resourceId: facultyId,
        resourceName: fac?.name || facultyId,
        title: `Daily Teaching Load Exceeded: ${fac?.name}`,
        description: `${fac?.name} has ${daySessions.length} hours scheduled on ${DAY_LABELS[day] || day}, exceeding their max limit of ${maxHours} hours/day.`,
        constraintFormula: `∑_{slot} X(faculty="${fac?.name}", day="${day}") ≤ ${maxHours}  [Actual = ${daySessions.length}]`,
        suggestedFix: `Distribute one of ${fac?.name}'s classes to another day of the week.`,
      });
    }
  }

  // Compute Summary Statistics & Health Score
  const countsByCategory = {
    FACULTY: conflicts.filter((c) => c.category === 'FACULTY').length,
    CLASSROOM: conflicts.filter((c) => c.category === 'CLASSROOM').length,
    STUDENT_BATCH: conflicts.filter((c) => c.category === 'STUDENT_BATCH').length,
  };

  const criticalCount = conflicts.filter((c) => c.severity === 'CRITICAL').length;
  const warningCount = conflicts.filter((c) => c.severity === 'WARNING').length;
  const penalty = criticalCount * 16 + warningCount * 8;
  const healthScore = sessions.length === 0 ? 100 : Math.max(0, Math.min(100, 100 - penalty));

  return {
    sessions,
    conflicts,
    sessionConflictsMap,
    conflictGraph: {
      nodes: sessions.map((s) => ({
        id: s.id,
        label: `${s.courseCode}: ${s.courseTitle}`,
        day: s.day,
        slot: s.slot,
        faculty: s.facultyName,
        room: s.roomName,
        batch: s.batchName,
        conflictCount: (sessionConflictsMap[s.id] || []).length,
      })),
      edges: conflictEdges,
    },
    summary: {
      totalSessions: sessions.length,
      totalConflicts: conflicts.length,
      criticalCount,
      warningCount,
      countsByCategory,
      healthScore,
      isConflictFree: conflicts.length === 0,
    },
  };
}
