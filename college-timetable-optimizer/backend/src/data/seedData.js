export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export const DAY_LABELS = {
  Mon: 'Monday',
  Tue: 'Tuesday',
  Wed: 'Wednesday',
  Thu: 'Thursday',
  Fri: 'Friday',
};

export const TIME_SLOTS = [
  '09:00 - 10:00',
  '10:00 - 11:00',
  '11:00 - 12:00',
  '01:00 - 02:00',
  '02:00 - 03:00',
];

export const SEMESTERS = [
  { id: 1, code: 'S1', name: 'Semester 1 (S1 — 1st Year)' },
  { id: 2, code: 'S2', name: 'Semester 2 (S2 — 1st Year)' },
  { id: 3, code: 'S3', name: 'Semester 3 (S3 — 2nd Year)' },
  { id: 4, code: 'S4', name: 'Semester 4 (S4 — 2nd Year)' },
  { id: 5, code: 'S5', name: 'Semester 5 (S5 — 3rd Year)' },
  { id: 6, code: 'S6', name: 'Semester 6 (S6 — 3rd Year)' },
  { id: 7, code: 'S7', name: 'Semester 7 (S7 — 4th Year)' },
  { id: 8, code: 'S8', name: 'Semester 8 (S8 — 4th Year)' },
];

export const DEPARTMENTS = [
  { id: 'CSE', code: 'CSE', name: 'Computer Science & Engineering (CSE)' },
  { id: 'IT', code: 'IT', name: 'Information Technology (IT)' },
  { id: 'AIDS', code: 'AI & DS', name: 'Artificial Intelligence & Data Science (AI & DS)' },
  { id: 'ECE', code: 'ECE', name: 'Electronics & Communication Engineering (ECE)' },
  { id: 'EEE', code: 'EEE', name: 'Electrical & Electronics Engineering (EEE)' },
  { id: 'ME', code: 'ME', name: 'Mechanical Engineering (ME)' },
  { id: 'CE', code: 'CE', name: 'Civil Engineering (CE)' },
  { id: 'BT', code: 'BT', name: 'Biotechnology & Biochemical Engg (BT)' },
  { id: 'MBS', code: 'Common / Maths', name: 'Mathematics & Basic Sciences (Common)' },
];

