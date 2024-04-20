import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "antd";

import logo from "../../assets/images/logo.png";
import stamp from "../../assets/images/ibta-stamp.png";
import "./approval-letter.styles.css";

const ApprovalLetter = ({ letter_data }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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
                NITA/LEVY/FPAI/361/VOL.IX/[14B]
              </h4>
            </div>
            <div>
              <h4 className="font-weight-bold">27-09-2022</h4>
            </div>
          </div>
        </div>
        <div className="address">
          <div className="d-flex justify-content-between pb-2">
            <div>
              <p className="address-text">The Human Resource Manager</p>
              <p className="address-text">Mini Bakeries (Nairobi) Ltd.</p>
              <p className="address-text">P.O. Box 17592-00500</p>
              <p className="font-weight-bold medium-text">NAIROBI</p>
            </div>
          </div>
        </div>
        <div className="reference my-3">
          <h5 className="font-weight-bold">
            RE: TRAINING ON PSYCHOMETRICS AND HR ANALYTICS BY TOP LEVEL
            MANAGEMENT FROM DATE TO DATE ADDING MORE TEXT TO SEE HOW IT APPEARS
            ON MULTIPLE LINES.
          </h5>
        </div>
        <div className="letter-body">
          <div className="d-flex justify-content-between pb-2">
            <div>
              <p className="date-applied medium-text">
                We acknowledge receipt of your training application on
                18-09-2022 on the above subject nominating <b>Felix Mwinzi</b>{" "}
                to attend the course.
              </p>
              <p className="recommendation mt-2 medium-text">
                Approval was granted for <b>the nominee</b> to attend the course
                as{" "}
                <b>
                  open-house, residential training outside employer's premises.(
                </b>{" "}
                Travellers beach <b>).</b>
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
              <p className="font-weight-bold medium-text">Peter Njiru</p>
              <p className="font-weight-bold medium-text">
                <u>For: DIRECTOR GENERAL</u>
              </p>
              <p className="address-text">PN/MN</p>
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
          <p className="stamp-date">2 7 - 0 9 - 2022</p>
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
