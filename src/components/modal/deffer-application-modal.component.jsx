import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';

import SignatureID from '../signature-id.component';
import '../application/styles/form.styles.css';

const DefferApplicationModal = ({
  handleClose,
  type,
  handleDeffer,
  handleReject,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const onSubmit = (data) => {
    handleClose();

    type === 'rejection' ? handleReject(data) : handleDeffer(data);
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
                  {...register('deffer_message', {
                    required: 'A deffer must have a reason!!',
                  })}
                  className={`${
                    errors.deffer_message
                      ? 'input-error form-control'
                      : 'form-control'
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
      <div className="col-md-12">
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            onClick={handleClose}
          >
            CANCEL
          </button>
          <button type="submit" class={`${'btn btn-warning text-white'}`}>
            DEFFER
          </button>
        </div>
      </div>
    </Form>
  );
};

export default DefferApplicationModal;
