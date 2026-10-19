let appState = null;
let currentFilterType = 'ALL';
let currentFilterEntityId = '';
let currentSemesterFilter = 'ALL';

const els = {
  brandHomeBtn: document.getElementById('brandHomeBtn'),
  navDeptCount: document.getElementById('navDeptCount'),
  navDepartmentsMenu: document.getElementById('navDepartmentsMenu'),
  navConflictCount: document.getElementById('navConflictCount'),
  headerFacilitySelect: document.getElementById('headerFacilitySelect'),
  scenarioDropdown: document.getElementById('scenarioDropdown'),
  topDeptDropdown: document.getElementById('topDeptDropdown'),
  topSemDropdown: document.getElementById('topSemDropdown'),
  btnOptimize: document.getElementById('btnOptimize'),
  btnApplyDiff: document.getElementById('btnApplyDiff'),

  kpiHealthBadge: document.getElementById('kpiHealthBadge'),
  kpiHealthValue: document.getElementById('kpiHealthValue'),
  kpiFacultyCount: document.getElementById('kpiFacultyCount'),
  kpiRoomCount: document.getElementById('kpiRoomCount'),
  kpiBatchCount: document.getElementById('kpiBatchCount'),

  // Quick-Add Resources Panel on Main Page
  btnToggleQuickAddPanel: document.getElementById('btnToggleQuickAddPanel'),
  btnClearTimetableInline: document.getElementById('btnClearTimetableInline'),
  quickAddResourcesPanel: document.getElementById('quickAddResourcesPanel'),
  quickAddFacultyForm: document.getElementById('quickAddFacultyForm'),
  qaFacultyName: document.getElementById('qaFacultyName'),
  qaFacultyDept: document.getElementById('qaFacultyDept'),
  qaFacultySpec: document.getElementById('qaFacultySpec'),
  quickAddCourseForm: document.getElementById('quickAddCourseForm'),
  qaCourseName: document.getElementById('qaCourseName'),
  qaCourseDept: document.getElementById('qaCourseDept'),
  qaCourseSem: document.getElementById('qaCourseSem'),
  qaCourseType: document.getElementById('qaCourseType'),
  quickAddRoomForm: document.getElementById('quickAddRoomForm'),
  qaRoomName: document.getElementById('qaRoomName'),
  qaRoomCap: document.getElementById('qaRoomCap'),
  qaRoomType: document.getElementById('qaRoomType'),
  quickAddBatchForm: document.getElementById('quickAddBatchForm'),
  qaBatchName: document.getElementById('qaBatchName'),
  qaCustomDept: document.getElementById('qaCustomDept'),
  qaBatchSem: document.getElementById('qaBatchSem'),
  qaBatchSize: document.getElementById('qaBatchSize'),

  // All-Dropdown + Custom Input Builder Form
  inlineBuilderForm: document.getElementById('inlineBuilderForm'),
  inDept: document.getElementById('inDept'),
  inSem: document.getElementById('inSem'),
  inDeptCustom: document.getElementById('inDeptCustom'),
  inSubject: document.getElementById('inSubject'),
  inSubjectCustom: document.getElementById('inSubjectCustom'),
  inRoomType: document.getElementById('inRoomType'),
  inTeacher: document.getElementById('inTeacher'),
  inTeacherCustom: document.getElementById('inTeacherCustom'),
  inBatch: document.getElementById('inBatch'),
  inBatchCustomWrap: document.getElementById('inBatchCustomWrap'),
  inBatchCustom: document.getElementById('inBatchCustom'),
  inBatchSizeCustom: document.getElementById('inBatchSizeCustom'),
  inRoom: document.getElementById('inRoom'),
  inRoomCustomWrap: document.getElementById('inRoomCustomWrap'),
  inRoomCustom: document.getElementById('inRoomCustom'),
  inRoomCapCustom: document.getElementById('inRoomCapCustom'),
  inDay: document.getElementById('inDay'),
  inSlot: document.getElementById('inSlot'),

  // Live Conflict Banner
  liveConflictBanner: document.getElementById('liveConflictBanner'),
  bannerConflictHeadline: document.getElementById('bannerConflictHeadline'),
  bannerConflictList: document.getElementById('bannerConflictList'),
  btnViewConflictDetails: document.getElementById('btnViewConflictDetails'),
  btnBannerFixNow: document.getElementById('btnBannerFixNow'),

  facultyDirectoryPills: document.getElementById('facultyDirectoryPills'),
  roomDirectoryPills: document.getElementById('roomDirectoryPills'),
  batchDirectoryPills: document.getElementById('batchDirectoryPills'),
  dirFacultyCountBadge: document.getElementById('dirFacultyCountBadge'),
  dirRoomCountBadge: document.getElementById('dirRoomCountBadge'),
  dirBatchCountBadge: document.getElementById('dirBatchCountBadge'),
  addFacultyForm: document.getElementById('addFacultyForm'),
  newFacultyName: document.getElementById('newFacultyName'),
  newFacultyDept: document.getElementById('newFacultyDept'),
  addRoomForm: document.getElementById('addRoomForm'),
  newRoomName: document.getElementById('newRoomName'),
  newRoomCap: document.getElementById('newRoomCap'),
  newRoomType: document.getElementById('newRoomType'),
  addBatchForm: document.getElementById('addBatchForm'),
  newBatchName: document.getElementById('newBatchName'),
  newBatchDept: document.getElementById('newBatchDept'),
  newBatchSize: document.getElementById('newBatchSize'),

  btnClearFilter: document.getElementById('btnClearFilter'),
  activeFilterLabel: document.getElementById('activeFilterLabel'),

  filterTypeSelect: document.getElementById('filterTypeSelect'),
  filterEntitySelect: document.getElementById('filterEntitySelect'),
  timetableBody: document.getElementById('timetableBody'),

  diffSectionTitle: document.getElementById('diffSectionTitle'),
  diffSectionSubtitle: document.getElementById('diffSectionSubtitle'),
  diffListContainer: document.getElementById('diffListContainer'),

  tabConflictCount: document.getElementById('tabConflictCount'),
  tabPanelConflicts: document.getElementById('tabPanelConflicts'),

  btnRunAiAnalysis: document.getElementById('btnRunAiAnalysis'),
  aiAnalysisOutput: document.getElementById('aiAnalysisOutput'),
  chatMessages: document.getElementById('chatMessages'),
  chatForm: document.getElementById('chatForm'),
  chatInput: document.getElementById('chatInput'),
  conflictGraphContainer: document.getElementById('conflictGraphContainer'),

  // Session Edit Modal
  sessionModal: document.getElementById('sessionModal'),
  sessionModalTitle: document.getElementById('sessionModalTitle'),
  sessionForm: document.getElementById('sessionForm'),
  formSessionId: document.getElementById('formSessionId'),
  formCourseId: document.getElementById('formCourseId'),
  formFacultyId: document.getElementById('formFacultyId'),
  formBatchId: document.getElementById('formBatchId'),
  formRoomId: document.getElementById('formRoomId'),
  formDay: document.getElementById('formDay'),
  formSlot: document.getElementById('formSlot'),
  btnDeleteSession: document.getElementById('btnDeleteSession'),
  btnCloseSessionModal: document.getElementById('btnCloseSessionModal'),
  btnCancelSession: document.getElementById('btnCancelSession'),
};

