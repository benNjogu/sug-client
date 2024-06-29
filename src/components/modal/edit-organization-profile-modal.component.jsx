import { useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Spinner from "../spinner";

const EditOrganizationProfile = ({ currentData, submitData, handleCancel }) => {
  const [loading, setLoading] = useState(false);
  console.log("cdata", currentData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      county: currentData?.county,
      sector: currentData?.sector,
      town: currentData?.town,
      street: currentData?.street,
      building: currentData?.building,
      floor: currentData?.floor,
      box: currentData?.box,
      code: currentData?.code,
      phone: currentData?.phone,
    },
  });

  const onSubmit = (data) => {
    console.log("org data", data);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      submitData(data);
    }, 500);
  };

  return (
    <Form className="row" onSubmit={handleSubmit(onSubmit)}>
      <Spinner loading={loading} />
      <div className="col-md-12">
        <div class="form-row">
          <div class="col-md-6 form-group">
            <label for="county">County (e.g Murang'a):</label>
            <input
              type="text"
              name="county"
              id="county"
              class="form-control"
              placeholder="Murang'a"
              {...register("county", {
                required: "county is required.",
              })}
              className={`${
                errors.county
                  ? "input-error form-control text-primary"
                  : "form-control text-primary"
              }`}
            />
            {errors.county && (
              <p className="errorMsg">{errors.county.message}</p>
            )}
          </div>
          <div class="col-md-6 form-group">
            <label for="sector">Sector (e.g Agriculture):</label>
            <input
              type="text"
              name="sector"
              id="sector"
              class="form-control"
              placeholder="Agriculture"
              {...register("sector", {
                required: "Sector is required.",
              })}
              className={`${
                errors.sector
                  ? "input-error form-control text-primary"
                  : "form-control text-primary"
              }`}
            />
            {errors.sector && (
              <p className="errorMsg">{errors.sector.message}</p>
            )}
          </div>
        </div>
        <div class="form-row">
          <div class="col-md-6 form-group">
            <label for="address">Town:</label>
            <input
              type="text"
              name="town"
              id="town"
              class="form-control"
              placeholder="Nairobi"
              {...register("town", {
                required: "Town is required.",
              })}
              className={`${
                errors.town
                  ? "input-error form-control text-primary"
                  : "form-control text-primary"
              }`}
            />
            {errors.town && <p className="errorMsg">{errors.town.message}</p>}
          </div>
          <div class="col-md-6 form-group">
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
                errors.street
                  ? "input-error form-control text-primary"
                  : "form-control text-primary"
              }`}
            />
            {errors.street && (
              <p className="errorMsg">{errors.street.message}</p>
            )}
          </div>
        </div>
        <div class="form-row">
          <div class="col-md-6 form-group">
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
                errors.building
                  ? "input-error form-control text-primary"
                  : "form-control text-primary"
              }`}
            />
            {errors.building && (
              <p className="errorMsg">{errors.building.message}</p>
            )}
          </div>
          <div class="col-md-6 form-group">
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
                errors.floor
                  ? "input-error form-control text-primary"
                  : "form-control text-primary"
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
                errors.box
                  ? "input-error form-control text-primary"
                  : "form-control text-primary"
              }`}
            />
            {errors.box && <p className="errorMsg">{errors.box.message}</p>}
          </div>
          <div class="col-md-6 form-group">
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
                errors.code
                  ? "input-error form-control text-primary"
                  : "form-control text-primary"
              }`}
            />
            {errors.code && <p className="errorMsg">{errors.code.message}</p>}
          </div>
        </div>
        <div className="row">
          <div class="col-md-12 form-group">
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
                errors.phone
                  ? "input-error form-control text-primary"
                  : "form-control text-primary"
              }`}
            />
            {errors.phone && <p className="errorMsg">{errors.phone.message}</p>}
          </div>
        </div>
      </div>
      <div className="col-md-12">
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            onClick={handleCancel}
          >
            CANCEL
          </button>

          <button type="submit" class={`${"btn btn-success"}`}>
            {"EDIT"}
          </button>
        </div>
      </div>
    </Form>
  );
};

export default EditOrganizationProfile;
