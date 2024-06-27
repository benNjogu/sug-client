import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { Modal } from "antd";

import {
  GetOrganizationData,
  PostOrganizationProfileData,
} from "../../../redux/slices/organization";
import EditOrganizationProfile from "../../../components/modal/edit-organization-profile-modal.component";
import DefaultLayout from "../../../components/default-layout/default-layout.component";

//get stylesheet
import "../../../components/application/styles/form.styles.css";

const Profile = () => {
  const dispatch = useDispatch();
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  const { user_name, email, levy_no } = useSelector(
    (state) => state.auth.user_data
  );

  const { organization_profile_data } = useSelector(
    (state) => state.organization
  );

  const handleEdit = () => {
    console.log("modal");
    setShowEditProfileModal(true);
  };

  const handleCancel = () => {
    setShowEditProfileModal(false);
  };

  const submitData = (data) => {
    dispatch(PostOrganizationProfileData(data));
  };

  useEffect(() => {
    console.log("getting profile data");
  }, []);

  return (
    <DefaultLayout>
      {showEditProfileModal && (
        <Modal
          open={showEditProfileModal}
          title={`Edit Profile`}
          onCancel={handleCancel}
          footer={false}
        >
          {
            <EditOrganizationProfile
              currentData={organization_profile_data[0]}
              submitData={submitData}
              handleCancel={handleCancel}
            />
          }
        </Modal>
      )}
      <Form>
        <div class="form-row">
          <legend className="text-info">Profile Details.</legend>
          <div class="col-md-4 form-group">
            <label for="name">Name of the organization:</label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control text-primary"
              value={user_name}
              readOnly
            />
          </div>
          <div class="col-md-4 form-group">
            <label for="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control text-primary"
              value={email}
              readOnly
            />
          </div>
          <div class="col-md-4 form-group">
            <label for="regno">Levy Registration Number:</label>
            <input
              type="text"
              name="regno"
              id="regno"
              className="form-control text-primary"
              value={levy_no}
              readOnly
            />
          </div>
        </div>
        <div class="form-row">
          <div class="col-md-3 form-group">
            <label for="town">Town:</label>
            <input
              type="text"
              name="town"
              id="town"
              className="form-control text-primary"
              value={organization_profile_data[0]?.town || undefined}
              readOnly
            />
          </div>
          <div class="col-md-3 form-group">
            <label for="street">Street:</label>
            <input
              type="text"
              name="street"
              id="street"
              className="form-control text-primary"
              value={organization_profile_data[0]?.street || undefined}
              readOnly
            />
          </div>
          <div class="col-md-3 form-group">
            <label for="apartment">Building:</label>
            <input
              type="text"
              name="apartment"
              id="apartment"
              className="form-control text-primary"
              value={organization_profile_data[0]?.building || undefined}
              readOnly
            />
          </div>
          <div class="col-md-3 form-group">
            <label for="floor">Floor:</label>
            <input
              type="number"
              name="floor"
              id="floor"
              className="form-control text-primary"
              value={organization_profile_data[0]?.floor || undefined}
              maxLength={2}
              readOnly
            />
          </div>
        </div>
        <div class="form-row">
          <div class="col-md-6 form-group">
            <label for="box">P.O. Box:</label>
            <input
              type="text"
              className="form-control text-primary"
              value={organization_profile_data[0]?.box || undefined}
              name="box"
              id="box"
              readOnly
            />
          </div>
          <div class="col-md-2 form-group">
            <label for="code">Code:</label>
            <input
              type="number"
              name="code"
              id="code"
              className="form-control text-primary"
              value={organization_profile_data[0]?.code || undefined}
              readOnly
            />
          </div>
          <div class="col-md-4 form-group">
            <label for="phone">Phone/Fax Number:</label>
            <input
              type="text"
              name="phone"
              id="phone"
              className="form-control text-primary"
              value={organization_profile_data[0]?.phone || undefined}
              readOnly
            />
          </div>
        </div>
        <button
          type="button"
          class="btn btn-outline-primary btn-lg d-block ml-auto"
          onClick={handleEdit}
        >
          EDIT
        </button>
      </Form>
    </DefaultLayout>
  );
};

export default Profile;