async function apiRequest(path, options = {}) {
  const res = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || `HTTP ${res.status}`);
  }
  return data;
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function switchMainView(viewName) {
  const targetSectionId = `view-${viewName}`;

  document.querySelectorAll('.view-section').forEach((sec) => {
    sec.classList.toggle('active', sec.id === targetSectionId);
  });
  document
    .querySelectorAll(
      '.workspace-tab, .nav-page-link, .sidebar-top-link, .sidebar-sublink, .dock-pill'
    )
    .forEach((tab) => {
      tab.classList.toggle('active', tab.getAttribute('data-nav-view') === viewName);
    });
  if (els.headerFacilitySelect) {
    els.headerFacilitySelect.value = viewName;
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function shortConflictTag(subtype) {
  switch (subtype) {
    case 'FACULTY_DOUBLE_BOOKING':
      return '👨‍🏫 Teacher Clash';
    case 'FACULTY_UNAVAILABLE':
      return '👨‍🏫 Teacher Busy';
    case 'FACULTY_OVERLOAD':
      return '👨‍🏫 Max Hours Exceeded';
    case 'CLASSROOM_DOUBLE_BOOKING':
      return '🏫 Room Double-Booked';
    case 'CLASSROOM_CAPACITY_EXCEEDED':
      return '🏫 Room Too Small';
    case 'CLASSROOM_TYPE_MISMATCH':
      return '💻 Needs Lab Room';
    case 'STUDENT_BATCH_DOUBLE_BOOKING':
      return '🎓 Batch Clash';
    default:
      return '⚠️ Conflict';
  }
}

function syncCustomInputVisibility() {
  if (els.inDeptCustom) {
    els.inDeptCustom.style.display = els.inDept.value === '__CUSTOM__' ? 'block' : 'none';
  }
  if (els.inSubjectCustom) {
    els.inSubjectCustom.style.display = els.inSubject.value === '__CUSTOM__' ? 'block' : 'none';
  }
  if (els.inTeacherCustom) {
    els.inTeacherCustom.style.display = els.inTeacher.value === '__CUSTOM__' ? 'block' : 'none';
  }
  if (els.inBatchCustomWrap) {
    els.inBatchCustomWrap.style.display = els.inBatch.value === '__CUSTOM__' ? 'flex' : 'none';
  }
  if (els.inRoomCustomWrap) {
    els.inRoomCustomWrap.style.display = els.inRoom.value === '__CUSTOM__' ? 'flex' : 'none';
  }
}

function populateDepartmentSelectors() {
  const departments = appState.resources.departments || [];

  if (els.navDeptCount) {
    els.navDeptCount.textContent = departments.length;
  }

  // Update Hero Stats on Home Page
  const heroStatDepts = document.getElementById('heroStatDepts');
  const heroStatFaculty = document.getElementById('heroStatFaculty');
  const heroStatRooms = document.getElementById('heroStatRooms');
  if (heroStatDepts) heroStatDepts.textContent = departments.length;
  if (heroStatFaculty) heroStatFaculty.textContent = (appState.resources.faculty || []).length;
  if (heroStatRooms) heroStatRooms.textContent = (appState.resources.classrooms || []).length;

  // Populate Home Page Department Portal Cards Grid
  const homeDepartmentsGrid = document.getElementById('homeDepartmentsGrid');
  if (homeDepartmentsGrid) {
    homeDepartmentsGrid.innerHTML = departments
      .map((d) => {
        const deptCoursesCount = (appState.resources.courses || []).filter(
          (c) => c.deptCode === d.id
        ).length;
        const deptFacultyCount = (appState.resources.faculty || []).filter(
          (f) => f.deptCode === d.id
        ).length;
        return `
          <div class="dept-portal-card" data-home-dept="${escapeHtml(d.id)}">
            <div>
              <div style="display:flex; align-items:center; gap:0.45rem; margin-bottom:0.25rem;">
                <span class="pill-tag pill-info">${escapeHtml(d.code)}</span>
                <span style="font-size:0.72rem; color:var(--text-muted);">Semesters S1–S8</span>
              </div>
              <strong style="font-size:0.9rem; color:#0f172a; display:block;">${escapeHtml(d.name)}</strong>
              <span style="font-size:0.76rem; color:var(--text-muted);">
                👨‍🏫 ${deptFacultyCount} Faculty • 📚 ${deptCoursesCount} Courses
              </span>
            </div>
            <span style="color:#2563eb; font-weight:700; font-size:0.85rem;">View →</span>
          </div>
        `;
      })
      .join('');

    homeDepartmentsGrid.querySelectorAll('[data-home-dept]').forEach((card) => {
      card.addEventListener('click', () => {
        setDepartmentFilter(card.getAttribute('data-home-dept'));
        switchMainView('timetable');
      });
    });
  }

  // 1. Navbar Departments Dropdown Menu
  if (els.navDepartmentsMenu) {
    els.navDepartmentsMenu.innerHTML = `
      <button type="button" class="dropdown-item" data-nav-dept="ALL">
        <span>🏛️ All College Departments (Whole Campus)</span>
        <span class="pill-tag pill-info">All</span>
      </button>
      <div class="dropdown-divider"></div>
      ${departments
        .map(
          (d) => `
        <button type="button" class="dropdown-item" data-nav-dept="${escapeHtml(d.id)}">
          <span>🎓 ${escapeHtml(d.name)}</span>
        </button>
      `
        )
        .join('')}
    `;
    els.navDepartmentsMenu.querySelectorAll('[data-nav-dept]').forEach((item) => {
      item.addEventListener('click', () => {
        setDepartmentFilter(item.getAttribute('data-nav-dept'));
        switchMainView('timetable');
      });
    });
  }

  // 2. Top Bar Department Dropdown
  if (els.topDeptDropdown) {
    const prevTop = els.topDeptDropdown.value || 'ALL';
    els.topDeptDropdown.innerHTML = `
      <option value="ALL">🏛️ All College Departments (Whole Campus)</option>
      ${departments
        .map((d) => `<option value="${escapeHtml(d.id)}">🎓 ${escapeHtml(d.name)}</option>`)
        .join('')}
    `;
    if (prevTop === 'ALL' || departments.some((d) => d.id === prevTop)) {
      els.topDeptDropdown.value = prevTop;
    }
  }

  // 3. Builder Department Dropdown (with "+ Type New Department..." option)
  if (els.inDept) {
    const prevBuilderDept = els.inDept.value || 'ALL';
    els.inDept.innerHTML = `
      <option value="ALL">🏛️ All College Departments</option>
      ${departments
        .map((d) => `<option value="${escapeHtml(d.id)}">🎓 ${escapeHtml(d.name)}</option>`)
        .join('')}
      <option value="__CUSTOM__">➕ Type New Department...</option>
    `;
    if (
      prevBuilderDept === 'ALL' ||
      prevBuilderDept === '__CUSTOM__' ||
      departments.some((d) => d.id === prevBuilderDept)
    ) {
      els.inDept.value = prevBuilderDept;
    }
  }

  // 4. Quick-Add & Directory Department Selects
  const deptOptionsHtml = departments
    .map((d) => `<option value="${escapeHtml(d.id)}">${escapeHtml(d.code || d.id)} — ${escapeHtml(d.name)}</option>`)
    .join('');

  [els.qaFacultyDept, els.qaCourseDept, els.newFacultyDept, els.newBatchDept].forEach((sel) => {
    if (sel) {
      const prev = sel.value;
      sel.innerHTML = deptOptionsHtml;
      if (prev && departments.some((d) => d.id === prev)) {
        sel.value = prev;
      }
    }
  });
}

function populateInlineBuilderOptions() {
  const { courses, faculty, batches, classrooms } = appState.resources;
  const { days, dayLabels, timeSlots } = appState.metadata;
  const selectedDept = els.inDept ? els.inDept.value : 'ALL';
  const selectedSem = els.inSem ? els.inSem.value : 'ALL';

  const isAllOrCustomDept = selectedDept === 'ALL' || selectedDept === '__CUSTOM__';
  const isAllSem = !selectedSem || selectedSem === 'ALL';

  let filteredCourses = isAllOrCustomDept
    ? courses
    : courses.filter((c) => c.deptCode === selectedDept || c.deptCode === 'MBS');
  if (!isAllSem) {
    const semMatches = filteredCourses.filter((c) => Number(c.semester) === Number(selectedSem));
    if (semMatches.length > 0) filteredCourses = semMatches;
  }

  const filteredFaculty = isAllOrCustomDept
    ? faculty
    : faculty.filter((f) => f.deptCode === selectedDept || f.deptCode === 'MBS');

  let filteredBatches =
    isAllOrCustomDept || selectedDept === 'MBS'
      ? batches
      : batches.filter((b) => b.deptCode === selectedDept);
  if (!isAllSem) {
    const semBatchMatches = filteredBatches.filter((b) => Number(b.semester) === Number(selectedSem));
    if (semBatchMatches.length > 0) filteredBatches = semBatchMatches;
  }

  // Subject Dropdown + Type New Subject
  const prevSub = els.inSubject.value;
  els.inSubject.innerHTML = `
    ${filteredCourses
      .map(
        (c) =>
          `<option value="${escapeHtml(c.title)}" data-course-id="${c.id}">📚 [${escapeHtml(c.deptCode || 'GEN')} • S${c.semester || 1}] ${escapeHtml(c.title)} (${escapeHtml(c.code)})</option>`
      )
      .join('')}
    <option value="__CUSTOM__">➕ Type New Subject / Course...</option>
  `;
  if (
    prevSub === '__CUSTOM__' ||
    (prevSub && filteredCourses.some((c) => c.title === prevSub))
  ) {
    els.inSubject.value = prevSub;
  }

  // Faculty Dropdown + Type New Faculty
  const prevTeach = els.inTeacher.value;
  els.inTeacher.innerHTML = `
    ${filteredFaculty
      .map(
        (f) =>
          `<option value="${escapeHtml(f.name)}">👨‍🏫 [${escapeHtml(f.deptCode || 'GEN')}] ${escapeHtml(f.name)} — ${escapeHtml(f.specialization)}</option>`
      )
      .join('')}
    <option value="__CUSTOM__">➕ Type New Faculty (Teacher)...</option>
  `;
  if (
    prevTeach === '__CUSTOM__' ||
    (prevTeach && filteredFaculty.some((f) => f.name === prevTeach))
  ) {
    els.inTeacher.value = prevTeach;
  }

  // Batch Dropdown + Type New Batch
  const prevBatch = els.inBatch.value;
  els.inBatch.innerHTML = `
    ${filteredBatches
      .map(
        (b) =>
          `<option value="${escapeHtml(b.name)}" data-size="${b.size}">🎓 [${escapeHtml(b.deptCode || 'GEN')} • S${b.semester || 1}] ${escapeHtml(b.name)} (${b.size} Students)</option>`
      )
      .join('')}
    <option value="__CUSTOM__">➕ Type New Student Batch...</option>
  `;
  if (
    prevBatch === '__CUSTOM__' ||
    (prevBatch && filteredBatches.some((b) => b.name === prevBatch))
  ) {
    els.inBatch.value = prevBatch;
  }

  // Room Dropdown + Type New Room
  const prevRoom = els.inRoom.value;
  els.inRoom.innerHTML = `
    ${classrooms
      .map(
        (r) =>
          `<option value="${r.id}">${r.type === 'COMPUTER_LAB' ? '💻' : '🏫'} ${escapeHtml(r.name)} (${r.capacity} Seats)</option>`
      )
      .join('')}
    <option value="__CUSTOM__">➕ Type New Classroom / Lab...</option>
  `;
  if (
    prevRoom === '__CUSTOM__' ||
    (prevRoom && classrooms.some((r) => r.id === prevRoom))
  ) {
    els.inRoom.value = prevRoom;
  }

  const prevDay = els.inDay.value || 'Mon';
  els.inDay.innerHTML = days
    .map((d) => `<option value="${d}">${escapeHtml(dayLabels[d] || d)}</option>`)
    .join('');
  els.inDay.value = prevDay;

  const prevSlot = els.inSlot.value || '09:00 - 10:00';
  els.inSlot.innerHTML = timeSlots
    .map((s) => `<option value="${s}">${escapeHtml(s)}</option>`)
    .join('');
  els.inSlot.value = prevSlot;

  syncCustomInputVisibility();
}

function renderLiveConflictBanner() {
  const { conflicts, summary } = appState.conflictReport;
  if (conflicts.length === 0) {
    els.liveConflictBanner.style.display = 'none';
    return;
  }

  els.liveConflictBanner.style.display = 'flex';
  els.bannerConflictHeadline.textContent = `🚨 ${summary.totalConflicts} Conflict(s) Detected Across Campus Timetable!`;
  els.bannerConflictList.innerHTML = conflicts
    .slice(0, 3)
    .map((c) => `• <strong>${escapeHtml(c.title)}:</strong> ${escapeHtml(c.description)}`)
    .join('<br/>');
}

function renderKPIs() {
  const { summary } = appState.conflictReport;

  if (els.scenarioDropdown && appState.activePreset && appState.activePreset !== 'custom') {
    els.scenarioDropdown.value = appState.activePreset;
  }

  if (els.navConflictCount) {
    els.navConflictCount.textContent = summary.totalConflicts;
  }
  const tabBadgeConflictCount = document.getElementById('tabBadgeConflictCount');
  if (tabBadgeConflictCount) {
    tabBadgeConflictCount.textContent = summary.totalConflicts;
    tabBadgeConflictCount.style.background =
      summary.totalConflicts > 0 ? 'rgba(239, 68, 68, 0.25)' : 'rgba(16, 185, 129, 0.22)';
    tabBadgeConflictCount.style.color = summary.totalConflicts > 0 ? '#fca5a5' : '#6ee7b7';
    tabBadgeConflictCount.style.borderColor =
      summary.totalConflicts > 0 ? 'rgba(239, 68, 68, 0.5)' : 'rgba(16, 185, 129, 0.45)';
  }

  els.kpiHealthValue.textContent = `${summary.healthScore}%`;
  if (summary.totalConflicts === 0) {
    els.kpiHealthBadge.textContent = 'Conflict-Free';
    els.kpiHealthBadge.className = 'pill-tag pill-success';
    els.kpiHealthValue.style.color = '#10b981';
  } else {
    els.kpiHealthBadge.textContent = `${summary.totalConflicts} Clashes`;
    els.kpiHealthBadge.className = 'pill-tag pill-danger';
    els.kpiHealthValue.style.color = '#ef4444';
  }

  const facCount = summary.countsByCategory.FACULTY || 0;
  const roomCount = summary.countsByCategory.CLASSROOM || 0;
  const batchCount = summary.countsByCategory.STUDENT_BATCH || 0;

  els.kpiFacultyCount.textContent = facCount;
  els.kpiFacultyCount.style.color = facCount > 0 ? '#ef4444' : '#10b981';

  els.kpiRoomCount.textContent = roomCount;
  els.kpiRoomCount.style.color = roomCount > 0 ? '#f59e0b' : '#10b981';

  els.kpiBatchCount.textContent = batchCount;
  els.kpiBatchCount.style.color = batchCount > 0 ? '#38bdf8' : '#10b981';
}

function renderDirectoryView() {
  const { faculty, classrooms, batches } = appState.resources;

  if (els.dirFacultyCountBadge) els.dirFacultyCountBadge.textContent = `${faculty.length} Faculty`;
  if (els.dirRoomCountBadge) els.dirRoomCountBadge.textContent = `${classrooms.length} Rooms/Labs`;
  if (els.dirBatchCountBadge) els.dirBatchCountBadge.textContent = `${batches.length} Batches`;

  els.facultyDirectoryPills.innerHTML = faculty
    .map(
      (f) => `
      <div class="resource-item-card" data-filter-type="FACULTY" data-filter-id="${escapeHtml(f.id)}">
        <div>
          <strong style="font-size:0.9rem;">👨‍🏫 ${escapeHtml(f.name)}</strong>
          <div style="font-size:0.76rem; color:var(--text-muted);">${escapeHtml(f.department)} • ${escapeHtml(f.specialization)}</div>
        </div>
        <span class="pill-tag pill-info">${escapeHtml(f.deptCode || 'DEPT')}</span>
      </div>
    `
    )
    .join('');

  els.roomDirectoryPills.innerHTML = classrooms
    .map((r) => {
      const icon = r.type === 'COMPUTER_LAB' ? '💻' : '🏫';
      return `
        <div class="resource-item-card" data-filter-type="ROOM" data-filter-id="${escapeHtml(r.id)}">
          <div>
            <strong style="font-size:0.9rem;">${icon} ${escapeHtml(r.name)}</strong>
            <div style="font-size:0.76rem; color:var(--text-muted);">${escapeHtml(r.building || 'Campus')} • ${r.type === 'COMPUTER_LAB' ? 'Engineering / Computer Lab' : 'Lecture Hall'}</div>
          </div>
          <span class="pill-tag pill-success">${r.capacity} Seats</span>
        </div>
      `;
    })
    .join('');

  els.batchDirectoryPills.innerHTML = batches
    .map(
      (b) => `
      <div class="resource-item-card" data-filter-type="BATCH" data-filter-id="${escapeHtml(b.id)}">
        <div>
          <strong style="font-size:0.9rem;">🎓 ${escapeHtml(b.name)}</strong>
          <div style="font-size:0.76rem; color:var(--text-muted);">${escapeHtml(b.department)} • Semester S${b.semester || 1}</div>
        </div>
        <span class="pill-tag pill-info">S${b.semester || 1} • ${b.size} Students</span>
      </div>
    `
    )
    .join('');

  els.btnClearFilter.style.display =
    currentFilterType === 'ALL' && currentSemesterFilter === 'ALL' ? 'none' : 'inline-flex';

  document.querySelectorAll('.resource-item-card').forEach((card) => {
    card.addEventListener('click', () => {
      currentFilterType = card.getAttribute('data-filter-type');
      currentFilterEntityId = card.getAttribute('data-filter-id');
      syncFilterControls();
      renderTimetableGrid();
      switchMainView('timetable');
    });
  });
}

function syncFilterControls() {
  els.filterTypeSelect.value = currentFilterType;
  const semSuffix = currentSemesterFilter !== 'ALL' ? ` • Semester S${currentSemesterFilter}` : ' (All Semesters S1–S8)';

  if (currentFilterType === 'ALL') {
    els.filterEntitySelect.style.display = 'none';
    els.activeFilterLabel.textContent = `Showing: All College Departments${semSuffix}`;
    els.btnClearFilter.style.display = currentSemesterFilter === 'ALL' ? 'none' : 'inline-flex';
    if (els.topDeptDropdown) els.topDeptDropdown.value = 'ALL';
    return;
  }

  let items = [];
  if (currentFilterType === 'DEPT') {
    items = (appState.resources.departments || []).map((d) => ({
      id: d.id,
      name: d.name,
    }));
  }
  if (currentFilterType === 'SEM') {
    items = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
      id: String(n),
      name: `Semester ${n} (S${n})`,
    }));
  }
  if (currentFilterType === 'BATCH') items = appState.resources.batches;
  if (currentFilterType === 'FACULTY') items = appState.resources.faculty;
  if (currentFilterType === 'ROOM') items = appState.resources.classrooms;

  els.filterEntitySelect.innerHTML = items
    .map((item) => `<option value="${item.id}">${escapeHtml(item.name)}</option>`)
    .join('');
  els.filterEntitySelect.style.display = 'inline-block';
  if (!currentFilterEntityId && items[0]) {
    currentFilterEntityId = String(items[0].id);
  }
  els.filterEntitySelect.value = currentFilterEntityId;

  const selectedObj = items.find((i) => String(i.id) === String(currentFilterEntityId));
  els.activeFilterLabel.textContent = `Filtered: ${selectedObj ? selectedObj.name : currentFilterEntityId}${
    currentFilterType !== 'SEM' && currentSemesterFilter !== 'ALL' ? ` • S${currentSemesterFilter}` : ''
  }`;
  els.btnClearFilter.style.display = 'inline-flex';

  if (currentFilterType === 'DEPT' && els.topDeptDropdown) {
    els.topDeptDropdown.value = currentFilterEntityId;
  }
  if (currentFilterType === 'SEM' && els.topSemDropdown) {
    els.topSemDropdown.value = currentFilterEntityId;
  }
}

