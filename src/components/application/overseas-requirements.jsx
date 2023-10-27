import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Overseas = ({ user, updateUser }) => {
  const navigate = useNavigate();

  const [related, setRelated] = useState(false);
  const [otherFunds, setOtherFunds] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      local_availability: user.local_availability,
      employment_date: user.employment_date,
      trainer_employer_relationship: user.trainer_employer_relationship,
      related_to_organization: user.related_to_organization,
      other_organization_funds: user.other_organization_funds,
      org_funding: user.org_funding,
    },
  });

  const handleRelated = () => {
    setRelated(true);
  };

  const handleNotRelated = () => {
    setRelated(false);
  };

  const handleOtherFunds = () => {
    setOtherFunds(true);
  };

  const handleNoOtherFunds = () => {
    setOtherFunds(false);
  };

  const onSubmit = (data) => {
    console.log(data);
    updateUser(data);
    navigate('/app/new-application/training-expenses');
  };

  return (
    <Form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <div className="row form_div">
        <div className="col-md-12">
          <legend className="text-info">
            Regional/Overseas training additional requirements.
          </legend>
          <div class="form-row">
            <div class="col-md-6">
              <Form.Group controlId="local_availability">
                <label for="local_availability">
                  Is the course available locally?
                </label>
                <div>
                  <div class="form-check form-check-inline">
                    <input
                      type="radio"
                      class="form-check-input"
                      name="local_availability"
                      id="available-yes"
                      value="yes"
                      autoComplete="off"
                      {...register('local_availability', {
                        required: 'Availability is required.',
                      })}
                      className={`${
                        errors.local_availability ? 'input-error' : ''
                      }`}
                    />
                    <label for="available-yes" class="form-check-label">
                      Yes
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      type="radio"
                      class="form-check-input"
                      name="local_availability"
                      id="available-no"
                      value="No"
                      autoComplete="off"
                      {...register('local_availability', {
                        required: 'Availability is required.',
                      })}
                      className={`${
                        errors.local_availability ? 'input-error' : ''
                      }`}
                    />
                    <label for="available-no" class="form-check-label">
                      No
                    </label>
                  </div>
                </div>
                {errors.local_availability && (
                  <p className="errorMsg">
                    {errors.local_availability.message}
                  </p>
                )}
              </Form.Group>
            </div>
            <div class="col-md-6">
              <Form.Group controlId="employment_date">
                <label for="employment_date">Date of employment:</label>
                <input
                  type="date"
                  name="employment_date"
                  id="employment_date"
                  class="form-control"
                  placeholder="mm/dd/yyyy"
                  autoComplete="off"
                  {...register('employment_date', {
                    required: 'Employment date is required.',
                  })}
                  className={`${
                    errors.employment_date
                      ? 'input-error form-control'
                      : 'form-control'
                  }`}
                />
                {errors.employment_date && (
                  <p className="errorMsg">{errors.employment_date.message}</p>
                )}
              </Form.Group>
            </div>
          </div>
          <div class="form-row">
            <div class="col-md-12">
              <Form.Group controlId="trainer_employer_relationship">
                <label for="trainer_employer_relationship">
                  Does the trainer have any business connection with the
                  Employer/Applicant?
                </label>
                <div>
                  <div class="form-check form-check-inline">
                    <input
                      type="radio"
                      class="form-check-input"
                      name="trainer_employer_relationship"
                      id="relationship-no"
                      value="No"
                      onClick={handleNotRelated}
                      autoComplete="off"
                      {...register('trainer_employer_relationship', {
                        required: 'Trainer employer relationship is required.',
                      })}
                      className={`${
                        errors.trainer_employer_relationship
                          ? 'input-error'
                          : ''
                      }`}
                    />
                    <label for="relationship-no" class="form-check-label">
                      No
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      type="radio"
                      class="form-check-input"
                      name="trainer_employer_relationship"
                      id="relationship-yes"
                      value="yes"
                      onClick={handleRelated}
                      autoComplete="off"
                      {...register('trainer_employer_relationship', {
                        required: 'Trainer employer relationship is required.',
                      })}
                      className={`${
                        errors.trainer_employer_relationship
                          ? 'input-error'
                          : ''
                      }`}
                    />
                    <label for="relationship-yes" class="form-check-label">
                      Yes
                    </label>
                  </div>
                </div>
                {errors.trainer_employer_relationship && (
                  <p className="errorMsg">
                    {errors.trainer_employer_relationship.message}
                  </p>
                )}
              </Form.Group>
              <div class="col-md-12">
                {related && (
                  <input
                    type="text"
                    name="related_to_organization"
                    id="related_to_organization"
                    placeholder="If yes, which organization"
                    autoComplete="off"
                    {...register('related_to_organization', {
                      required: 'Please specify.',
                    })}
                    className={`${
                      errors.related_to_organization
                        ? 'input-error form-control'
                        : 'form-control'
                    }`}
                  />
                )}
                {related && errors.related_to_organization && (
                  <p className="errorMsg">
                    {errors.related_to_organization.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="col-md-12">
              <Form.Group controlId="other_organization_funds">
                <label for="other_organization_funds">
                  Is any other organization funding the training?
                </label>
                <div>
                  <div class="form-check form-check-inline">
                    <input
                      type="radio"
                      class="form-check-input"
                      name="other_organization_funds"
                      id="funds-no"
                      value="No"
                      onClick={handleNoOtherFunds}
                      autoComplete="off"
                      {...register('other_organization_funds', {
                        required: 'Funding information required.',
                      })}
                      className={`${
                        errors.other_organization_funds ? 'input-error' : ''
                      }`}
                    />
                    <label for="funds-no" class="form-check-label">
                      No
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      type="radio"
                      class="form-check-input"
                      name="other_organization_funds"
                      id="funds-yes"
                      value="yes"
                      onClick={handleOtherFunds}
                      autoComplete="off"
                      {...register('other_organization_funds', {
                        required: 'Funding information required.',
                      })}
                      className={`${
                        errors.other_organization_funds ? 'input-error' : ''
                      }`}
                    />
                    <label for="funds-yes" class="form-check-label">
                      Yes
                    </label>
                  </div>
                </div>
                {errors.other_organization_funds && (
                  <p className="errorMsg">
                    {errors.other_organization_funds.message}
                  </p>
                )}
              </Form.Group>
              <div class="col-md-12">
                {otherFunds && (
                  <input
                    type="text"
                    name="org_funding"
                    id="org_funding"
                    placeholder="If yes, which organization"
                    autoComplete="off"
                    {...register('org_funding', {
                      required: 'Please specify.',
                    })}
                    className={`${
                      errors.org_funding
                        ? 'input-error form-control'
                        : 'form-control'
                    }`}
                  />
                )}
                {otherFunds && errors.related_to_organization && (
                  <p className="errorMsg">
                    {errors.related_to_organization.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={'col-md-12 text-right pb-2 px-0 pt-2'}>
          <Button variant="primary" type="submit">
            Next
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default Overseas;
