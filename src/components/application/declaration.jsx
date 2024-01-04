import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { CreateNewApplication } from '../../redux/slices/application';

const Declaration = ({ user, updateUser }) => {
  const dispatch = useDispatch();

  let applicationSpecs = useSelector(
    (state) => state.application.applicationSpecs
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      sign: user.sign,
      first_name_hr: user.first_name_hr,
      last_name_hr: user.last_name_hr,
      id_hr: user.id_hr,
    },
  });

  console.log('others', user);
  const onSubmit = (data) => {
    updateUser({ ...data, ...applicationSpecs });
    dispatch(CreateNewApplication(user));
  };

  return (
    <Form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <div className="row form_div">
        <div className="col-md-12">
          <legend className="text-danger">Certify and submit</legend>
          <div class="form-row">
            <div class="col-md-12 form-group">
              <div class="form-group form-check">
                <input
                  type="checkbox"
                  id="declaration"
                  {...register('sign', {
                    required: 'Check the box above please.',
                  })}
                  className={`${
                    errors.sign
                      ? 'input-error form-check-input'
                      : 'form-check-input'
                  }`}
                />
                <label class="form-check-label" for="declaration">
                  I hereby declare that the information here given is true to
                  the best of my knowledge.{' '}
                  <span className="text-success">
                    I understand that checking the box will apply as my
                    signature to this form!
                  </span>
                </label>
                {errors.sign && (
                  <p className="errorMsg">{errors.sign.message}</p>
                )}
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="col-md-3">
              <Form.Group controlId="national_id_hr">
                <input
                  type="text"
                  name="national_id_hr"
                  id="national_id_hr"
                  placeholder="National ID Number"
                  autoComplete="off"
                  {...register('national_id_hr', {
                    required: 'National ID is required.',
                  })}
                  className={`${
                    errors.national_id_hr
                      ? 'input-error form-control'
                      : 'form-control'
                  }`}
                />
                {errors.national_id_hr && (
                  <p className="errorMsg">{errors.national_id_hr.message}</p>
                )}
              </Form.Group>
            </div>
            <div class="col-md-3">
              <Form.Group controlId="first_name_hr">
                <input
                  type="text"
                  name="first_name_hr"
                  id="first_name_hr"
                  placeholder="FirstName"
                  autoComplete="off"
                  {...register('first_name_hr', {
                    required: 'First name is required.',
                  })}
                  className={`${
                    errors.first_name_hr
                      ? 'input-error form-control'
                      : 'form-control'
                  }`}
                />
                {errors.first_name_hr && (
                  <p className="errorMsg">{errors.first_name_hr.message}</p>
                )}
              </Form.Group>
            </div>
            <div class="col-md-3">
              <Form.Group controlId="last_name_hr">
                <input
                  type="text"
                  name="last_name_hr"
                  id="last_name_hr"
                  placeholder="LastName"
                  autoComplete="off"
                  {...register('last_name_hr', {
                    required: 'Last name is required.',
                  })}
                  className={`${
                    errors.last_name_hr
                      ? 'input-error form-control'
                      : 'form-control'
                  }`}
                />
                {errors.last_name_hr && (
                  <p className="errorMsg">{errors.last_name_hr.message}</p>
                )}
              </Form.Group>
            </div>
            <div class="col-md-3">
              <Form.Group controlId="id_hr">
                <div>
                  <input
                    type="file"
                    id="customFile"
                    autoComplete="off"
                    {...register('id_hr', {
                      required: 'id is required.',
                    })}
                    className={`${errors.id_hr ? 'input-error' : ''}`}
                  />
                  {errors.id_hr && (
                    <p className="errorMsg">{errors.id_hr.message}</p>
                  )}
                </div>
              </Form.Group>
            </div>
          </div>
        </div>
        <div className={'col-md-12 text-right pb-2 px-0'}>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default Declaration;
