import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';

import SignatureID from '../signature-id.component';
import '../application/styles/form.styles.css';

const RejectApplicationModal = ({ handleClose, handleReject }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const onSubmit = (data) => {
    handleClose();
    handleReject(data);
  };

  return (
    <Form className="row" onSubmit={handleSubmit(onSubmit)}>
      <div className="col-md-12">
        <div class="form-row">
          <div class="col-md-12">
            <fieldset>
              <Form.Group controlId="rejection_message">
                <label for="rejection_message" class="sr-only">
                  Rejection message:
                </label>
                <textarea
                  id="rejection_message"
                  rows="6"
                  autoComplete="off"
                  {...register('rejection_message', {
                    required: 'A rejection must have a reason!!',
                  })}
                  className={`${
                    errors.rejection_message
                      ? 'input-error form-control'
                      : 'form-control'
                  }`}
                />
                {errors.rejection_message && (
                  <p className="errorMsg">{errors.rejection_message.message}</p>
                )}
              </Form.Group>
              <SignatureID
                errors={errors}
                register={register}
                handleSubmit={handleSubmit}
              />
            </fieldset>
          </div>
        </div>
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
          <button type="submit" class={`${'btn btn-danger'}`}>
            REJECT
          </button>
        </div>
      </div>
    </Form>
  );
};

export default RejectApplicationModal;