export const FACULTY = [
  // --- Computer Science & Engineering (CSE) ---
  {
    id: 'F1',
    name: 'Prof. Rahul Sharma',
    department: 'Computer Science & Engineering (CSE)',
    deptCode: 'CSE',
    specialization: 'Python & Data Structures',
    maxDailyHours: 4,
    unavailableSlots: ['Wed|02:00 - 03:00'],
    avatarColor: '#6366f1',
  },
  {
    id: 'F4',
    name: 'Prof. Vikram Patel',
    department: 'Computer Science & Engineering (CSE)',
    deptCode: 'CSE',
    specialization: 'DBMS & Computer Networks',
    maxDailyHours: 4,
    unavailableSlots: ['Thu|09:00 - 10:00'],
    avatarColor: '#ec4899',
  },
  {
    id: 'F5',
    name: 'Dr. Meera Krishnan',
    department: 'Computer Science & Engineering (CSE)',
    deptCode: 'CSE',
    specialization: 'Operating Systems & Algorithms',
    maxDailyHours: 4,
    unavailableSlots: [],
    avatarColor: '#3b82f6',
  },

  // --- Mathematics & Basic Sciences (Shared Across All Departments) ---
  {
    id: 'F2',
    name: 'Prof. Anita Verma',
    department: 'Mathematics & Basic Sciences (Common)',
    deptCode: 'MBS',
    specialization: 'Engineering Maths & Linear Algebra',
    maxDailyHours: 4,
    unavailableSlots: ['Fri|02:00 - 03:00'],
    avatarColor: '#10b981',
  },
  {
    id: 'F18',
    name: 'Dr. Gopalakrishnan S.',
    department: 'Mathematics & Basic Sciences (Common)',
    deptCode: 'MBS',
    specialization: 'Engineering Physics & Mechanics',
    maxDailyHours: 4,
    unavailableSlots: [],
    avatarColor: '#14b8a6',
  },

  // --- Information Technology (IT) ---
  {
    id: 'F3',
    name: 'Prof. Priya Nair',
    department: 'Information Technology (IT)',
    deptCode: 'IT',
    specialization: 'Java & Web Development',
    maxDailyHours: 4,
    unavailableSlots: ['Mon|11:00 - 12:00'],
    avatarColor: '#f59e0b',
  },
  {
    id: 'F6',
    name: 'Prof. Arjun Menon',
    department: 'Information Technology (IT)',
    deptCode: 'IT',
    specialization: 'Cloud Computing & Cybersecurity',
    maxDailyHours: 4,
    unavailableSlots: [],
    avatarColor: '#8b5cf6',
  },

  // --- Artificial Intelligence & Data Science (AI & DS) ---
  {
    id: 'F7',
    name: 'Dr. Kavita Rao',
    department: 'Artificial Intelligence & Data Science (AI & DS)',
    deptCode: 'AIDS',
    specialization: 'Machine Learning & Deep Learning',
    maxDailyHours: 4,
    unavailableSlots: [],
    avatarColor: '#a855f7',
  },
  {
    id: 'F8',
    name: 'Prof. Siddharth Iyer',
    department: 'Artificial Intelligence & Data Science (AI & DS)',
    deptCode: 'AIDS',
    specialization: 'Data Science & AI Lab',
    maxDailyHours: 4,
    unavailableSlots: [],
    avatarColor: '#06b6d4',
  },

  // --- Electronics & Communication Engineering (ECE) ---
  {
    id: 'F9',
    name: 'Dr. Suresh Babu',
    department: 'Electronics & Communication Engineering (ECE)',
    deptCode: 'ECE',
    specialization: 'Signals, Systems & VLSI Design',
    maxDailyHours: 4,
    unavailableSlots: [],
    avatarColor: '#f97316',
  },
  {
    id: 'F10',
    name: 'Prof. Lakshmi Pillai',
    department: 'Electronics & Communication Engineering (ECE)',
    deptCode: 'ECE',
    specialization: 'Embedded Systems & Microprocessors Lab',
    maxDailyHours: 4,
    unavailableSlots: [],
    avatarColor: '#eab308',
  },

  // --- Electrical & Electronics Engineering (EEE) ---
  {
    id: 'F11',
    name: 'Dr. Rajesh Varma',
    department: 'Electrical & Electronics Engineering (EEE)',
    deptCode: 'EEE',
    specialization: 'Power Systems & Electrical Machines',
    maxDailyHours: 4,
    unavailableSlots: [],
    avatarColor: '#ef4444',
  },
  {
    id: 'F12',
    name: 'Prof. Divya Nambiar',
    department: 'Electrical & Electronics Engineering (EEE)',
    deptCode: 'EEE',
    specialization: 'Control Systems & Power Electronics Lab',
    maxDailyHours: 4,
    unavailableSlots: [],
    avatarColor: '#fb7185',
  },

  // --- Mechanical Engineering (ME) ---
  {
    id: 'F13',
    name: 'Dr. Manoj Kumar',
    department: 'Mechanical Engineering (ME)',
    deptCode: 'ME',
    specialization: 'Thermodynamics & Fluid Mechanics',
    maxDailyHours: 4,
    unavailableSlots: [],
    avatarColor: '#0ea5e9',
  },
  {
    id: 'F14',
    name: 'Prof. Harish Chandran',
    department: 'Mechanical Engineering (ME)',
    deptCode: 'ME',
    specialization: 'CAD/CAM Lab & Manufacturing Tech',
    maxDailyHours: 4,
    unavailableSlots: [],
    avatarColor: '#38bdf8',
  },

  // --- Civil Engineering (CE) ---
  {
    id: 'F15',
    name: 'Dr. Thomas Mathew',
    department: 'Civil Engineering (CE)',
    deptCode: 'CE',
    specialization: 'Structural Analysis & Geotechnical Engg',
    maxDailyHours: 4,
    unavailableSlots: [],
    avatarColor: '#84cc16',
  },
  {
    id: 'F16',
    name: 'Prof. Sneha Kurian',
    department: 'Civil Engineering (CE)',
    deptCode: 'CE',
    specialization: 'Surveying & Civil CAD Lab',
    maxDailyHours: 4,
    unavailableSlots: [],
    avatarColor: '#22c55e',
  },

  // --- Biotechnology & Biochemical Engg (BT) ---
  {
    id: 'F17',
    name: 'Dr. Anjali Das',
    department: 'Biotechnology & Biochemical Engg (BT)',
    deptCode: 'BT',
    specialization: 'Bioprocess Engineering & Bioinformatics Lab',
    maxDailyHours: 4,
    unavailableSlots: [],
    avatarColor: '#d946ef',
  },
];

export const CLASSROOMS = [
  {
    id: 'R1',
    name: 'Room 101 (CSE Block)',
    capacity: 50,
    type: 'LECTURE',
    building: 'CSE Block',
    features: ['Projector', 'Whiteboard'],
  },
  {
    id: 'R2',
    name: 'Computer Lab 1 (Software Lab)',
    capacity: 40,
    type: 'COMPUTER_LAB',
    building: 'Lab Block',
    features: ['40 PCs', 'High-Speed Internet'],
  },
  {
    id: 'R3',
    name: 'Main Auditorium (Central)',
    capacity: 120,
    type: 'LECTURE',
    building: 'Central Block',
    features: ['120 Seats', 'Smart Screen', 'Audio System'],
  },
  {
    id: 'R4',
    name: 'Room 102 (IT & AI Block)',
    capacity: 65,
    type: 'LECTURE',
    building: 'IT Block',
    features: ['65 Seats', 'Smart Board'],
  },
  {
    id: 'R5',
    name: 'Computer Lab 2 (AI & Web Lab)',
    capacity: 65,
    type: 'COMPUTER_LAB',
    building: 'Lab Block',
    features: ['65 GPU PCs', 'Full-Stack Setup'],
  },
  {
    id: 'R6',
    name: 'Room 201 (ECE Block)',
    capacity: 65,
    type: 'LECTURE',
    building: 'ECE Block',
    features: ['65 Seats', 'Projector'],
  },
  {
    id: 'R7',
    name: 'VLSI & Embedded Lab (ECE/EEE)',
    capacity: 65,
    type: 'COMPUTER_LAB',
    building: 'ECE/EEE Block',
    features: ['65 Embedded Kits & PCs', 'Oscilloscopes'],
  },
  {
    id: 'R8',
    name: 'Room 202 (EEE Block)',
    capacity: 60,
    type: 'LECTURE',
    building: 'EEE Block',
    features: ['60 Seats', 'Smart Podium'],
  },
  {
    id: 'R9',
    name: 'Room 301 (Mechanical Block)',
    capacity: 70,
    type: 'LECTURE',
    building: 'Mechanical Block',
    features: ['70 Seats', 'Drafting Boards'],
  },
  {
    id: 'R10',
    name: 'CAD/CAM & Simulation Lab (ME/CE)',
    capacity: 65,
    type: 'COMPUTER_LAB',
    building: 'Mech/Civil Lab Block',
    features: ['65 CAD Workstations', 'AutoCAD / SolidWorks'],
  },
  {
    id: 'R11',
    name: 'Room 302 (Civil & Biotech Block)',
    capacity: 65,
    type: 'LECTURE',
    building: 'Civil Block',
    features: ['65 Seats', 'Smart Projector'],
  },
  {
    id: 'R12',
    name: 'Central Seminar Hall',
    capacity: 90,
    type: 'LECTURE',
    building: 'Central Block',
    features: ['90 Seats', 'A/V Conferencing'],
  },
];

