import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import './styles/form.styles.css';

const Nominee = ({ user, updateUser }) => {
  const navigate = useNavigate();
  const [special, setSpecial] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      sex: user.sex,
      age: user.age,
      phone: user.phone,
      id_photo: user.id_photo,
      qualifications: user.qualifications,
      job_level: user.job_level,
      other_specification: user.other_specification,
      job_description: user.job_description,
    },
  });

  const handleOther = () => {
    setSpecial(true);
  };

  const handleOtherLevels = () => {
    setSpecial(false);
  };

  const onSubmit = (data) => {
    updateUser(data);
    navigate('/app/new-application/course');
  };

  return (
    <Form className="" onSubmit={handleSubmit(onSubmit)}>
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-12">
            <legend className="text-info">
              Particulars of the nominee.{' '}
              <span className="font-italic">
                attach documents where required
              </span>
            </legend>
            <div class="form-row">
              <div class="col-md-3">
                <Form.Group controlId="sex">
                  <label for="sex">Sex:</label>
                  <div>
                    <div class="form-check form-check-inline">
                      <input
                        type="radio"
                        class="form-check-input"
                        name="sex"
                        id="sex-male"
                        value="male"
                        autoComplete="off"
                        {...register('sex', {
                          required: 'Gender is required.',
                        })}
                        className={`${errors.sex ? 'input-error' : ''}`}
                      />
                      <label for="sex-male" class="form-check-label">
                        Male
                      </label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        type="radio"
                        class="form-check-input"
                        name="sex"
                        id="sex-female"
                        value="female"
                        autoComplete="off"
                        {...register('sex', {
                          required: 'Gender is required.',
                        })}
                        className={`${errors.sex ? 'input-error' : ''}`}
                      />
                      <label for="sex-female" class="form-check-label">
                        Female
                      </label>
                    </div>
                  </div>
                  {errors.sex && (
                    <p className="errorMsg">{errors.sex.message}</p>
                  )}
                </Form.Group>
              </div>
              <div class="col-md-3">
                <Form.Group controlId="age">
                  <label for="age">Age:</label>
                  <input
                    type="number"
                    name="age"
                    id="age"
                    autoComplete="off"
                    {...register('age', {
                      required: 'Age is required.',
                    })}
                    className={`${
                      errors.age ? 'input-error form-control' : 'form-control'
                    }`}
                  />
                  {errors.age && (
                    <p className="errorMsg">{errors.age.message}</p>
                  )}
                </Form.Group>
              </div>
              <div class="col-md-6">
                <Form.Group controlId="phone">
                  <label for="phone">Phone:</label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    autoComplete="off"
                    {...register('phone', {
                      required: 'Phone is required.',
                      minLength: {
                        value: 10,
                        message: 'Phone should have at-least 10 characters.',
                      },
                    })}
                    className={`${
                      errors.phone ? 'input-error form-control' : 'form-control'
                    }`}
                  />
                  {errors.phone && (
                    <p className="errorMsg">{errors.phone.message}</p>
                  )}
                </Form.Group>
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-3">
                <Form.Group controlId="first_name">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    placeholder="Enter your first name"
                    autoComplete="off"
                    {...register('first_name', {
                      required: 'First name is required.',
                      pattern: {
                        value: /^[a-zA-Z]+$/,
                        message: 'First name should contain only characters.',
                      },
                    })}
                    className={`${
                      errors.first_name
                        ? 'input-error form-control'
                        : 'form-control'
                    }`}
                  />
                  {errors.first_name && (
                    <p className="errorMsg">{errors.first_name.message}</p>
                  )}
                </Form.Group>
              </div>
              <div class="col-md-3">
                <Form.Group controlId="last_name">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Enter your last name"
                    autoComplete="off"
                    {...register('last_name', {
                      required: 'Last name is required.',
                      pattern: {
                        value: /^[a-zA-Z]+$/,
                        message: 'Last name should contain only characters.',
                      },
                    })}
                    className={`${
                      errors.last_name
                        ? 'input-error form-control'
                        : 'form-control'
                    }`}
                  />
                  {errors.last_name && (
                    <p className="errorMsg">{errors.last_name.message}</p>
                  )}
                </Form.Group>
              </div>
              <div class="col-md-6">
                <Form.Group controlId="id_photo">
                  <label for="id">ID or Passport:</label>
                  <div>
                    <input
                      type="file"
                      id="id_photo"
                      autoComplete="off"
                      {...register('id_photo', {
                        required: 'Passport/id is required.',
                      })}
                      className={`${errors.id_photo ? 'input-error' : ''}`}
                    />
                  </div>
                  {errors.id_photo && (
                    <p className="errorMsg">{errors.id_photo.message}</p>
                  )}
                </Form.Group>
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-12">
                <Form.Group controlId="qualifications">
                  <label for="qualification">Qualifications:</label>
                  <input
                    type="text"
                    name="qualifications"
                    id="qualifications"
                    placeholder="Qualifications"
                    autoComplete="off"
                    {...register('qualifications', {
                      required: 'Qualifications are required.',
                    })}
                    className={`${
                      errors.qualifications
                        ? 'input-error form-control'
                        : 'form-control'
                    }`}
                  />
                  {errors.qualifications && (
                    <p className="errorMsg">{errors.qualifications.message}</p>
                  )}
                </Form.Group>
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-12">
                <Form.Group controlId="job_level">
                  <label for="level">Job level:</label>
                  <div className="col-12">
                    <div class="form-check form-check-inline col-3">
                      <input
                        type="radio"
                        name="level"
                        id="top-level"
                        value="top"
                        onClick={handleOtherLevels}
                        autoComplete="off"
                        {...register('job_level', {
                          required: 'Job level is required.',
                        })}
                        className={`${
                          errors.job_level
                            ? 'input-error form-check-input'
                            : 'form-check-input'
                        }`}
                      />
                      <label for="top" class="form-check-label">
                        Top Management
                      </label>
                    </div>
                    <div class="form-check form-check-inline col-3">
                      <input
                        type="radio"
                        name="level"
                        id="middle-level"
                        value="middle"
                        autoComplete="off"
                        onClick={handleOtherLevels}
                        {...register('job_level', {
                          required: 'Job level is required.',
                        })}
                        className={`${
                          errors.job_level
                            ? 'input-error form-check-input'
                            : 'form-check-input'
                        }`}
                      />
                      <label for="middle" class="form-check-label">
                        Middle Level Management
                      </label>
                    </div>
                    <div class="form-check form-check-inline col-3">
                      <input
                        type="radio"
                        name="level"
                        id="supervisor-level"
                        value="supervisor"
                        autoComplete="off"
                        onClick={handleOtherLevels}
                        {...register('job_level', {
                          required: 'Job level is required.',
                        })}
                        className={`${
                          errors.job_level
                            ? 'input-error form-check-input'
                            : 'form-check-input'
                        }`}
                      />
                      <label for="supervisor" class="form-check-label">
                        supervisory Level
                      </label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        type="radio"
                        name="level"
                        id="operatives-level"
                        value="operatives"
                        autoComplete="off"
                        onClick={handleOtherLevels}
                        {...register('job_level', {
                          required: 'Job level is required.',
                        })}
                        className={`${
                          errors.job_level
                            ? 'input-error form-check-input'
                            : 'form-check-input'
                        }`}
                      />
                      <label for="operatives" class="form-check-label">
                        Operatives
                      </label>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-check form-check-inline col-3">
                      <input
                        type="radio"
                        name="level"
                        id="other-level"
                        value="other"
                        onClick={handleOther}
                        autoComplete="off"
                        {...register('job_level', {
                          required: 'Job level is required.',
                        })}
                        className={`${
                          errors.job_level
                            ? 'input-error form-check-input'
                            : 'form-check-input'
                        }`}
                      />
                      <label for="other" class="form-check-label">
                        Other
                      </label>
                    </div>
                    <div class="col-12">
                      {special && (
                        <input
                          type="text"
                          name="other-specification"
                          id="specify"
                          placeholder="Specify"
                          autoComplete="off"
                          {...register('other_specification', {
                            required: 'Please specify.',
                          })}
                          className={`${
                            errors.other_specification
                              ? 'input-error form-control'
                              : 'form-control'
                          }`}
                        />
                      )}
                      {special && errors.other_specification && (
                        <p className="errorMsg">
                          {errors.other_specification.message}
                        </p>
                      )}
                    </div>
                  </div>
                  {errors.job_level && (
                    <p className="errorMsg">{errors.job_level.message}</p>
                  )}
                </Form.Group>
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-12">
                <Form.Group controlId="job_description">
                  <label for="description">Job description:</label>
                  <input
                    type="text"
                    name="job_description"
                    id="job_description"
                    placeholder="Brief job description"
                    autoComplete="off"
                    {...register('job_description', {
                      required: 'Job description is required.',
                    })}
                    className={`${
                      errors.job_description
                        ? 'input-error form-control'
                        : 'form-control'
                    }`}
                  />
                  {errors.job_description && (
                    <p className="errorMsg">{errors.job_description.message}</p>
                  )}
                </Form.Group>
              </div>
            </div>
          </div>
        </div>
        <div className={'col-md-12 text-right pb-2 px-0'}>
          <Button className={'next_btn'} variant="primary" type="submit">
            Next
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default Nominee;
