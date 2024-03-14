import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";

import "../application/styles/form.styles.css";
import { constants } from "../../data/constants";

const GenerateReportModal = ({ handleClose, onGenerateReport, options }) => {
  const [level, setLevel] = useState(constants.SELECT);
  const [levelErrors, setLevelErrors] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const onSubmit = (data) => {
    if (level === constants.SELECT) {
      setLevelErrors(true);
    } else {
      data = { ...data, level };
      console.log(data);
      handleClose();
      onGenerateReport(data);
    }
  };

  return (
    <Form className="row" onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="col-md-12" controlId="start_date">
        <label for="from">Start date:</label>
        <input
          type="date"
          name={`start_date`}
          id={`start_date`}
          placeholder="mm/dd/yyyy"
          autoComplete="off"
          {...register("start_date", {
            required: "End date is required.",
          })}
          className={`${
            errors.start_date ? "input-error form-control" : "form-control"
          }`}
        />
        {errors.start_date && (
          <p className="errorMsg">{errors.start_date.message}</p>
        )}
      </Form.Group>
      <Form.Group className="col-md-12" controlId="end_date">
        <label for="to">End date:</label>
        <input
          type="date"
          name={`end_date`}
          id={`end_date`}
          class="form-control"
          placeholder="mm/dd/yyyy"
          autoComplete="off"
          {...register("end_date", {
            required: "End date is required.",
          })}
          className={`${
            errors.start_date ? "input-error form-control" : "form-control"
          }`}
        />
        {errors.end_date && (
          <p className="errorMsg">{errors.end_date.message}</p>
        )}
      </Form.Group>

      <div className="col-md-12">
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            onClick={handleClose}
          >
            CANCEL
          </button>
          <button type="submit" class={`${"btn btn-success"}`}>
            GENERATE
          </button>
        </div>
      </div>
    </Form>
  );
};

export default GenerateReportModal;
