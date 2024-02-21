import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';

import SignatureID from '../signature-id.component';
import '../application/styles/form.styles.css';

const ApproveApplicationModal = ({ handleClose, handleApprove }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const onSubmit = (data) => {
    console.log(data);
    handleClose();
    handleApprove(data);
  };

  return (
    <Form className="row" onSubmit={handleSubmit(onSubmit)}>
      <div class="col-md-12">
        <Form.Group controlId="in-house-recomedation">
          <label for="in-house">
            <b>In-house:</b>
          </label>
          <div>
            <div class="form-check form-check-inline">
              <input
                type="radio"
                class="form-check-input"
                name="recommedation"
                id="employer-premises"
                value="In-House,At Employer Premises"
                autoComplete="off"
                {...register('recommedation', {
                  required: 'Recomedation is required.',
                })}
                className={`${errors.recommedation ? 'input-error' : ''}`}
              />
              <label for="in-house" class="form-check-label ml-2">
                At Employers Premises
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                type="radio"
                class="form-check-input"
                name="recommedation"
                id="outside-employer-premises"
                value="In-House,Outside Employer Premises"
                autoComplete="off"
                {...register('recommedation', {
                  required: 'Recomedation is required.',
                })}
                className={`${errors.recommedation ? 'input-error' : ''}`}
              />
              <label for="in-house" class="form-check-label ml-2">
                Outside Employers Premises
              </label>
            </div>
          </div>
        </Form.Group>
      </div>
      <div class="col-md-12">
        <Form.Group controlId="open-house-recomedation">
          <label for="open-house">
            <b>Open-house:</b>
          </label>
          <div>
            <div class="form-check form-check-inline">
              <input
                type="radio"
                class="form-check-input"
                name="recommedation"
                id="residential"
                value="Open-House,Residential"
                autoComplete="off"
                {...register('recommedation', {
                  required: 'Recomedation is required.',
                })}
                className={`${errors.recommedation ? 'input-error' : ''}`}
              />
              <label for="open-house" class="form-check-label ml-2">
                Residential
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                type="radio"
                class="form-check-input"
                name="recommedation"
                id="non-residential"
                value="Open-House,Non-Residential"
                autoComplete="off"
                {...register('recommedation', {
                  required: 'Recomedation is required.',
                })}
                className={`${errors.recommedation ? 'input-error' : ''}`}
              />
              <label for="open-house" class="form-check-label ml-2">
                Non Residential
              </label>
            </div>
          </div>
          {errors.recommedation && (
            <p className="errorMsg">{errors.recommedation.message}</p>
          )}
        </Form.Group>
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
          <button type="submit" class={`${'btn btn-success'}`}>
            APPROVE
          </button>
        </div>
      </div>
    </Form>
  );
};

export default ApproveApplicationModal;