function setDepartmentFilter(deptCode) {
  if (!deptCode || deptCode === 'ALL') {
    currentFilterType = 'ALL';
    currentFilterEntityId = '';
    if (els.inDept) els.inDept.value = 'ALL';
  } else {
    currentFilterType = 'DEPT';
    currentFilterEntityId = deptCode;
    if (els.inDept) els.inDept.value = deptCode;
  }
  populateInlineBuilderOptions();
  syncFilterControls();
  renderTimetableGrid();
}

function setSemesterFilter(semVal) {
  currentSemesterFilter = semVal || 'ALL';
  if (els.topSemDropdown) els.topSemDropdown.value = currentSemesterFilter;
  if (els.inSem) els.inSem.value = currentSemesterFilter;
  populateInlineBuilderOptions();
  syncFilterControls();
  renderTimetableGrid();
}

function renderTimetableGrid() {
  const { days, timeSlots } = appState.metadata;
  const { sessions, sessionConflictsMap } = appState.conflictReport;

  const filteredSessions = sessions.filter((s) => {
    if (currentSemesterFilter !== 'ALL' && Number(s.semester) !== Number(currentSemesterFilter)) {
      return false;
    }
    if (currentFilterType === 'ALL' || !currentFilterEntityId) return true;
    if (currentFilterType === 'DEPT') {
      return s.deptCode === currentFilterEntityId;
    }
    if (currentFilterType === 'SEM') {
      return Number(s.semester) === Number(currentFilterEntityId);
    }
    if (currentFilterType === 'BATCH') return s.batchId === currentFilterEntityId;
    if (currentFilterType === 'FACULTY') return s.facultyId === currentFilterEntityId;
    if (currentFilterType === 'ROOM') return s.roomId === currentFilterEntityId;
    return true;
  });

  const htmlRows = timeSlots.map((slot) => {
    const dayCells = days
      .map((day) => {
        const cellSessions = filteredSessions.filter(
          (s) => s.day === day && s.slot === slot
        );

        const cardsHtml = cellSessions
          .map((s) => {
            const sConflicts = sessionConflictsMap[s.id] || [];
            const hasConflict = sConflicts.length > 0;
            const overCapacity = s.batchSize > s.roomCapacity;
            const uniqueTags = [...new Set(sConflicts.map((c) => shortConflictTag(c.subtype)))];

            return `
              <div
                class="session-card ${hasConflict ? 'has-conflict' : ''}"
                data-session-id="${escapeHtml(s.id)}"
                style="border-left-color: ${hasConflict ? '#ef4444' : escapeHtml(s.batchColor)}"
              >
                <div class="session-subject">
                  <span>
                    <strong style="color:#2563eb; font-size:0.73rem;">[${escapeHtml(s.deptCode || 'DEPT')} • ${escapeHtml(s.semesterLabel || 'S1')}]</strong>
                    ${escapeHtml(s.courseTitle)}
                  </span>
                  ${
                    hasConflict
                      ? `<span class="pill-tag pill-danger" style="font-size:0.68rem; padding:0.08rem 0.42rem;">🚨 Clash</span>`
                      : `<span class="pill-tag pill-success" style="font-size:0.68rem; padding:0.08rem 0.42rem;">✓ OK</span>`
                  }
                </div>

                <div class="session-details">
                  <span>👨‍🏫 ${escapeHtml(s.facultyName)}</span>
                  <span>🎓 ${escapeHtml(s.batchName)} (${s.batchSize} students)</span>
                  <span style="${overCapacity ? 'color:#dc2626; font-weight:700;' : ''}">
                    🏫 ${escapeHtml(s.roomName)} (${s.batchSize}/${s.roomCapacity} seats)
                  </span>
                </div>

                ${
                  uniqueTags.length > 0
                    ? `<div class="session-conflict-tags">
                        ${uniqueTags.map((t) => `<span class="mini-alert-tag">${escapeHtml(t)}</span>`).join('')}
                       </div>`
                    : ''
                }
              </div>
            `;
          })
          .join('');

        return `
          <td class="grid-cell" data-day="${escapeHtml(day)}" data-slot="${escapeHtml(slot)}">
            ${cardsHtml}
          </td>
        `;
      })
      .join('');

    return `
      <tr>
        <td class="slot-label-cell">${escapeHtml(slot)}</td>
        ${dayCells}
      </tr>
    `;
  });

  els.timetableBody.innerHTML = htmlRows.join('');

  els.timetableBody.querySelectorAll('.session-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      e.stopPropagation();
      openSessionModal(card.getAttribute('data-session-id'));
    });
  });

  els.timetableBody.querySelectorAll('.grid-cell').forEach((cell) => {
    cell.addEventListener('click', () => {
      els.inDay.value = cell.getAttribute('data-day');
      els.inSlot.value = cell.getAttribute('data-slot');
      switchMainView('builder');
      toggleQuickAddPanel(false);
    });
  });
}

