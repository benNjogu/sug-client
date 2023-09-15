import { constants } from './constants';

const user_categories = [
  { category_id: 1, description: constants.APPLICATIONS },
  { category_id: 2, description: constants.APPROVED },
  { category_id: 3, description: constants.PENDING },
  { category_id: 4, description: constants.REJECTED },
  { category_id: 5, description: constants.NOMINEES },
  { category_id: 6, description: constants.LOGOUT },
];
const admin_categories = [
  { category_id: 1, description: constants.APPLICATIONS },
  { category_id: 2, description: constants.PENDING },
  { category_id: 3, description: constants.APPROVED },
  { category_id: 4, description: constants.REJECTED },
  { category_id: 5, description: constants.ESCALATED },
];
const super_admin_categories = [
  { category_id: 1, description: constants.USERS },
  { category_id: 2, description: constants.ADMINS },
  { category_id: 3, description: constants.APPLICATIONS },
  { category_id: 4, description: constants.APPROVED },
  { category_id: 5, description: constants.PENDING },
  { category_id: 6, description: constants.REJECTED },
  { category_id: 7, description: constants.ESCALATED },
  { category_id: 8, description: constants.NOMINEES },
];

const application_categories = [
  { category_id: 1, description: constants.TYPE },
  { category_id: 2, description: constants.NOMIEE_DETAILS },
  { category_id: 3, description: constants.COURSE_DETAILS },
  { category_id: 4, description: constants.OVERSEAS },
  { category_id: 5, description: constants.EXPENSES },
  { category_id: 6, description: constants.DECLARATION },
];

export {
  user_categories,
  admin_categories,
  super_admin_categories,
  application_categories,
};
