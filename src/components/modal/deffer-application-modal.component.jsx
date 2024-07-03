import { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";

import "../application/styles/form.styles.css";
import { message } from "antd";

const DefferApplicationModal = ({
  handleClose,
  type,
  handleDeffer,
  handleDefferToAdmin,
  handleReject,
}) => {
  const [isDefferToAdmin, setIsDefferToAdmin] = useState(false);
  const { account_type } = useSelector((state) => state.auth).user_data;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const defferToOrg = () => {
    setIsDefferToAdmin(false);
  };

  const defferToAdmin = () => {
    setIsDefferToAdmin(true);
  };

  const onSubmit = (data) => {
    handleClose();

    if (
      account_type === process.env.REACT_APP_AccountType3 &&
      isDefferToAdmin
    ) {
      data = { ...data, defferToAdmin: true };
      handleDefferToAdmin(data);
    } else type === "rejection" ? handleReject(data) : handleDeffer(data);
  };

  return (
    <Form className="row" onSubmit={handleSubmit(onSubmit)}>
      <div className="col-md-12">
        <div class="form-row">
          <div class="col-md-12">
            <fieldset>
              <Form.Group controlId="deffer_message">
                <label for="deffer_message" class="sr-only">
                  Deffer message:
                </label>
                <textarea
                  id="deffer_message"
                  rows="6"
                  autoComplete="off"
                  {...register("deffer_message", {
                    required: "A deffer must have a reason!!",
                  })}
                  className={`${
                    errors.deffer_message
                      ? "input-error form-control"
                      : "form-control"
                  }`}
                />
                {errors.deffer_message && (
                  <p className="errorMsg">{errors.deffer_message.message}</p>
                )}
              </Form.Group>
            </fieldset>
          </div>
        </div>
      </div>
      {account_type === process.env.REACT_APP_AccountType3 ? (
        <div className="col-md-12">
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              onClick={handleClose}
            >
              CANCEL
            </button>
            <button
              type="submit"
              onClick={defferToAdmin}
              class={`${"btn btn-warning text-white"}`}
            >
              DEFFER(ADMIN)
            </button>
            <button
              type="submit"
              onClick={defferToOrg}
              class={`${"btn btn-warning text-white"}`}
            >
              DEFFER(ORG)
            </button>
          </div>
        </div>
      ) : (
        <div className="col-md-12">
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              onClick={handleClose}
            >
              CANCEL
            </button>
            <button type="submit" class={`${"btn btn-warning text-white"}`}>
              DEFFER
            </button>
          </div>
        </div>
      )}
    </Form>
  );
};

export default DefferApplicationModal;
