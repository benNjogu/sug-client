import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

import DefaultLayout from "../../../components/default-layout/default-layout.component";

//get stylesheet
import "../../../components/application/styles/form.styles.css";
import Spinner from "../../../components/spinner";
import {
  GetOrganizationData,
  PostOrganizationProfileData,
} from "../../../redux/slices/organization";

const Profile = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { user_data } = useSelector((state) => state.auth);
  let { user_name, email, levy_no } = user_data;

  const { organization_profile_data } = useSelector(
    (state) => state.organization
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues:
      organization_profile_data === null
        ? {}
        : {
            town: organization_profile_data[0].town,
            street: organization_profile_data[0].street,
            building: organization_profile_data[0].building,
            floor: organization_profile_data[0].floor,
            box: organization_profile_data[0].box,
            code: organization_profile_data[0].code,
            phone: organization_profile_data[0].phone,
          },
  });

  const onSubmit = (data) => {
    setLoading(true);

    setTimeout(() => {
      dispatch(PostOrganizationProfileData(data));

      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    console.log("getting profile data");
    dispatch(GetOrganizationData());
  }, []);

  return (
    <DefaultLayout>
      <Form className="" onSubmit={handleSubmit(onSubmit)}>
        <Spinner loading={loading} />
        <div class="form-row">
          <legend className="text-info">Profile Details.</legend>
          <div class="col-md-4 form-group">
            <label for="name">Name of the organization:</label>
            <input
              type="text"
              name="name"
              id="name"
              class="form-control"
              placeholder="Keytech solutions"
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
              class="form-control"
              placeholder="organization@domain.com"
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
              class="form-control"
              placeholder="ABCD1234"
              value={levy_no}
              readOnly
            />
          </div>
        </div>
        <div class="form-row">
          <div class="col-md-3 form-group">
            <label for="address">Town:</label>
            <input
              type="text"
              name="address"
              id="address"
              class="form-control"
              placeholder="Nairobi"
              {...register("town", {
                required: "Town is required.",
              })}
              className={`${
                errors.town ? "input-error form-control" : "form-control"
              }`}
            />
            {errors.town && <p className="errorMsg">{errors.town.message}</p>}
          </div>
          <div class="col-md-3 form-group">
            <label for="address">Street:</label>
            <input
              type="text"
              name="address"
              id="address"
              class="form-control"
              placeholder="1234 Grand Avenue"
              {...register("street", {
                required: "Street is required.",
              })}
              className={`${
                errors.street ? "input-error form-control" : "form-control"
              }`}
            />
            {errors.street && (
              <p className="errorMsg">{errors.street.message}</p>
            )}
          </div>
          <div class="col-md-3 form-group">
            <label for="apartment">Building:</label>
            <input
              type="text"
              name="apartment"
              id="apartment"
              class="form-control"
              placeholder="Kenda House"
              {...register("building", {
                required: "Building is required.",
              })}
              className={`${
                errors.building ? "input-error form-control" : "form-control"
              }`}
            />
            {errors.building && (
              <p className="errorMsg">{errors.building.message}</p>
            )}
          </div>
          <div class="col-md-3 form-group">
            <label for="floor">Floor:</label>
            <input
              type="number"
              name="floor"
              id="floor"
              class="form-control"
              maxLength={2}
              placeholder="2"
              {...register("floor", {
                required: "Floor is required.",
              })}
              className={`${
                errors.floor ? "input-error form-control" : "form-control"
              }`}
            />
            {errors.floor && <p className="errorMsg">{errors.floor.message}</p>}
          </div>
        </div>
        <div class="form-row">
          <div class="col-md-6 form-group">
            <label for="box">P.O. Box:</label>
            <input
              type="text"
              class="form-control"
              name="box"
              id="box"
              placeholder="49 Maragua"
              {...register("box", {
                required: "Box is required.",
              })}
              className={`${
                errors.box ? "input-error form-control" : "form-control"
              }`}
            />
            {errors.box && <p className="errorMsg">{errors.box.message}</p>}
          </div>
          <div class="col-md-2 form-group">
            <label for="code">Code:</label>
            <input
              type="number"
              name="code"
              id="code"
              class="form-control"
              placeholder="102005"
              {...register("code", {
                required: "Code is required.",
              })}
              className={`${
                errors.code ? "input-error form-control" : "form-control"
              }`}
            />
            {errors.code && <p className="errorMsg">{errors.code.message}</p>}
          </div>
          <div class="col-md-4 form-group">
            <label for="phone">Phone/Fax Number:</label>
            <input
              type="text"
              name="phone"
              id="phone"
              class="form-control"
              placeholder="+254 745 580 333"
              {...register("phone", {
                required: "Phone/Fax is required.",
              })}
              className={`${
                errors.phone ? "input-error form-control" : "form-control"
              }`}
            />
            {errors.phone && <p className="errorMsg">{errors.phone.message}</p>}
          </div>
        </div>
        <button
          type="submit"
          class="btn btn-outline-primary btn-lg d-block ml-auto"
        >
          Save
        </button>
      </Form>
    </DefaultLayout>
  );
};

export default Profile;
