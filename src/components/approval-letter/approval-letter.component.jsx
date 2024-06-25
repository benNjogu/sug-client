import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { Button, Table } from "antd";
import moment from "moment";

import {
  GetApplicationGroupDates,
  GetApplicationNominees,
} from "../../redux/slices/application";
import { FetchAllRegisteredUsers } from "../../redux/slices/nominee";
import logo from "../../assets/images/logo.png";
import Spinner from "../spinner";
import "./approval-letter.styles.css";
import { addSerialNumber, status } from "../../utils/addSerialNumber";

const ApprovalLetter = ({ letter_data }) => {
  const dispatch = useDispatch();
  const componentRef = useRef();
  console.log("first ld ", letter_data);

  const { applicationDates } = useSelector((state) => state.application);
  console.log("appld", applicationDates);
  const { applicationNominees } = useSelector((state) => state.application);
  let { nominees } = useSelector((state) => state.nominee);
  const { account_type } = useSelector((state) => state.auth).user_data;

  const columns = [
    {
      title: "Group",
      dataIndex: "group_id",
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      render(text, record) {
        return {
          children: <div>{`${moment(text).format("Do MM, YYYY")}`}</div>,
        };
      },
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      render(text, record) {
        return {
          children: <div>{`${moment(text).format("Do MM, YYYY")}`}</div>,
        };
      },
    },
  ];

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  //filtering nominees based on fetched ids
  const getFilteredNominees = () => {
    let filteredNominees = [];
    for (let i = 0; i < applicationNominees.length; i++) {
      for (let j = 0; j < nominees.length; j++) {
        if (applicationNominees[i].nominee_id === nominees[j].id) {
          // Add group id to each nominee
          let group_id = applicationNominees[i].group_id;
          // Add each nominee belonging to this application to a new array
          filteredNominees.push({ ...nominees[j], group_id });
        } else continue;
      }
    }

    return filteredNominees;
  };

  const splitRecommendation = () => {
    let recommendation = letter_data.recommendation.split(",");
    let arranged_recommendation_data = {};
    for (let i = 0; i < recommendation.length; i++) {
      if (recommendation[i].includes("house")) {
        arranged_recommendation_data.house = recommendation[i];
      } else if (recommendation[i].includes("residential")) {
        arranged_recommendation_data.residential = recommendation[i];
      } else if (recommendation[i].includes("employers")) {
        arranged_recommendation_data.employers = recommendation[i];
      }
    }

    return arranged_recommendation_data;
  };

  const getNameInitials = (name) => {
    let data = name?.split(" ");

    return (
      data[0]?.charAt(0)?.toUpperCase() + "" + data[1]?.charAt(0)?.toUpperCase()
    );
  };

  useEffect(() => {
    dispatch(GetApplicationGroupDates(letter_data.application_id));
    if (nominees.length === 0) {
      dispatch(FetchAllRegisteredUsers(letter_data.organization_id));
    }
    // get nominees for this application
    dispatch(GetApplicationNominees(letter_data.application_id));
  }, []);

  if (applicationDates.length === 0) {
    return <Spinner loading={true} />;
  }

  return (
    <div className="letter-container">
      <style type="text/css" media="print">
        {" @page { size: portrait; margin: 40px 64px 64px 64px !important;  } "}
      </style>
      <div className="letter-model" ref={componentRef}>
        <div className="head">
          <div className="div-logo mb-3">
            <img src={logo} className="logo" alt="Logo" />
          </div>
          <div className="d-flex justify-content-between pb-2">
            <div>
              <p className="address-text">Commercial Street, Industrial Area</p>
              <p className="address-text">P.O. Box 74494-00200</p>
              <p className="font-weight-bold medium-text">NAIROBI</p>
            </div>
            <div>
              <p className="text-right address-text">
                Tel: 020695586/9, 072917897, 0736290676
              </p>
              <p className="text-right address-text">
                Email:{" "}
                <a
                  href="mailto:directorgeneral@nita.go.ke"
                  target="_blank"
                  className="p-text"
                >
                  directorgeneral@nita.go.ke
                </a>
              </p>
              <p className="text-right address-text">
                Website:{" "}
                <a
                  href="http://www.nita.go.ke"
                  target="_blank"
                  className="p-text"
                >
                  http://www.nita.go.ke
                </a>
              </p>
            </div>
          </div>
          <div className="font-italic my-3">When replying please quote:</div>
          <div className="d-flex justify-content-between pb-2">
            <div>
              {account_type === process.env.REACT_APP_AccountType0 ? (
                <h4 className="font-weight-bold">{`${letter_data?.levy_no}`}</h4>
              ) : (
                <h4 className="font-weight-bold">{`${letter_data?.levy_no}/OR.${letter_data.organization_id}/[A${letter_data.application_id}]`}</h4>
              )}
            </div>
            <div>
              <h4 className="font-weight-bold">{`${moment(
                letter_data?.date_2
              ).format("Do MMMM, YYYY")}`}</h4>
            </div>
          </div>
        </div>
        <div className="address">
          <div className="d-flex justify-content-between pb-2">
            <div>
              <p className="address-text">The Human Resource Manager</p>
              <p className="address-text">{`${letter_data.org_name}`}</p>
              <p className="address-text">{`P.O. Box ${letter_data.box}`}</p>
              <p className="font-weight-bold medium-text">{`${letter_data.town.toUpperCase()}`}</p>
            </div>
          </div>
        </div>
        <div className="reference my-3">
          <h5 className="font-weight-bold">
            {applicationDates?.length === 1
              ? `RE: TRAINING ON ${letter_data.course_title.toUpperCase()} BY ${letter_data.training_provider.toUpperCase()} FROM
             ${moment(applicationDates[0]?.start_date?.split("T")[0])
               .format("Do MMMM, YYYY")
               .toUpperCase()}
             TO ${moment(applicationDates[0]?.end_date?.split("T")[0])
               .format("Do MMMM, YYYY")
               .toUpperCase()} .`
              : `RE: TRAINING ON ${letter_data.course_title.toUpperCase()} BY ${letter_data.training_provider.toUpperCase()} FROM
             ${moment(applicationDates[0]?.start_date?.split("T")[0])
               .format("Do MMMM, YYYY")
               .toUpperCase()}
             TO ${moment(
               applicationDates[applicationDates?.length - 1]?.end_date?.split(
                 "T"
               )[0]
             )
               .format("Do MMMM, YYYY")
               .toUpperCase()}.`}
          </h5>
        </div>
        {applicationDates.length > 1 && (
          <Table
            columns={columns}
            dataSource={addSerialNumber(applicationDates, status?.All)}
            pagination={false}
            className="my-4"
          />
        )}
        <div className="letter-body">
          <div className="d-flex justify-content-between pb-2">
            <div>
              {applicationDates.length === 1 ? (
                <p className="date-applied medium-text">
                  We acknowledge receipt of your training application on
                  {` ${moment(letter_data.date_applied).format(
                    "Do MMMM, YYYY"
                  )} `}{" "}
                  on the above subject nominating
                  <b>{` ${getFilteredNominees()[0]?.first_name} ${
                    getFilteredNominees()[0]?.last_name
                  } `}</b>
                  to attend the course.
                </p>
              ) : (
                <p className="date-applied medium-text">
                  We acknowledge receipt of your training application on
                  {` ${moment(letter_data.date_applied).format(
                    "Do MMMM, YYYY"
                  )} `}{" "}
                  on the above subject nominating
                  <b>{` ${getFilteredNominees()?.length} nominees `}</b>
                  to attend the course.
                </p>
              )}
              <p className="recommendation mt-2 medium-text">
                Approval was granted for{" "}
                <b>
                  the nominee
                  {`${applicationDates.length === 1 ? "" : "s"}`}
                </b>{" "}
                to attend the course as{" "}
                <b>
                  {`${splitRecommendation().house}, ${
                    splitRecommendation().residential
                  } training, ${splitRecommendation().employers}`}
                  .(
                </b>{" "}
                {`${letter_data.course_venue}`} <b>).</b>
              </p>
            </div>
          </div>
        </div>
        <div className="font-italic my-3">
          <p>
            Any changes to the course approval particulars should be comunicated
            to NITA through the email address{" "}
            <a
              href="mailto:training@nita.go.ke"
              target="_blank"
              className="p-text"
            >
              training@nita.go.ke
            </a>{" "}
            accompanied by adequate justification to warrant the change.
          </p>
        </div>
        <div className="my-3  medium-text">
          <p>Thank you for participating in Industrial training.</p>
        </div>
        <div className="sign-off">
          <div className="d-flex justify-content-between pb-2">
            <div>
              <p className="font-weight-bold medium-text">{`${letter_data?.approver2_name}`}</p>
              <img
                src={`${process.env.REACT_APP_PDF_PATH?.toString()}/manager-signature/${
                  letter_data?.level_2
                }.png`}
                className="signature"
                alt="signature"
              />

              <p className="font-weight-bold medium-text">
                <u>For: DIRECTOR GENERAL</u>
              </p>
              <p className="address-text">
                {`${getNameInitials(letter_data?.approver1_name)}`}/
                {`${getNameInitials(letter_data?.approver2_name)}`}
              </p>
            </div>
          </div>
        </div>
        <div className="font-italic my-3">
          <p className="disclaimer">
            NOTE: This approval is granted on the basis of information availed
            to the Authority as at the approval date mentioned above. The
            Authority reserves the right to revoke the approval if new evidence
            materially alters the compliance status of the recipient.
          </p>
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <Button type="primary" onClick={handlePrint}>
          Print Letter
        </Button>
      </div>
    </div>
  );
};

export default ApprovalLetter;