export const BATCHES = [
  {
    id: 'B1',
    name: 'CSE - S1 (1st Year)',
    size: 60,
    department: 'Computer Science & Engineering (CSE)',
    deptCode: 'CSE',
    semester: 1,
    color: '#3b82f6',
  },
  {
    id: 'B2',
    name: 'IT - S1 (1st Year)',
    size: 35,
    department: 'Information Technology (IT)',
    deptCode: 'IT',
    semester: 1,
    color: '#8b5cf6',
  },
  {
    id: 'B3',
    name: 'CSE - S3 (2nd Year)',
    size: 55,
    department: 'Computer Science & Engineering (CSE)',
    deptCode: 'CSE',
    semester: 3,
    color: '#14b8a6',
  },
  {
    id: 'B4',
    name: 'AI & DS - S5 (3rd Year)',
    size: 60,
    department: 'Artificial Intelligence & Data Science (AI & DS)',
    deptCode: 'AIDS',
    semester: 5,
    color: '#a855f7',
  },
  {
    id: 'B5',
    name: 'ECE - S3 (2nd Year)',
    size: 62,
    department: 'Electronics & Communication Engineering (ECE)',
    deptCode: 'ECE',
    semester: 3,
    color: '#f97316',
  },
  {
    id: 'B6',
    name: 'EEE - S5 (3rd Year)',
    size: 55,
    department: 'Electrical & Electronics Engineering (EEE)',
    deptCode: 'EEE',
    semester: 5,
    color: '#ef4444',
  },
  {
    id: 'B7',
    name: 'ME - S3 (2nd Year)',
    size: 65,
    department: 'Mechanical Engineering (ME)',
    deptCode: 'ME',
    semester: 3,
    color: '#0ea5e9',
  },
  {
    id: 'B8',
    name: 'CE - S5 (3rd Year)',
    size: 60,
    department: 'Civil Engineering (CE)',
    deptCode: 'CE',
    semester: 5,
    color: '#22c55e',
  },
  {
    id: 'B9',
    name: 'BT - S7 (4th Year)',
    size: 40,
    department: 'Biotechnology & Biochemical Engg (BT)',
    deptCode: 'BT',
    semester: 7,
    color: '#ec4899',
  },
];

