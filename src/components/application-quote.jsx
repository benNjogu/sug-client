import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";

const Quotation = ({ errors, register, handleSubmit }) => {
  return (
    <div class="form-row">
      <div className="col-md-4">
        <label for="signature">
          <b>Quotation:</b>
        </label>
      </div>
      <div className="col-md-8">
        <Form.Group controlId="quote">
          <input
            type="text"
            name="quote"
            class="form-control"
            id="quote"
            placeholder="NITA/LEVY/FPAI/361/VOL.IX/[14b]"
            autoComplete="off"
            {...register("quote", {
              required: "Quotation Required.",
            })}
            className={`${
              errors.quote ? "input-error form-control" : "form-control"
            }`}
          />
          {errors.quote && <p className="errorMsg">{errors.quote.message}</p>}
        </Form.Group>
      </div>
    </div>
  );
};

export default Quotation;
