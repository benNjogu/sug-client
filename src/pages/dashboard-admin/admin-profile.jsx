import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

import DefaultLayout from "../../components/default-layout/default-layout.component";

import Spinner from "./../../components/spinner";
import { convertDigitInString } from "../../utils/convertDigitsInString";
//get stylesheet
import "../../components/application/styles/form.styles.css";
import { GetAdminData, PostAdminProfileData } from "../../redux/slices/admin";

const AdminProfile = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { user_data } = useSelector((state) => state.auth);
  let { user_name, email, account_type, created_on, active } = user_data;

  created_on = convertDigitInString(created_on.split("T")[0]);

  const { admin_profile_data } = useSelector((state) => state.admin);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: admin_profile_data[0]?.phone,
    },
  });

  const onSubmit = (data) => {
    setLoading(true);

    setTimeout(() => {
      dispatch(PostAdminProfileData(data));

      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    console.log("getting profile data");
    dispatch(GetAdminData());
  }, []);

  return (
    <DefaultLayout>
      <Form className="" onSubmit={handleSubmit(onSubmit)}>
        <Spinner loading={loading} />
        <div className="row">
          <div className="col-md-12">
            <legend className="text-info">Profile Details.</legend>
          </div>
          <div className="col-md-6">
            <div class="form-row">
              <div class="col-md-12 form-group">
                <label for="name">Name:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control text-primary"
                  value={user_name}
                  readOnly
                />
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-12 form-group">
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
            </div>
            <div class="form-row">
              <div class="col-md-12 form-group">
                <label for="phone">Phone Number:</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  class="form-control"
                  placeholder="Enter phone number"
                  {...register("phone", {
                    required: "Phone is required.",
                  })}
                  className={`${
                    errors.phone
                      ? "input-error form-control text-primary"
                      : "form-control text-primary"
                  }`}
                />
                {errors.phone && (
                  <p className="errorMsg">{errors.phone.message}</p>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div class="form-row">
              <div class="col-md-12 form-group">
                <label for="level">Level:</label>
                <input
                  type="level"
                  name="level"
                  id="level"
                  className="form-control text-primary"
                  value={account_type}
                  readOnly
                />
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-12 form-group">
                <label for="active">Active:</label>
                <input
                  type="active"
                  name="active"
                  id="active"
                  className="form-control text-primary"
                  value={active === 1 ? "True" : "False"}
                  readOnly
                />
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-12 form-group">
                <label for="created">Created:</label>
                <input
                  type="created"
                  name="created"
                  id="created"
                  className="form-control text-primary"
                  value={created_on}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="col-md-12 form-group">
            <button
              type="submit"
              class="btn btn-outline-primary btn-lg d-block ml-auto"
            >
              Save
            </button>
          </div>
        </div>
      </Form>
    </DefaultLayout>
  );
};

export default AdminProfile;