function renderResolutionPlan() {
  const previewLog = appState.optimizationPreview.resolutionLog || [];
  const lastOpt = appState.lastOptimizationResult;

  const listToRender =
    previewLog.length > 0
      ? previewLog
      : lastOpt && lastOpt.resolutionLog.length > 0
      ? lastOpt.resolutionLog
      : [];

  const isAlreadyApplied = previewLog.length === 0 && listToRender.length > 0;

  if (listToRender.length === 0) {
    els.diffSectionTitle.textContent = '✅ Whole-College Timetable is 100% Conflict-Free!';
    els.diffSectionSubtitle.textContent =
      'Every department, faculty member, classroom, lab, and student batch is scheduled without any overlap.';
    els.btnApplyDiff.style.display = 'none';
    els.diffListContainer.innerHTML = '';
    return;
  }

  if (isAlreadyApplied) {
    els.diffSectionTitle.textContent = `✅ AI Fixed ${listToRender.length} Classes Across Campus`;
    els.diffSectionSubtitle.textContent = 'Here are the exact changes the AI Optimizer made:';
    els.btnApplyDiff.style.display = 'none';
  } else {
    els.diffSectionTitle.textContent = `🔧 Step-by-Step AI Fix Plan (${listToRender.length} Moves)`;
    els.diffSectionSubtitle.textContent =
      'Click "✨ Apply AI Fixes Now" to execute these changes automatically:';
    els.btnApplyDiff.style.display = 'inline-flex';
  }

  const rowsHtml = listToRender
    .map(
      (item) => `
      <tr>
        <td>
          <strong>${escapeHtml(item.courseTitle)}</strong><br/>
          <span style="font-size:0.78rem; color:var(--text-muted);">
            👨‍🏫 ${escapeHtml(item.facultyName)} • 🎓 ${escapeHtml(item.batchName)} (${item.batchSize})
          </span>
        </td>
        <td style="color:#dc2626;">
          ${escapeHtml(item.from.dayLabel)}, ${escapeHtml(item.from.slot)}<br/>
          <strong>${escapeHtml(item.from.roomName)}</strong> (${item.from.roomCapacity} seats)
        </td>
        <td style="color:#059669;">
          <strong>${escapeHtml(item.to.dayLabel)}, ${escapeHtml(item.to.slot)}</strong><br/>
          <strong>${escapeHtml(item.to.roomName)}</strong> (${item.to.roomCapacity} seats)
        </td>
        <td style="font-size:0.8rem; color:#334155;">
          ${escapeHtml(item.resolvedConflicts.join(' • '))}
        </td>
      </tr>
    `
    )
    .join('');

  els.diffListContainer.innerHTML = `
    <table class="diff-table">
      <thead>
        <tr>
          <th>Class &amp; Faculty</th>
          <th>Before (Conflicted)</th>
          <th>After (AI Fixed)</th>
          <th>Problem Solved</th>
        </tr>
      </thead>
      <tbody>
        ${rowsHtml}
      </tbody>
    </table>
  `;
}

