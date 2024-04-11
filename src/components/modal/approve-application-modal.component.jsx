import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";
import { Checkbox, message } from "antd";

import Quotation from "../application-quote";
import "../application/styles/form.styles.css";

const ApproveApplicationModal = ({ handleClose, handleApprove }) => {
  const [recommendation, setRecommendation] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const options = [
    {
      label: "In-house",
      value: "in-house",
    },
    {
      label: "Open-house",
      value: "open-house",
    },
    {
      label: "Residential",
      value: "residential",
    },
    {
      label: "Non-Residential",
      value: "non residential",
    },
    {
      label: "At employers premises",
      value: "at employers premises",
    },
    {
      label: "Outside employers premises",
      value: "outside employers premises",
    },
  ];

  const onChange = (checkedValues) => {
    setRecommendation(checkedValues);
    console.log("checked = ", checkedValues);
  };

  const onSubmit = (data) => {
    if (recommendation.length === 0) {
      return message.error("Recommendation required!!!");
    }

    let all_data = [data.quote.toUpperCase(), recommendation.join()].join();
    handleClose();
    handleApprove(all_data);
  };

  return (
    <Form className="row" onSubmit={handleSubmit(onSubmit)}>
      <div class="col-md-12">
        <Form.Group controlId="recomedation" className="mt-2 mb-3">
          <Checkbox.Group options={options} onChange={onChange} />

          {recommendation.length === 0 && (
            <p className="errorMsg">{"Recommendation required"}</p>
          )}
        </Form.Group>

        <Quotation register={register} errors={errors} />
      </div>
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
            APPROVE
          </button>
        </div>
      </div>
    </Form>
  );
};

export default ApproveApplicationModal;
