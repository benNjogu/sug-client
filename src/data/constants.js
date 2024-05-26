export const constants = {
  //application categories
  TYPE: "TYPE & NUMBER OF STUDENTS",
  NOMIEE_DETAILS: "NOMINEES DETAILS",
  COURSE_DETAILS: "COURSE DETAILS",
  OVERSEAS: "REGIONAL /OVERSEAS REQUIREMENTS",
  EXPENSES: "TRAINING EXPENSES",
  DECLARATION: "DECLARATION",

  //BTN
  NEW_APPLICATION: "NEW APPLICATION",
  ADD_NEW: "ADD NEW",
  GENERATE_REPORT: "GENERATE REPORT",
  VIEW_REPORT: "VIEW REPORT",

  //TYPE OF TRAINING
  LOCAL: "Local",
  STATUTORY: "Statutory",
  OVER_SEAS: "Overseas",
  DISTANCE: "Distance learning",

  //STATUTORY TRAINING
  SELECT_COURSE: "Select Course",
  FIRST_AID: "First Aid",
  OSHA: "Occupational health & safety",
  FIRE_SAFETY: "Fire Safety",

  //NUMBER OF PARTICIPANTS
  ONE: "One",
  GROUP: "Group",

  //GROUPS CAPACITY
  LOCAL_OVERSEAS_DISTANCE: { minCapacity: 8, maxCapacity: 25 },
  STATUTORY_CAP: { minCapacity: 3, maxCapacity: 14 },
  SINGLE_NOMINEE_CAP: { minCapacity: 1, maxCapacity: 1 },

  //LABEL FOR SINGLE USER CELL
  SINGLE_NOMINEE_LABEL: "Nominee",
  FIRST_GROUP_LABEL: "Group 1",
  FIRST_GROUP_ID: 1,

  //CREATE ADMIN SELECTOR
  SELECT: "All Levels",
  LEVEL_1: "ADMIN I",
  LEVEL_2: "ADMIN II",
  LEVEL_3: "ADMIN III",
  LEVEL_4: "SUPER ADMIN",

  //NOMINEE LEVELS
  TOP: "Top management",
  MIDDLE: "Middle level management",
  SUPERVISORY: "Supervisory",
  OPERATIVE: "Operatives",
  OTHER: "Others",

  // Approval levels
  PENDING: "Pending",
  STAGE_1: "Stage_1",
  STAGE_2: "Stage_2",
  APPROVED: "Approved",
  DEFFERED: "Deffered",
  REJECTED: "Rejected",
  ADD_NOMINEE: "Add",
  EDIT_NOMINEE: "Edit",
};

/**
 * Our spinner has the following durations
 * 300 - back nav
 * 700 - to nav
 * 2000 - login and others like it (should be changed later. let it be determined by the server)
 */