function renderConflictRadar() {
  const { conflicts } = appState.conflictReport;
  els.tabConflictCount.textContent = conflicts.length;

  if (conflicts.length === 0) {
    els.tabPanelConflicts.innerHTML = `
      <div style="text-align:center; padding: 2.5rem 1.25rem; background: #ecfdf5; border: 1px solid rgba(16, 185, 129, 0.35); border-radius: 12px;">
        <div style="font-size: 2.4rem; margin-bottom: 0.5rem;">🎉</div>
        <h4 style="font-size: 1.05rem; color: #047857; margin-bottom: 0.4rem;">Zero Conflicts Across All College Departments!</h4>
        <p style="font-size: 0.85rem; color: var(--text-secondary);">
          All departments, faculty members, classrooms/labs, and student batches have a valid, clash-free schedule.
        </p>
      </div>
    `;
    return;
  }

  const groups = [
    {
      key: 'FACULTY',
      label: '👨‍🏫 Faculty (Teacher) Conflicts',
      items: conflicts.filter((c) => c.category === 'FACULTY'),
    },
    {
      key: 'CLASSROOM',
      label: '🏫 Classroom, Lab & Seat Capacity Conflicts',
      items: conflicts.filter((c) => c.category === 'CLASSROOM'),
    },
    {
      key: 'STUDENT_BATCH',
      label: '🎓 Student-Batch Conflicts',
      items: conflicts.filter((c) => c.category === 'STUDENT_BATCH'),
    },
  ];

  els.tabPanelConflicts.innerHTML = groups
    .filter((g) => g.items.length > 0)
    .map(
      (g) => `
      <div class="conflict-group-header">${g.label} (${g.items.length})</div>
      ${g.items
        .map(
          (c) => `
        <div class="conflict-card">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="pill-tag pill-danger">${escapeHtml(shortConflictTag(c.subtype))}</span>
            <span style="font-size:0.78rem; color:var(--text-muted); font-weight:600;">
              ${escapeHtml(c.dayLabel)} • ${escapeHtml(c.slot)}
            </span>
          </div>
          <div class="conflict-title">${escapeHtml(c.title)}</div>
          <div style="font-size:0.84rem; color:#334155;">
            ${escapeHtml(c.description)}
          </div>
          <div class="conflict-fix">
            <strong>💡 How AI Fixes It:</strong> ${escapeHtml(c.suggestedFix)}
          </div>
        </div>
      `
        )
        .join('')}
    `
    )
    .join('');
}

function renderConflictGraph() {
  const { nodes, edges } = appState.conflictReport.conflictGraph;
  const width = 460;
  const height = 370;
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) * 0.37;

  if (nodes.length === 0) {
    els.conflictGraphContainer.innerHTML = '<p style="color:var(--text-muted)">No classes scheduled yet.</p>';
    return;
  }

  const positioned = nodes.map((n, idx) => {
    const angle = (2 * Math.PI * idx) / nodes.length - Math.PI / 2;
    return {
      ...n,
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  });

  const nodeMap = new Map(positioned.map((n) => [n.id, n]));
  const edgeColors = {
    FACULTY: '#ef4444',
    CLASSROOM: '#f59e0b',
    STUDENT_BATCH: '#a855f7',
  };

  const svgEdges = edges
    .map((e, idx) => {
      const s = nodeMap.get(e.source);
      const t = nodeMap.get(e.target);
      if (!s || !t) return '';
      const color = edgeColors[e.category] || '#ef4444';
      const offset = (idx % 3 - 1) * 16;
      const mx = (s.x + t.x) / 2 + offset;
      const my = (s.y + t.y) / 2 - offset;
      return `
        <path
          d="M ${s.x} ${s.y} Q ${mx} ${my} ${t.x} ${t.y}"
          stroke="${color}"
          stroke-width="2.8"
          fill="none"
        >
          <title>${escapeHtml(e.reason)}</title>
        </path>
      `;
    })
    .join('');

  const svgNodes = positioned
    .map((n) => {
      const isConflicted = n.conflictCount > 0;
      const fill = isConflicted ? '#dc2626' : '#10b981';
      const stroke = isConflicted ? '#fca5a5' : '#6ee7b7';
      const cleanCode = (n.label.split(':')[0] || n.label).trim().slice(0, 7);
      return `
        <g transform="translate(${n.x}, ${n.y})" style="cursor:pointer" data-node-id="${escapeHtml(n.id)}">
          <circle r="20" fill="${fill}" stroke="${stroke}" stroke-width="2.2" />
          <text text-anchor="middle" dy="4" fill="#ffffff" font-size="9.5" font-weight="700">
            ${escapeHtml(cleanCode)}
          </text>
          <title>${escapeHtml(n.label)} | ${escapeHtml(n.faculty)} | ${escapeHtml(n.room)} | ${escapeHtml(n.batch)}</title>
        </g>
      `;
    })
    .join('');

  els.conflictGraphContainer.innerHTML = `
    <svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}">
      ${svgEdges}
      ${svgNodes}
    </svg>
  `;

  els.conflictGraphContainer.querySelectorAll('g[data-node-id]').forEach((g) => {
    g.addEventListener('click', () => openSessionModal(g.getAttribute('data-node-id')));
  });
}

