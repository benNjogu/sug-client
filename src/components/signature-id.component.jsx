import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';

const SignatureID = ({ errors, register, handleSubmit }) => {
  return (
    <div class="form-row">
      <div className="col-md-4">
        <label for="signature">
          <b>Signature ID:</b>
        </label>
      </div>
      <div className="col-md-8">
        <Form.Group controlId="signature_id">
          <input
            type="number"
            name="signature"
            class="form-control"
            id="signature_id"
            placeholder="0000"
            autoComplete="off"
            // value={signature_id}
            {...register('signature_id', {
              required: 'Signature ID required.',
            })}
            className={`${
              errors.signature_id ? 'input-error form-control' : 'form-control'
            }`}
            // onChange={onChangeFareFees}
          />
          {errors.signature_id && (
            <p className="errorMsg">{errors.signature_id.message}</p>
          )}
        </Form.Group>
      </div>
    </div>
  );
};

export default SignatureID;
