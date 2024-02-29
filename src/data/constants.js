export const constants = {
  // USERS: 'USERS',
  // ADMINS: 'ADMINS',
  // REGISTERED: 'REGISTERED',
  // APPLICATIONS: 'APPLICATIONS',
  // APPROVED: 'APPROVED',
  // PENDING: 'PENDING',
  // REJECTED: 'REJECTED',
  // NOMINEES: 'NOMINEES',
  // ESCALATED: 'ESCALATED',
  // LOGOUT: 'LOGOUT',

  //application categories
  TYPE: 'TYPE & NUMBER OF STUDENTS',
  NOMIEE_DETAILS: 'NOMINEES DETAILS',
  COURSE_DETAILS: 'COURSE DETAILS',
  OVERSEAS: 'REGIONAL /OVERSEAS REQUIREMENTS',
  EXPENSES: 'TRAINING EXPENSES',
  DECLARATION: 'DECLARATION',

  //BTN
  NEW_APPLICATION: 'NEW APPLICATION',
  ADD_NEW: 'ADD NEW',

  //TYPE OF TRAINING
  LOCAL: 'Local',
  STATUTORY: 'Statutory',
  OVER_SEAS: 'Overseas',
  DISTANCE: 'Distance learning',

  //NUMBER OF PARTICIPANTS
  ONE: 'One',
  GROUP: 'Group',

  //GROUPS CAPACITY
  LOCAL_OVERSEAS_DISTANCE: { minCapacity: 8, maxCapacity: 25 },
  STATUTORY_CAP: { minCapacity: 3, maxCapacity: 14 },
  SINGLE_NOMINEE_CAP: { minCapacity: 1, maxCapacity: 1 },

  //LABEL FOR SINGLE USER CELL
  SINGLE_NOMINEE_LABEL: 'Nominee',
  FIRST_GROUP_LABEL: 'Group 1',
  FIRST_GROUP_ID: 1,

  //CREATE ADMIN SELECTOR
  SELECT: 'Select Level',
  LEVEL_1: 'ADMIN I',
  LEVEL_2: 'ADMIN II',
  LEVEL_3: 'SUPER ADMIN',

  // Approval levels
  PENDING: 'Pending',
  STAGE_1: 'Stage_1',
  APPROVED: 'Approved',
  DEFFERED: 'Deffered',
  REJECTED: 'Rejected',
};


/**
 * Our spinner has the following durations
 * 300 - back nav
 * 700 - to nav
 * 2000 - login and others like it (should be changed later. let it be determined by the server)
 */