function populateModalSelects() {
  const { courses, faculty, batches, classrooms } = appState.resources;
  const { days, dayLabels, timeSlots } = appState.metadata;

  els.formCourseId.innerHTML = courses
    .map((c) => `<option value="${c.id}">[${escapeHtml(c.deptCode || 'GEN')}] ${escapeHtml(c.title)} (${escapeHtml(c.code)})</option>`)
    .join('');

  els.formFacultyId.innerHTML = faculty
    .map((f) => `<option value="${f.id}">[${escapeHtml(f.deptCode || 'GEN')}] ${escapeHtml(f.name)} (${escapeHtml(f.specialization)})</option>`)
    .join('');

  els.formBatchId.innerHTML = batches
    .map((b) => `<option value="${b.id}">[${escapeHtml(b.deptCode || 'GEN')}] ${escapeHtml(b.name)} (${b.size} students)</option>`)
    .join('');

  els.formRoomId.innerHTML = classrooms
    .map((r) => `<option value="${r.id}">${escapeHtml(r.name)} (${r.capacity} seats)</option>`)
    .join('');

  els.formDay.innerHTML = days
    .map((d) => `<option value="${d}">${escapeHtml(dayLabels[d] || d)}</option>`)
    .join('');

  els.formSlot.innerHTML = timeSlots
    .map((s) => `<option value="${s}">${escapeHtml(s)}</option>`)
    .join('');
}

function openSessionModal(sessionId = null) {
  populateModalSelects();
  if (!sessionId) return;
  const existing = appState.conflictReport.sessions.find((s) => s.id === sessionId);
  if (!existing) return;
  els.sessionModalTitle.textContent = `Edit Class: ${existing.courseTitle}`;
  els.formSessionId.value = existing.id;
  els.formCourseId.value = existing.courseId;
  els.formFacultyId.value = existing.facultyId;
  els.formBatchId.value = existing.batchId;
  els.formRoomId.value = existing.roomId;
  els.formDay.value = existing.day;
  els.formSlot.value = existing.slot;
  els.btnDeleteSession.style.display = 'inline-flex';
  els.sessionModal.classList.add('open');
}

function closeSessionModal() {
  els.sessionModal.classList.remove('open');
}

function updateFullUI(newState) {
  appState = newState;
  populateDepartmentSelectors();
  populateInlineBuilderOptions();
  renderKPIs();
  renderLiveConflictBanner();
  renderDirectoryView();
  renderTimetableGrid();
  renderResolutionPlan();
  renderConflictRadar();
  renderConflictGraph();
}

async function handleOptimize() {
  els.btnOptimize.disabled = true;
  els.btnOptimize.innerHTML = '<span>⏳ Fixing...</span>';
  try {
    const data = await apiRequest('/api/optimize', { method: 'POST', body: '{}' });
    updateFullUI(data);
  } finally {
    els.btnOptimize.disabled = false;
    els.btnOptimize.innerHTML = '<span>✨ Auto-Fix Conflicts</span>';
  }
}

async function loadPresetScenario(presetKey) {
  const data = await apiRequest('/api/schedule/preset', {
    method: 'POST',
    body: JSON.stringify({ preset: presetKey }),
  });
  updateFullUI(data);
}

async function runQualcommAiDiagnosis() {
  els.btnRunAiAnalysis.disabled = true;
  els.btnRunAiAnalysis.textContent = 'Analyzing...';
  els.aiAnalysisOutput.textContent = 'Analyzing whole-college timetable conflicts with AI Engine...';
  try {
    const res = await apiRequest('/api/ai/analyze', { method: 'POST', body: '{}' });
    els.aiAnalysisOutput.textContent = res.aiNarrative;
  } catch (err) {
    els.aiAnalysisOutput.textContent = `Error: ${err.message}`;
  } finally {
    els.btnRunAiAnalysis.disabled = false;
    els.btnRunAiAnalysis.textContent = '⚡ Generate AI Summary';
  }
}

function appendChatBubble(role, text, suggestedAction = null) {
  const div = document.createElement('div');
  div.className = `chat-bubble ${role}`;
  div.textContent = text;

  if (suggestedAction) {
    const btnWrap = document.createElement('div');
    btnWrap.style.marginTop = '0.5rem';
    const actionBtn = document.createElement('button');
    actionBtn.className = 'btn btn-primary';
    actionBtn.style.fontSize = '0.78rem';
    actionBtn.style.padding = '0.35rem 0.75rem';
    actionBtn.textContent = `✨ ${suggestedAction.label}`;
    actionBtn.addEventListener('click', async () => {
      if (suggestedAction.type === 'OPTIMIZE_SCHEDULE') {
        await handleOptimize();
      } else if (suggestedAction.type === 'LOAD_PRESET') {
        await loadPresetScenario(suggestedAction.preset);
      }
    });
    btnWrap.appendChild(actionBtn);
    div.appendChild(btnWrap);
  }

  els.chatMessages.appendChild(div);
  els.chatMessages.scrollTop = els.chatMessages.scrollHeight;
}