export const COURSES = [
  // --- CSE ---
  {
    id: 'C1',
    code: 'CS101',
    title: 'Python Programming',
    department: 'Computer Science & Engineering (CSE)',
    deptCode: 'CSE',
    semester: 1,
    facultyId: 'F1',
    batchId: 'B1',
    secondaryBatchIds: [],
    requiredRoomType: 'LECTURE',
    weeklySessions: 2,
  },
  {
    id: 'C2',
    code: 'IT102L',
    title: 'Python Lab',
    department: 'Information Technology (IT)',
    deptCode: 'IT',
    semester: 1,
    facultyId: 'F1',
    batchId: 'B2',
    secondaryBatchIds: [],
    requiredRoomType: 'COMPUTER_LAB',
    weeklySessions: 1,
  },
  {
    id: 'C3',
    code: 'MA101',
    title: 'Engineering Maths',
    department: 'Mathematics & Basic Sciences (Common)',
    deptCode: 'MBS',
    semester: 1,
    facultyId: 'F2',
    batchId: 'B1',
    secondaryBatchIds: [],
    requiredRoomType: 'LECTURE',
    weeklySessions: 2,
  },
  {
    id: 'C4',
    code: 'IT201',
    title: 'Java Programming',
    department: 'Information Technology (IT)',
    deptCode: 'IT',
    semester: 1,
    facultyId: 'F3',
    batchId: 'B2',
    secondaryBatchIds: [],
    requiredRoomType: 'LECTURE',
    weeklySessions: 1,
  },
  {
    id: 'C5',
    code: 'CS202L',
    title: 'Web Development Lab',
    department: 'Computer Science & Engineering (CSE)',
    deptCode: 'CSE',
    semester: 3,
    facultyId: 'F3',
    batchId: 'B3',
    secondaryBatchIds: [],
    requiredRoomType: 'COMPUTER_LAB',
    weeklySessions: 1,
  },
  {
    id: 'C6',
    code: 'CS201',
    title: 'Database Management (DBMS)',
    department: 'Computer Science & Engineering (CSE)',
    deptCode: 'CSE',
    semester: 3,
    facultyId: 'F4',
    batchId: 'B3',
    secondaryBatchIds: [],
    requiredRoomType: 'LECTURE',
    weeklySessions: 2,
  },
  {
    id: 'C7',
    code: 'CS203',
    title: 'Computer Networks',
    department: 'Computer Science & Engineering (CSE)',
    deptCode: 'CSE',
    semester: 3,
    facultyId: 'F4',
    batchId: 'B3',
    secondaryBatchIds: [],
    requiredRoomType: 'LECTURE',
    weeklySessions: 1,
  },
  {
    id: 'C8',
    code: 'CS204',
    title: 'Data Structures & Algorithms',
    department: 'Computer Science & Engineering (CSE)',
    deptCode: 'CSE',
    semester: 3,
    facultyId: 'F1',
    batchId: 'B3',
    secondaryBatchIds: [],
    requiredRoomType: 'LECTURE',
    weeklySessions: 1,
  },
  {
    id: 'C9',
    code: 'CS205',
    title: 'Operating Systems',
    department: 'Computer Science & Engineering (CSE)',
    deptCode: 'CSE',
    semester: 3,
    facultyId: 'F5',
    batchId: 'B3',
    secondaryBatchIds: [],
    requiredRoomType: 'LECTURE',
    weeklySessions: 1,
  },
  // --- AI & DS ---
  {
    id: 'C10',
    code: 'AD301',
    title: 'Machine Learning Foundations',
    department: 'Artificial Intelligence & Data Science (AI & DS)',
    deptCode: 'AIDS',
    semester: 5,
    facultyId: 'F7',
    batchId: 'B4',
    secondaryBatchIds: [],
    requiredRoomType: 'LECTURE',
    weeklySessions: 2,
  },
  {
    id: 'C11',
    code: 'AD302L',
    title: 'Deep Learning & AI Lab',
    department: 'Artificial Intelligence & Data Science (AI & DS)',
    deptCode: 'AIDS',
    semester: 5,
    facultyId: 'F8',
    batchId: 'B4',
    secondaryBatchIds: [],
    requiredRoomType: 'COMPUTER_LAB',
    weeklySessions: 1,
  },
  // --- ECE ---
  {
    id: 'C12',
    code: 'EC201',
    title: 'Signals & VLSI Design',
    department: 'Electronics & Communication Engineering (ECE)',
    deptCode: 'ECE',
    semester: 3,
    facultyId: 'F9',
    batchId: 'B5',
    secondaryBatchIds: [],
    requiredRoomType: 'LECTURE',
    weeklySessions: 2,
  },
  {
    id: 'C13',
    code: 'EC202L',
    title: 'Embedded Systems Lab',
    department: 'Electronics & Communication Engineering (ECE)',
    deptCode: 'ECE',
    semester: 3,
    facultyId: 'F10',
    batchId: 'B5',
    secondaryBatchIds: [],
    requiredRoomType: 'COMPUTER_LAB',
    weeklySessions: 1,
  },
  // --- EEE ---
  {
    id: 'C14',
    code: 'EE301',
    title: 'Power Systems Engineering',
    department: 'Electrical & Electronics Engineering (EEE)',
    deptCode: 'EEE',
    semester: 5,
    facultyId: 'F11',
    batchId: 'B6',
    secondaryBatchIds: [],
    requiredRoomType: 'LECTURE',
    weeklySessions: 2,
  },
  {
    id: 'C15',
    code: 'EE302L',
    title: 'Control & Power Electronics Lab',
    department: 'Electrical & Electronics Engineering (EEE)',
    deptCode: 'EEE',
    semester: 5,
    facultyId: 'F12',
    batchId: 'B6',
    secondaryBatchIds: [],
    requiredRoomType: 'COMPUTER_LAB',
    weeklySessions: 1,
  },
  // --- Mechanical Engineering (ME) ---
  {
    id: 'C16',
    code: 'ME201',
    title: 'Engineering Thermodynamics',
    department: 'Mechanical Engineering (ME)',
    deptCode: 'ME',
    semester: 3,
    facultyId: 'F13',
    batchId: 'B7',
    secondaryBatchIds: [],
    requiredRoomType: 'LECTURE',
    weeklySessions: 2,
  },
  {
    id: 'C17',
    code: 'ME202L',
    title: 'CAD/CAM Simulation Lab',
    department: 'Mechanical Engineering (ME)',
    deptCode: 'ME',
    semester: 3,
    facultyId: 'F14',
    batchId: 'B7',
    secondaryBatchIds: [],
    requiredRoomType: 'COMPUTER_LAB',
    weeklySessions: 1,
  },
  // --- Civil Engineering (CE) ---
  {
    id: 'C18',
    code: 'CE301',
    title: 'Structural Analysis',
    department: 'Civil Engineering (CE)',
    deptCode: 'CE',
    semester: 5,
    facultyId: 'F15',
    batchId: 'B8',
    secondaryBatchIds: [],
    requiredRoomType: 'LECTURE',
    weeklySessions: 2,
  },
  {
    id: 'C19',
    code: 'CE302L',
    title: 'Civil Surveying & AutoCAD Lab',
    department: 'Civil Engineering (CE)',
    deptCode: 'CE',
    semester: 5,
    facultyId: 'F16',
    batchId: 'B8',
    secondaryBatchIds: [],
    requiredRoomType: 'COMPUTER_LAB',
    weeklySessions: 1,
  },
  // --- Biotechnology (BT) ---
  {
    id: 'C20',
    code: 'BT401L',
    title: 'Bioinformatics & Bioprocess Lab',
    department: 'Biotechnology & Biochemical Engg (BT)',
    deptCode: 'BT',
    semester: 7,
    facultyId: 'F17',
    batchId: 'B9',
    secondaryBatchIds: [],
    requiredRoomType: 'COMPUTER_LAB',
    weeklySessions: 1,
  },
  // --- Common Physics ---
  {
    id: 'C21',
    code: 'PH101',
    title: 'Engineering Physics',
    department: 'Mathematics & Basic Sciences (Common)',
    deptCode: 'MBS',
    semester: 3,
    facultyId: 'F18',
    batchId: 'B5',
    secondaryBatchIds: [],
    requiredRoomType: 'LECTURE',
    weeklySessions: 1,
  },
];

