import { getKeyByValue } from "./getObjectKey";

export let status = {
  All: -3, //No such level in the database. It was added for the algorithm to work
  Rejected: -2,
  Deffered: -1,
  Pending: 0,
  Stage_1: 1,
  Stage_2: 2,
  Approved: 3,
  Both: 0 || 1,
};

export const addSerialNumber = (applications, approved) => {
  let application_with_serials = [];
  let num = 0;
  applications?.forEach((application) => {
    if (approved === status.All) {
      num = num + 1;
      getData(application_with_serials, application, num);
    } else if (application.approved === approved) {
      num = num + 1;
      getData(application_with_serials, application, num);
    }
    // else if (application.approved === approved) {
    //   num = num + 1;
    //   getData(application_with_serials, application, num);
    // }
  });

  return application_with_serials;
};

const getData = (application_with_serials, application, num) =>
  application_with_serials.push({
    ...application,
    approved: getKeyByValue(status, application.approved),
    approval_letter: "Download Letter",
    s_no: num,
  });