async function sendChatMessage(message) {
  if (!message.trim()) return;
  appendChatBubble('user', message);
  els.chatInput.value = '';

  try {
    const res = await apiRequest('/api/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
    appendChatBubble('assistant', res.reply, res.suggestedAction);
  } catch (err) {
    appendChatBubble('assistant', `Error: ${err.message}`);
  }
}

function exportCsv() {
  const sessions = appState.conflictReport.sessions || [];
  const headers = [
    'Session ID',
    'Department',
    'Semester',
    'Day',
    'Time Slot',
    'Course Code',
    'Subject',
    'Teacher',
    'Student Batch',
    'Students',
    'Classroom / Lab',
    'Room Capacity',
    'Status',
  ];
  const rows = sessions.map((s) => {
    const clashes = (appState.conflictReport.sessionConflictsMap[s.id] || []).length;
    return [
      s.id,
      `"${s.deptCode || 'GEN'}"`,
      `"${s.semesterLabel || 'S1'}"`,
      s.dayLabel,
      s.slot,
      s.courseCode,
      `"${s.courseTitle}"`,
      `"${s.facultyName}"`,
      `"${s.batchName}"`,
      s.batchSize,
      `"${s.roomName}"`,
      s.roomCapacity,
      clashes > 0 ? `CONFLICT (${clashes})` : 'OK',
    ].join(',');
  });
  const csvContent = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'CampusQ-Whole-College-Timetable.csv';
  a.click();
  URL.revokeObjectURL(url);
}

function toggleQuickAddPanel(forceShow = null) {
  if (els.quickAddResourcesPanel) {
    els.quickAddResourcesPanel.style.display = 'block';
  }
  const scheduleClassSubPanel = document.getElementById('scheduleClassSubPanel');
  if (scheduleClassSubPanel) {
    scheduleClassSubPanel.style.display = 'block';
  }
  if (forceShow === true) {
    switchMainView('register-resources');
  } else if (forceShow === false) {
    switchMainView('builder');
  }
}

function setupEventListeners() {
  // Brand Home Click -> Website Home Page
  if (els.brandHomeBtn) {
    els.brandHomeBtn.addEventListener('click', () => switchMainView('home'));
  }

  const heroQuickOptimizeBtn = document.getElementById('heroQuickOptimizeBtn');
  if (heroQuickOptimizeBtn) {
    heroQuickOptimizeBtn.addEventListener('click', async () => {
      await handleOptimize();
      switchMainView('timetable');
    });
  }

  // Header Facility Quick-Select Dropdown
  if (els.headerFacilitySelect) {
    els.headerFacilitySelect.addEventListener('change', (e) => {
      switchMainView(e.target.value);
    });
  }

  // Top Bar Department Filter Dropdown
  if (els.topDeptDropdown) {
    els.topDeptDropdown.addEventListener('change', (e) => {
      setDepartmentFilter(e.target.value);
      switchMainView('timetable');
    });
  }

  // Top Bar Semester Filter Dropdown
  if (els.topSemDropdown) {
    els.topSemDropdown.addEventListener('change', (e) => {
      setSemesterFilter(e.target.value);
      switchMainView('timetable');
    });
  }

  // Inner Sub-Tabs in Tab 2 (Schedule a Class vs Register Resources)
  const subtabScheduleClassBtn = document.getElementById('subtabScheduleClassBtn');
  if (subtabScheduleClassBtn) {
    subtabScheduleClassBtn.addEventListener('click', () => toggleQuickAddPanel(false));
  }
  if (els.btnToggleQuickAddPanel) {
    els.btnToggleQuickAddPanel.addEventListener('click', () => toggleQuickAddPanel(true));
  }
  const navToggleQuickResourceBtn = document.getElementById('navToggleQuickResourceBtn');
  if (navToggleQuickResourceBtn) {
    navToggleQuickResourceBtn.addEventListener('click', () => {
      switchMainView('builder');
      toggleQuickAddPanel(true);
    });
  }
  const navOpenAddResourceBarBtn = document.getElementById('navOpenAddResourceBarBtn');
  if (navOpenAddResourceBarBtn) {
    navOpenAddResourceBarBtn.addEventListener('click', () => {
      switchMainView('builder');
      toggleQuickAddPanel(true);
    });
  }

  // Inner Sub-Tabs in Tab 5 (College Directory: All / Faculty / Rooms / Batches)
  document.querySelectorAll('[data-dir-tab]').forEach((tabBtn) => {
    tabBtn.addEventListener('click', () => {
      const targetTab = tabBtn.getAttribute('data-dir-tab');
      document.querySelectorAll('[data-dir-tab]').forEach((b) => {
        b.classList.toggle('active', b === tabBtn);
      });
      const dirGrid = document.getElementById('directoryGridContainer');
      if (dirGrid) {
        dirGrid.classList.toggle('single-col-mode', targetTab !== 'all');
      }
      document.querySelectorAll('.dir-col-card').forEach((card) => {
        const panelType = card.getAttribute('data-dir-panel');
        card.style.display = targetTab === 'all' || targetTab === panelType ? 'block' : 'none';
      });
    });
  });

  // Clear Grid Inline Button
  if (els.btnClearTimetableInline) {
    els.btnClearTimetableInline.addEventListener('click', async () => {
      await loadPresetScenario('empty');
      switchMainView('timetable');
    });
  }

  // Quick-Add Forms in Tab 2
  if (els.quickAddFacultyForm) {
    els.quickAddFacultyForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = els.qaFacultyName.value.trim();
      if (!name) return;
      const data = await apiRequest('/api/resources/add', {
        method: 'POST',
        body: JSON.stringify({
          category: 'FACULTY',
          name,
          deptCode: els.qaFacultyDept.value || 'CSE',
          specialization: els.qaFacultySpec.value.trim() || 'Core Subject',
        }),
      });
      els.qaFacultyName.value = '';
      els.qaFacultySpec.value = '';
      updateFullUI(data);
      els.inTeacher.value = name;
      toggleQuickAddPanel(false);
    });
  }

  if (els.quickAddCourseForm) {
    els.quickAddCourseForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = els.qaCourseName.value.trim();
      if (!name) return;
      const data = await apiRequest('/api/resources/add', {
        method: 'POST',
        body: JSON.stringify({
          category: 'COURSE',
          name,
          deptCode: els.qaCourseDept.value || 'CSE',
          semester: els.qaCourseSem ? Number(els.qaCourseSem.value) || 3 : 3,
          requiredRoomType: els.qaCourseType.value || 'LECTURE',
        }),
      });
      els.qaCourseName.value = '';
      updateFullUI(data);
      els.inSubject.value = name;
      els.inRoomType.value = els.qaCourseType.value || 'LECTURE';
      toggleQuickAddPanel(false);
    });
  }

  if (els.quickAddRoomForm) {
    els.quickAddRoomForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = els.qaRoomName.value.trim();
      if (!name) return;
      const data = await apiRequest('/api/resources/add', {
        method: 'POST',
        body: JSON.stringify({
          category: 'ROOM',
          name,
          capacity: Number(els.qaRoomCap.value) || 60,
          roomType: els.qaRoomType.value || 'LECTURE',
        }),
      });
      els.qaRoomName.value = '';
      updateFullUI(data);
      const createdRoom = data.resources.classrooms[data.resources.classrooms.length - 1];
      if (createdRoom) els.inRoom.value = createdRoom.id;
      toggleQuickAddPanel(false);
    });
  }

  if (els.quickAddBatchForm) {
    els.quickAddBatchForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = els.qaBatchName.value.trim();
      if (!name) return;
      const customDept = els.qaCustomDept.value.trim();
      let deptCode = 'CSE';
      if (customDept) {
        await apiRequest('/api/resources/add', {
          method: 'POST',
          body: JSON.stringify({
            category: 'DEPARTMENT',
            name: customDept,
            code: customDept,
          }),
        });
        deptCode = customDept.replace(/[^A-Za-z]/g, '').slice(0, 5).toUpperCase() || 'CSE';
      }
      const data = await apiRequest('/api/resources/add', {
        method: 'POST',
        body: JSON.stringify({
          category: 'BATCH',
          name,
          deptCode,
          department: customDept || undefined,
          semester: els.qaBatchSem ? Number(els.qaBatchSem.value) || 3 : 3,
          size: Number(els.qaBatchSize.value) || 60,
        }),
      });
      els.qaBatchName.value = '';
      els.qaCustomDept.value = '';
      updateFullUI(data);
      els.inBatch.value = name;
      toggleQuickAddPanel(false);
    });
  }

  // Builder Dropdowns (Filter or reveal custom text box when "__CUSTOM__" is chosen)
  if (els.inDept) {
    els.inDept.addEventListener('change', () => {
      syncCustomInputVisibility();
      if (els.inDept.value === '__CUSTOM__') {
        els.inDeptCustom.focus();
      } else {
        populateInlineBuilderOptions();
      }
    });
  }

  if (els.inSem) {
    els.inSem.addEventListener('change', () => {
      populateInlineBuilderOptions();
    });
  }

  els.inSubject.addEventListener('change', () => {
    syncCustomInputVisibility();
    if (els.inSubject.value === '__CUSTOM__') {
      els.inSubjectCustom.focus();
      return;
    }
    const course = appState.resources.courses.find((c) => c.title === els.inSubject.value);
    if (!course) return;
    els.inRoomType.value = course.requiredRoomType || 'LECTURE';
    const fac = appState.resources.faculty.find((f) => f.id === course.facultyId);
    if (fac) els.inTeacher.value = fac.name;
    const batch = appState.resources.batches.find((b) => b.id === course.batchId);
    if (batch) els.inBatch.value = batch.name;
    syncCustomInputVisibility();
  });

  els.inTeacher.addEventListener('change', () => {
    syncCustomInputVisibility();
    if (els.inTeacher.value === '__CUSTOM__') els.inTeacherCustom.focus();
  });

  els.inBatch.addEventListener('change', () => {
    syncCustomInputVisibility();
    if (els.inBatch.value === '__CUSTOM__') els.inBatchCustom.focus();
  });

  els.inRoom.addEventListener('change', () => {
    syncCustomInputVisibility();
    if (els.inRoom.value === '__CUSTOM__') els.inRoomCustom.focus();
  });

  // Website Navbar Dropdown Menu Items & Main Tabs
  document.querySelectorAll('[data-nav-view]').forEach((item) => {
    item.addEventListener('click', () => {
      switchMainView(item.getAttribute('data-nav-view'));
    });
  });

  document.querySelectorAll('[data-nav-preset]').forEach((item) => {
    item.addEventListener('click', async () => {
      await loadPresetScenario(item.getAttribute('data-nav-preset'));
      switchMainView('timetable');
    });
  });

  document.querySelectorAll('[data-run-testcase-fix]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const presetKey = btn.getAttribute('data-run-testcase-fix');
      await loadPresetScenario(presetKey);
      await handleOptimize();
      switchMainView('fix-plan');
    });
  });

  const navFocusBuilderBtn = document.getElementById('navFocusBuilderBtn');
  if (navFocusBuilderBtn) {
    navFocusBuilderBtn.addEventListener('click', () => {
      switchMainView('builder');
      toggleQuickAddPanel(false);
      els.inSubject.focus();
    });
  }

  const navQuickOptimizeBtn = document.getElementById('navQuickOptimizeBtn');
  if (navQuickOptimizeBtn) {
    navQuickOptimizeBtn.addEventListener('click', handleOptimize);
  }

  const navExportCsvBtn = document.getElementById('navExportCsvBtn');
  if (navExportCsvBtn) {
    navExportCsvBtn.addEventListener('click', exportCsv);
  }

  const navPrintPdfBtn = document.getElementById('navPrintPdfBtn');
  if (navPrintPdfBtn) {
    navPrintPdfBtn.addEventListener('click', () => window.print());
  }

  // Scenario Dropdown
  if (els.scenarioDropdown) {
    els.scenarioDropdown.addEventListener('change', (e) => {
      loadPresetScenario(e.target.value);
    });
  }

  // Inline Builder Form Submit (handles both dropdown selections AND custom typed inputs!)
  els.inlineBuilderForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const isCustomDept = els.inDept.value === '__CUSTOM__';
    const isCustomSub = els.inSubject.value === '__CUSTOM__';
    const isCustomTeach = els.inTeacher.value === '__CUSTOM__';
    const isCustomBatch = els.inBatch.value === '__CUSTOM__';
    const isCustomRoom = els.inRoom.value === '__CUSTOM__';

    const subjectTitle = isCustomSub ? els.inSubjectCustom.value.trim() : els.inSubject.value;
    const teacherName = isCustomTeach ? els.inTeacherCustom.value.trim() : els.inTeacher.value;
    const batchName = isCustomBatch ? els.inBatchCustom.value.trim() : els.inBatch.value;

    const matchedBatch = appState.resources.batches.find((b) => b.name === batchName);
    const batchSize = isCustomBatch
      ? Number(els.inBatchSizeCustom.value) || 60
      : matchedBatch
      ? matchedBatch.size
      : 60;

    const selectedSemVal =
      els.inSem && els.inSem.value !== 'ALL'
        ? Number(els.inSem.value)
        : matchedBatch && matchedBatch.semester
        ? matchedBatch.semester
        : 3;

    const payload = {
      deptCode: isCustomDept ? 'CSE' : els.inDept.value,
      customDeptName: isCustomDept ? els.inDeptCustom.value.trim() : undefined,
      semester: selectedSemVal,
      subjectTitle,
      requiredRoomType: els.inRoomType.value,
      teacherName,
      batchName,
      batchSize,
      roomId: isCustomRoom ? undefined : els.inRoom.value,
      customRoomName: isCustomRoom ? els.inRoomCustom.value.trim() : undefined,
      customRoomCapacity: isCustomRoom ? Number(els.inRoomCapCustom.value) || 60 : undefined,
      customRoomType: els.inRoomType.value,
      day: els.inDay.value,
      slot: els.inSlot.value,
    };

    const data = await apiRequest('/api/schedule/custom-entry', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    // Clear custom text inputs after adding
    if (els.inDeptCustom) els.inDeptCustom.value = '';
    if (els.inSubjectCustom) els.inSubjectCustom.value = '';
    if (els.inTeacherCustom) els.inTeacherCustom.value = '';
    if (els.inBatchCustom) els.inBatchCustom.value = '';
    if (els.inRoomCustom) els.inRoomCustom.value = '';

    updateFullUI(data);
    switchMainView('timetable');
  });

  // Live Conflict Banner Buttons
  els.btnViewConflictDetails.addEventListener('click', () => {
    switchMainView('conflicts');
  });
  els.btnBannerFixNow.addEventListener('click', handleOptimize);

  // Add Custom Faculty, Room, or Batch in View 4
  els.addFacultyForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = await apiRequest('/api/resources/add', {
      method: 'POST',
      body: JSON.stringify({
        category: 'FACULTY',
        name: els.newFacultyName.value,
        deptCode: els.newFacultyDept ? els.newFacultyDept.value : 'CSE',
      }),
    });
    els.newFacultyName.value = '';
    updateFullUI(data);
  });

  els.addRoomForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = await apiRequest('/api/resources/add', {
      method: 'POST',
      body: JSON.stringify({
        category: 'ROOM',
        name: els.newRoomName.value,
        capacity: Number(els.newRoomCap.value) || 60,
        roomType: els.newRoomType.value,
      }),
    });
    els.newRoomName.value = '';
    updateFullUI(data);
  });

  els.addBatchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = await apiRequest('/api/resources/add', {
      method: 'POST',
      body: JSON.stringify({
        category: 'BATCH',
        name: els.newBatchName.value,
        deptCode: els.newBatchDept ? els.newBatchDept.value : 'CSE',
        size: Number(els.newBatchSize.value) || 60,
      }),
    });
    els.newBatchName.value = '';
    updateFullUI(data);
  });

  // Reset Filter
  els.btnClearFilter.addEventListener('click', () => {
    setDepartmentFilter('ALL');
  });

  // Optimize Buttons
  els.btnOptimize.addEventListener('click', handleOptimize);
  els.btnApplyDiff.addEventListener('click', handleOptimize);

  // Filter Dropdowns
  els.filterTypeSelect.addEventListener('change', (e) => {
    currentFilterType = e.target.value;
    currentFilterEntityId = '';
    syncFilterControls();
    renderTimetableGrid();
  });

  els.filterEntitySelect.addEventListener('change', (e) => {
    currentFilterEntityId = e.target.value;
    syncFilterControls();
    renderTimetableGrid();
  });

  // Session Edit Modal
  els.btnCloseSessionModal.addEventListener('click', closeSessionModal);
  els.btnCancelSession.addEventListener('click', closeSessionModal);

  els.sessionForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
      id: els.formSessionId.value || undefined,
      courseId: els.formCourseId.value,
      facultyId: els.formFacultyId.value,
      batchId: els.formBatchId.value,
      roomId: els.formRoomId.value,
      day: els.formDay.value,
      slot: els.formSlot.value,
    };
    const data = await apiRequest('/api/schedule/session', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    closeSessionModal();
    updateFullUI(data);
  });

  els.btnDeleteSession.addEventListener('click', async () => {
    const id = els.formSessionId.value;
    if (!id) return;
    const data = await apiRequest(`/api/schedule/session/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    closeSessionModal();
    updateFullUI(data);
  });

  // AI Diagnosis & Chat
  els.btnRunAiAnalysis.addEventListener('click', runQualcommAiDiagnosis);

  els.chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendChatMessage(els.chatInput.value);
  });

  document.querySelectorAll('[data-prompt]').forEach((chip) => {
    chip.addEventListener('click', () => {
      sendChatMessage(chip.getAttribute('data-prompt'));
    });
  });

  // Export CSV & Print PDF Buttons
  const btnExportCsv = document.getElementById('btnExportCsv');
  if (btnExportCsv) {
    btnExportCsv.addEventListener('click', exportCsv);
  }

  const btnPrint = document.getElementById('btnPrintSchedule');
  if (btnPrint) {
    btnPrint.addEventListener('click', () => window.print());
  }
}

async function init() {
  setupEventListeners();
  const initialData = await apiRequest('/api/state');
  updateFullUI(initialData);
}

init();