export const PRESET_SCHEDULES = {
  'whole-college-conflict': {
    name: '🏛️ Whole College Multi-Department Timetable (Cross-Dept Clashes)',
    description:
      'Complete college timetable across CSE, IT, AI & DS, ECE, EEE, ME, CE, and BT showing cross-department faculty clashes, shared room double-bookings, seat overflows, and lab mismatches.',
    sessions: [
      // --- MONDAY 09:00 AM: Cross-Department Collision (CSE, IT, ME) ---
      {
        id: 'S1',
        courseId: 'C1', // Python Programming (CSE - 1st Year, 60 students)
        facultyId: 'F1', // Prof. Rahul Sharma
        batchId: 'B1',
        roomId: 'R1', // Room 101 (Capacity 50 -> Too small for 60 + Double-booked!)
        day: 'Mon',
        slot: '09:00 - 10:00',
      },
      {
        id: 'S2',
        courseId: 'C2', // Python Lab (IT - 1st Year, 35 students)
        facultyId: 'F1', // Prof. Rahul Sharma -> Cross-dept Teacher Clash with CSE!
        batchId: 'B2',
        roomId: 'R2', // Computer Lab 1 (40 PCs)
        day: 'Mon',
        slot: '09:00 - 10:00',
      },
      {
        id: 'S3',
        courseId: 'C3', // Engineering Maths (CSE - 1st Year, 60 students)
        facultyId: 'F2', // Prof. Anita Verma
        batchId: 'B1', // CSE - 1st Year -> Student Batch Clash with S1!
        roomId: 'R1', // Room 101 -> Room Double-Booking with S1!
        day: 'Mon',
        slot: '09:00 - 10:00',
      },
      {
        id: 'S4',
        courseId: 'C16', // Engineering Thermodynamics (ME - 2nd Year, 65 students)
        facultyId: 'F13', // Dr. Manoj Kumar
        batchId: 'B7',
        roomId: 'R9', // Room 301 (Mechanical Block, 70 seats) - Clean
        day: 'Mon',
        slot: '09:00 - 10:00',
      },

      // --- MONDAY 10:00 AM: ECE & AI&DS ---
      {
        id: 'S5',
        courseId: 'C12', // Signals & VLSI Design (ECE - 2nd Year, 62 students)
        facultyId: 'F9', // Dr. Suresh Babu
        batchId: 'B5',
        roomId: 'R6', // Room 201 (ECE Block, 65 seats) - Clean
        day: 'Mon',
        slot: '10:00 - 11:00',
      },
      {
        id: 'S6',
        courseId: 'C10', // Machine Learning Foundations (AI & DS, 60 students)
        facultyId: 'F7', // Dr. Kavita Rao
        batchId: 'B4',
        roomId: 'R4', // Room 102 (IT & AI Block, 65 seats) - Clean
        day: 'Mon',
        slot: '10:00 - 11:00',
      },

      // --- TUESDAY 10:00 AM: Lab Facility Mismatches (CSE & ME) ---
      {
        id: 'S7',
        courseId: 'C5', // Web Development Lab (CSE - 2nd Year, 55 students, Needs COMPUTER_LAB)
        facultyId: 'F3', // Prof. Priya Nair
        batchId: 'B3',
        roomId: 'R1', // Room 101 (Regular Lecture Room, 50 seats) -> Wrong Room Type & Capacity!
        day: 'Tue',
        slot: '10:00 - 11:00',
      },
      {
        id: 'S8',
        courseId: 'C17', // CAD/CAM Simulation Lab (ME - 2nd Year, 65 students, Needs COMPUTER_LAB)
        facultyId: 'F14', // Prof. Harish Chandran
        batchId: 'B7',
        roomId: 'R9', // Room 301 (Regular Lecture Room) -> Needs CAD/CAM Lab!
        day: 'Tue',
        slot: '10:00 - 11:00',
      },

      // --- TUESDAY 11:00 AM: EEE & Civil Engineering ---
      {
        id: 'S9',
        courseId: 'C14', // Power Systems Engineering (EEE - 2nd Year, 55 students)
        facultyId: 'F11', // Dr. Rajesh Varma
        batchId: 'B6',
        roomId: 'R8', // Room 202 (EEE Block, 60 seats) - Clean
        day: 'Tue',
        slot: '11:00 - 12:00',
      },
      {
        id: 'S10',
        courseId: 'C18', // Structural Analysis (CE - 2nd Year, 60 students)
        facultyId: 'F15', // Dr. Thomas Mathew
        batchId: 'B8',
        roomId: 'R11', // Room 302 (Civil Block, 65 seats) - Clean
        day: 'Tue',
        slot: '11:00 - 12:00',
      },

      // --- WEDNESDAY 09:00 AM & 10:00 AM: CSE, IT, ECE, BT ---
      {
        id: 'S11',
        courseId: 'C6', // DBMS (CSE - 2nd Year, 55 students)
        facultyId: 'F4', // Prof. Vikram Patel
        batchId: 'B3',
        roomId: 'R4', // Room 102 (65 seats)
        day: 'Wed',
        slot: '09:00 - 10:00',
      },
      {
        id: 'S12',
        courseId: 'C13', // Embedded Systems Lab (ECE - 2nd Year, 62 students)
        facultyId: 'F10', // Prof. Lakshmi Pillai
        batchId: 'B5',
        roomId: 'R7', // VLSI & Embedded Lab (65 seats)
        day: 'Wed',
        slot: '09:00 - 10:00',
      },
      {
        id: 'S13',
        courseId: 'C4', // Java Programming (IT - 1st Year, 35 students)
        facultyId: 'F3', // Prof. Priya Nair
        batchId: 'B2',
        roomId: 'R1', // Room 101 (50 seats)
        day: 'Wed',
        slot: '10:00 - 11:00',
      },
      {
        id: 'S14',
        courseId: 'C20', // Bioinformatics & Bioprocess Lab (BT - 2nd Year, 40 students)
        facultyId: 'F17', // Dr. Anjali Das
        batchId: 'B9',
        roomId: 'R2', // Computer Lab 1 (40 PCs)
        day: 'Wed',
        slot: '10:00 - 11:00',
      },

      // --- THURSDAY: AI&DS, EEE, Civil, CSE ---
      {
        id: 'S15',
        courseId: 'C11', // Deep Learning & AI Lab (AI & DS, 60 students)
        facultyId: 'F8', // Prof. Siddharth Iyer
        batchId: 'B4',
        roomId: 'R5', // Computer Lab 2 (65 PCs)
        day: 'Thu',
        slot: '09:00 - 10:00',
      },
      {
        id: 'S16',
        courseId: 'C15', // Control & Power Electronics Lab (EEE, 55 students)
        facultyId: 'F12', // Prof. Divya Nambiar
        batchId: 'B6',
        roomId: 'R7', // VLSI & Embedded Lab (65 seats)
        day: 'Thu',
        slot: '10:00 - 11:00',
      },
      {
        id: 'S17',
        courseId: 'C8', // Data Structures & Algorithms (CSE - 2nd Year, 55 students)
        facultyId: 'F1', // Prof. Rahul Sharma
        batchId: 'B3',
        roomId: 'R4', // Room 102 (65 seats)
        day: 'Thu',
        slot: '11:00 - 12:00',
      },

      // --- FRIDAY: Civil Lab, Common Physics, CSE ---
      {
        id: 'S18',
        courseId: 'C19', // Civil Surveying & AutoCAD Lab (CE - 2nd Year, 60 students)
        facultyId: 'F16', // Prof. Sneha Kurian
        batchId: 'B8',
        roomId: 'R10', // CAD/CAM & Simulation Lab (65 Workstations)
        day: 'Fri',
        slot: '09:00 - 10:00',
      },
      {
        id: 'S19',
        courseId: 'C21', // Engineering Physics (ECE - 2nd Year, 62 students)
        facultyId: 'F18', // Dr. Gopalakrishnan S.
        batchId: 'B5',
        roomId: 'R3', // Main Auditorium (120 seats)
        day: 'Fri',
        slot: '10:00 - 11:00',
      },
      {
        id: 'S20',
        courseId: 'C9', // Operating Systems (CSE - 2nd Year, 55 students)
        facultyId: 'F5', // Dr. Meera Krishnan
        batchId: 'B3',
        roomId: 'R12', // Central Seminar Hall (90 seats)
        day: 'Fri',
        slot: '11:00 - 12:00',
      },
    ],
  },

  'simple-example': {
    name: '1️⃣ Quick Demo: Monday 9 AM Clash (3 Classes)',
    description:
      'Simple 3-class example at Monday 9:00 AM showing Teacher double-booking (Prof. Rahul Sharma), Classroom double-booking & over-capacity (Room 101), and Student Batch overlap (CSE - 1st Year).',
    sessions: [
      {
        id: 'S1',
        courseId: 'C1',
        facultyId: 'F1',
        batchId: 'B1',
        roomId: 'R1',
        day: 'Mon',
        slot: '09:00 - 10:00',
      },
      {
        id: 'S2',
        courseId: 'C2',
        facultyId: 'F1',
        batchId: 'B2',
        roomId: 'R2',
        day: 'Mon',
        slot: '09:00 - 10:00',
      },
      {
        id: 'S3',
        courseId: 'C3',
        facultyId: 'F2',
        batchId: 'B1',
        roomId: 'R1',
        day: 'Mon',
        slot: '09:00 - 10:00',
      },
    ],
  },

  'default-conflict': {
    name: '2️⃣ CSE & IT Department Schedule (With Clashes)',
    description:
      'Includes the Monday 9:00 AM collision plus a Tuesday Web Development Lab scheduled in a regular lecture room instead of a Computer Lab.',
    sessions: [
      {
        id: 'S1',
        courseId: 'C1',
        facultyId: 'F1',
        batchId: 'B1',
        roomId: 'R1',
        day: 'Mon',
        slot: '09:00 - 10:00',
      },
      {
        id: 'S2',
        courseId: 'C2',
        facultyId: 'F1',
        batchId: 'B2',
        roomId: 'R2',
        day: 'Mon',
        slot: '09:00 - 10:00',
      },
      {
        id: 'S3',
        courseId: 'C3',
        facultyId: 'F2',
        batchId: 'B1',
        roomId: 'R1',
        day: 'Mon',
        slot: '09:00 - 10:00',
      },
      {
        id: 'S4',
        courseId: 'C5',
        facultyId: 'F3',
        batchId: 'B3',
        roomId: 'R1',
        day: 'Tue',
        slot: '10:00 - 11:00',
      },
      {
        id: 'S5',
        courseId: 'C6',
        facultyId: 'F4',
        batchId: 'B3',
        roomId: 'R4',
        day: 'Tue',
        slot: '09:00 - 10:00',
      },
      {
        id: 'S6',
        courseId: 'C4',
        facultyId: 'F3',
        batchId: 'B2',
        roomId: 'R1',
        day: 'Wed',
        slot: '10:00 - 11:00',
      },
      {
        id: 'S7',
        courseId: 'C7',
        facultyId: 'F4',
        batchId: 'B3',
        roomId: 'R4',
        day: 'Wed',
        slot: '11:00 - 12:00',
      },
      {
        id: 'S8',
        courseId: 'C8',
        facultyId: 'F1',
        batchId: 'B3',
        roomId: 'R4',
        day: 'Thu',
        slot: '10:00 - 11:00',
      },
      {
        id: 'S9',
        courseId: 'C3',
        facultyId: 'F2',
        batchId: 'B1',
        roomId: 'R3',
        day: 'Fri',
        slot: '09:00 - 10:00',
      },
    ],
  },

  'clean-optimized': {
    name: '3️⃣ Whole College Conflict-Free Schedule (100% Optimal)',
    description:
      'All 8 Departments, 18 Faculty Members, 12 Classrooms/Labs, and 9 Student Batches scheduled with zero conflicts.',
    sessions: [
      {
        id: 'S1',
        courseId: 'C1',
        facultyId: 'F1',
        batchId: 'B1',
        roomId: 'R3',
        day: 'Mon',
        slot: '09:00 - 10:00',
      },
      {
        id: 'S2',
        courseId: 'C2',
        facultyId: 'F1',
        batchId: 'B2',
        roomId: 'R2',
        day: 'Tue',
        slot: '09:00 - 10:00',
      },
      {
        id: 'S3',
        courseId: 'C3',
        facultyId: 'F2',
        batchId: 'B1',
        roomId: 'R3',
        day: 'Mon',
        slot: '10:00 - 11:00',
      },
      {
        id: 'S4',
        courseId: 'C16',
        facultyId: 'F13',
        batchId: 'B7',
        roomId: 'R9',
        day: 'Mon',
        slot: '09:00 - 10:00',
      },
      {
        id: 'S5',
        courseId: 'C12',
        facultyId: 'F9',
        batchId: 'B5',
        roomId: 'R6',
        day: 'Mon',
        slot: '10:00 - 11:00',
      },
      {
        id: 'S6',
        courseId: 'C10',
        facultyId: 'F7',
        batchId: 'B4',
        roomId: 'R4',
        day: 'Mon',
        slot: '10:00 - 11:00',
      },
      {
        id: 'S7',
        courseId: 'C5',
        facultyId: 'F3',
        batchId: 'B3',
        roomId: 'R5',
        day: 'Tue',
        slot: '10:00 - 11:00',
      },
      {
        id: 'S8',
        courseId: 'C17',
        facultyId: 'F14',
        batchId: 'B7',
        roomId: 'R10',
        day: 'Tue',
        slot: '10:00 - 11:00',
      },
      {
        id: 'S9',
        courseId: 'C14',
        facultyId: 'F11',
        batchId: 'B6',
        roomId: 'R8',
        day: 'Tue',
        slot: '11:00 - 12:00',
      },
      {
        id: 'S10',
        courseId: 'C18',
        facultyId: 'F15',
        batchId: 'B8',
        roomId: 'R11',
        day: 'Tue',
        slot: '11:00 - 12:00',
      },
      {
        id: 'S11',
        courseId: 'C6',
        facultyId: 'F4',
        batchId: 'B3',
        roomId: 'R4',
        day: 'Wed',
        slot: '09:00 - 10:00',
      },
      {
        id: 'S12',
        courseId: 'C13',
        facultyId: 'F10',
        batchId: 'B5',
        roomId: 'R7',
        day: 'Wed',
        slot: '09:00 - 10:00',
      },
      {
        id: 'S13',
        courseId: 'C4',
        facultyId: 'F3',
        batchId: 'B2',
        roomId: 'R1',
        day: 'Wed',
        slot: '10:00 - 11:00',
      },
      {
        id: 'S14',
        courseId: 'C20',
        facultyId: 'F17',
        batchId: 'B9',
        roomId: 'R2',
        day: 'Wed',
        slot: '10:00 - 11:00',
      },
      {
        id: 'S15',
        courseId: 'C11',
        facultyId: 'F8',
        batchId: 'B4',
        roomId: 'R5',
        day: 'Thu',
        slot: '09:00 - 10:00',
      },
      {
        id: 'S16',
        courseId: 'C15',
        facultyId: 'F12',
        batchId: 'B6',
        roomId: 'R7',
        day: 'Thu',
        slot: '10:00 - 11:00',
      },
      {
        id: 'S17',
        courseId: 'C8',
        facultyId: 'F1',
        batchId: 'B3',
        roomId: 'R4',
        day: 'Thu',
        slot: '11:00 - 12:00',
      },
      {
        id: 'S18',
        courseId: 'C19',
        facultyId: 'F16',
        batchId: 'B8',
        roomId: 'R10',
        day: 'Fri',
        slot: '09:00 - 10:00',
      },
      {
        id: 'S19',
        courseId: 'C21',
        facultyId: 'F18',
        batchId: 'B5',
        roomId: 'R3',
        day: 'Fri',
        slot: '10:00 - 11:00',
      },
      {
        id: 'S20',
        courseId: 'C9',
        facultyId: 'F5',
        batchId: 'B3',
        roomId: 'R12',
        day: 'Fri',
        slot: '11:00 - 12:00',
      },
    ],
  },

  'tc-faculty-clash': {
    name: '🧪 Test Case 1: Cross-Department Faculty Double-Booking',
    description:
      'Prof. Rahul Sharma is assigned to teach CSE (S1) Python Programming and IT (S1) Python Lab at the exact same time (Monday 09:00 - 10:00).',
    sessions: [
      {
        id: 'TC1_S1',
        courseId: 'C1', // Python Programming (CSE S1)
        facultyId: 'F1', // Prof. Rahul Sharma
        batchId: 'B1',
        roomId: 'R4', // Room 102 (65 seats)
        day: 'Mon',
        slot: '09:00 - 10:00',
      },
      {
        id: 'TC1_S2',
        courseId: 'C2', // Python Lab (IT S1)
        facultyId: 'F1', // Prof. Rahul Sharma -> Faculty Clash!
        batchId: 'B2',
        roomId: 'R2', // Computer Lab 1 (40 PCs)
        day: 'Mon',
        slot: '09:00 - 10:00',
      },
      {
        id: 'TC1_S3',
        courseId: 'C8', // Data Structures & Algorithms (CSE S3)
        facultyId: 'F1', // Prof. Rahul Sharma -> 3rd simultaneous class!
        batchId: 'B3',
        roomId: 'R3', // Main Auditorium (120 seats)
        day: 'Mon',
        slot: '09:00 - 10:00',
      },
    ],
  },

  'tc-room-capacity': {
    name: '🧪 Test Case 2: Room Double-Booking & Seat Capacity Overflow',
    description:
      'Two 60-student batches (CSE S1 & AI&DS S5) are both booked into Room 101 (50 seats) on Tuesday 09:00 - 10:00, plus a 65-student ME batch in a 50-seat room.',
    sessions: [
      {
        id: 'TC2_S1',
        courseId: 'C3', // Engineering Maths (CSE S1 - 60 students)
        facultyId: 'F2',
        batchId: 'B1', // 60 students
        roomId: 'R1', // Room 101 (50 seats -> Too small + Double-booked!)
        day: 'Tue',
        slot: '09:00 - 10:00',
      },
      {
        id: 'TC2_S2',
        courseId: 'C10', // Machine Learning Foundations (AI&DS S5 - 60 students)
        facultyId: 'F7',
        batchId: 'B4', // 60 students
        roomId: 'R1', // Room 101 (50 seats -> Too small + Double-booked!)
        day: 'Tue',
        slot: '09:00 - 10:00',
      },
      {
        id: 'TC2_S3',
        courseId: 'C16', // Engineering Thermodynamics (ME S3 - 65 students)
        facultyId: 'F13',
        batchId: 'B7', // 65 students
        roomId: 'R8', // Room 202 (60 seats -> Capacity overflow for 65 students!)
        day: 'Tue',
        slot: '10:00 - 11:00',
      },
    ],
  },

  'tc-lab-mismatch': {
    name: '🧪 Test Case 3: Engineering & Computer Lab Facility Mismatch',
    description:
      'Three practical Lab courses across CSE, Mechanical (ME), and Electronics (ECE) are scheduled inside regular Lecture Halls instead of specialized Computer/CAD/VLSI Labs.',
    sessions: [
      {
        id: 'TC3_S1',
        courseId: 'C5', // Web Development Lab (CSE S3 - Needs COMPUTER_LAB)
        facultyId: 'F3',
        batchId: 'B3',
        roomId: 'R4', // Room 102 (LECTURE Hall -> Facility Mismatch!)
        day: 'Wed',
        slot: '09:00 - 10:00',
      },
      {
        id: 'TC3_S2',
        courseId: 'C17', // CAD/CAM Simulation Lab (ME S3 - Needs COMPUTER_LAB)
        facultyId: 'F14',
        batchId: 'B7',
        roomId: 'R9', // Room 301 (LECTURE Hall -> Facility Mismatch!)
        day: 'Wed',
        slot: '10:00 - 11:00',
      },
      {
        id: 'TC3_S3',
        courseId: 'C13', // Embedded Systems Lab (ECE S3 - Needs COMPUTER_LAB)
        facultyId: 'F10',
        batchId: 'B5',
        roomId: 'R6', // Room 201 (LECTURE Hall -> Facility Mismatch!)
        day: 'Wed',
        slot: '11:00 - 12:00',
      },
    ],
  },

  'tc-batch-clash': {
    name: '🧪 Test Case 4: Student Cohort Simultaneous Class Clash',
    description:
      'The CSE - S3 (2nd Year) student batch is scheduled to attend three different subjects (DBMS, Operating Systems, and Data Structures) at the exact same slot (Thursday 09:00 - 10:00).',
    sessions: [
      {
        id: 'TC4_S1',
        courseId: 'C6', // DBMS (CSE S3)
        facultyId: 'F4',
        batchId: 'B3', // CSE - S3 (2nd Year)
        roomId: 'R4',
        day: 'Thu',
        slot: '09:00 - 10:00',
      },
      {
        id: 'TC4_S2',
        courseId: 'C9', // Operating Systems (CSE S3)
        facultyId: 'F5',
        batchId: 'B3', // CSE - S3 (2nd Year) -> Batch Clash!
        roomId: 'R12',
        day: 'Thu',
        slot: '09:00 - 10:00',
      },
      {
        id: 'TC4_S3',
        courseId: 'C8', // Data Structures & Algorithms (CSE S3)
        facultyId: 'F1',
        batchId: 'B3', // CSE - S3 (2nd Year) -> Batch Clash!
        roomId: 'R3',
        day: 'Thu',
        slot: '09:00 - 10:00',
      },
    ],
  },
};

