import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { Button } from "antd";
import moment from "moment";

import {
  GetApplicationGroupDates,
  GetApplicationNominees,
} from "../../redux/slices/application";
import logo from "../../assets/images/logo.png";
import stamp from "../../assets/images/ibta-stamp.png";
import "./approval-letter.styles.css";
import Spinner from "../spinner";

const ApprovalLetter = ({ letter_data }) => {
  const dispatch = useDispatch();
  const componentRef = useRef();

  const { applicationDates } = useSelector((state) => state.application);
  const { applicationNominees } = useSelector((state) => state.application);
  let { nominees } = useSelector((state) => state.nominee);
  console.log("aadd", applicationDates);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  console.log("ld", letter_data);

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
      } else {
        arranged_recommendation_data.quote = recommendation[i];
      }
    }

    return arranged_recommendation_data;
  };

  const getNameInitials = () => {
    let data = letter_data.approver_name.split(" ");

    return (
      data[0].charAt(0).toUpperCase() + "" + data[1].charAt(0).toUpperCase()
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
                <a href="mailto:directorgeneral@nita.go.ke" className="p-text">
                  directorgeneral@nita.go.ke
                </a>
              </p>
              <p className="text-right address-text">
                Website:{" "}
                <a href="http://www.nita.go.ke" className="p-text">
                  http://www.nita.go.ke
                </a>
              </p>
            </div>
          </div>
          <div className="font-italic my-3">When replying please quote:</div>
          <div className="d-flex justify-content-between pb-2">
            <div>
              <h4 className="font-weight-bold">
                {`${splitRecommendation().quote}`}
              </h4>
            </div>
            <div>
              <h4 className="font-weight-bold">{`${moment(
                letter_data.date_2
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
            {`RE: TRAINING ON ${letter_data.course_title.toUpperCase()} BY ${letter_data.training_provider.toUpperCase()} FROM
             ${moment(applicationDates[0]?.start_date)
               .format("Do MMMM, YYYY")
               .toUpperCase()}
             TO ${moment(applicationDates[0]?.end_date)
               .format("Do MMMM, YYYY")
               .toUpperCase()} .`}
          </h5>
        </div>
        <div className="letter-body">
          <div className="d-flex justify-content-between pb-2">
            <div>
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
              {/* <p className="date-applied medium-text">
                {`We acknowledge receipt of your training application on
                ${
                  letter_data.date_applied
                } on the above subject nominating <b>${
                  getFilteredNominees()[0]?.first_name
                } ${getFilteredNominees()[0]?.last_name}</b>
                to attend the course.`}
              </p> */}
              <p className="recommendation mt-2 medium-text">
                Approval was granted for <b>the nominee</b> to attend the course
                as{" "}
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
            to NITA through the email address training@nita.go.ke accompanied by
            adequate justification to warrant the change.
          </p>
        </div>
        <div className="my-3  medium-text">
          <p>Thank you for participating in Industrial training.</p>
        </div>
        <div className="sign-off">
          <div className="d-flex justify-content-between pb-2">
            <div>
              <p className="font-weight-bold medium-text">{`${letter_data.approver_name}`}</p>
              <p className="font-weight-bold medium-text">
                <u>For: DIRECTOR GENERAL</u>
              </p>
              <p className="address-text">{`${getNameInitials()}`}/MN</p>
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
        <div className="div-stamp mb-3">
          <img src={stamp} className="stamp" alt="Stamp" />
          <p className="stamp-date">
            {` ${moment(letter_data.date_2)
              .format("DD - MMM - YYYY")
              .toUpperCase()} `}
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
