import { useState } from "react";
import { Modal } from "antd";

import female from "../../assets/images/female.svg";
import male from "../../assets/images/male.svg";

import "./new-application-modal.styles.css";
import ViewPdf from "./view-pdf";

const ViewUser = ({ user }) => {
  const [showViewPDFModal, setShowViewPDFModal] = useState(false);
  const [pdf, setPdf] = useState();
  console.log("us", user);

  const handleCancel = () => {
    setShowViewPDFModal(false);
  };

  const handleViewPdf = (pdf) => {
    setPdf(`http://localhost:5000/nominee/${pdf}`);
    setShowViewPDFModal(true);
  };

  return (
    <>
      {showViewPDFModal && (
        <Modal
          open={showViewPDFModal}
          title={`ID Number provided: ${user.idNumber}`}
          onCancel={handleCancel}
          footer={false}
          width={660}
        >
          {<ViewPdf pdf={pdf} />}
        </Modal>
      )}
      <div className="profile-icon">
        {user.sex === "F" ? (
          <img src={female} className="profile-img" alt="passport photo" />
        ) : (
          <img src={male} className="profile-img" alt="passport photo" />
        )}
      </div>
      <div className="container_div mt-3">
        <h1 className="name">{user.first_name + "   " + user.last_name}</h1>
      </div>
      <p className="container_div mb-3">{user.user_name}</p>
      <div className="container_div">
        <div class="col-md-6 form-group">
          <label for="phone" className="label">
            Phone:
          </label>
          <p>{user.phone}</p>
        </div>
        <div class="col-md-6 form-group">
          <label for="id" className="label">
            ID Number:
          </label>
          <p>{user.idNumber}</p>
        </div>
      </div>
      <div className="container_div">
        <div class="col-md-6 form-group">
          <label for="id_pdf" className="label">
            ID Document:
          </label>
          <p className="idPdf" onClick={() => handleViewPdf(user.id_file)}>
            {"Click to View Pdf"}
          </p>
        </div>
        <div class="col-md-6 form-group">
          <label for="active" className="label">
            Active:
          </label>
          <p>{user.active === 1 ? "true" : "false"}</p>
        </div>
      </div>
      <div className="container_div">
        <div class="col-md-6 form-group">
          <label for="job_level" className="label">
            Job Level:
          </label>
          <p>{user.job_level}</p>
        </div>
        <div class="col-md-6 form-group">
          <label for="age" className="label">
            Age:
          </label>
          <p>{user.age}</p>
        </div>
      </div>
      <div className="container_div">
        <div class="col-md-12 form-group">
          <label for="qualifications" className="label">
            Qualifications:
          </label>
          <p>{user.qualifications}</p>
        </div>
      </div>
      <div className="container_div">
        <div class="col-md-12 form-group">
          <label for="job_desc" className="label">
            Job description:
          </label>
          <p>{user.job_description}</p>
        </div>
      </div>
    </>
  );
};

export default ViewUser;
