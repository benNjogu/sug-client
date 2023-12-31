import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { House } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './styles/form.styles.css';
import { RegisterUser } from '../../redux/slices/nominee';
import HomepageBtn from './homepage-btn';

const Nominee = ({ nominee_id, prevPage }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [special, setSpecial] = useState(false);
  // let data = user?.users ? user.users[0] : user;

  // console.log(nominee_id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // defaultValues: {
    //   first_name: data.first_name,
    //   last_name: data.last_name,
    //   sex: data.sex,
    //   age: data.age,
    //   phone: data.phone,
    //   passport: data.passport,
    //   qualifications: data.qualifications,
    //   job_level: data.job_level,
    //   other_specification: data.other_specification,
    //   job_description: data.job_description,
    // },
  });

  const handleOther = () => {
    setSpecial(true);
  };

  const handleOtherLevels = () => {
    setSpecial(false);
  };

  const handleHomePage = () => {
    if (prevPage === 'select') navigate('/app/new-application');
    else navigate('/app', { state: { prevPage: 'nominee' } });
  };

  const onSubmit = (data) => {
    data = { ...data, passport: 'passport.jpg' };
    console.log(data);
    // let users = [];
    // users.push(data);
    dispatch(RegisterUser(data));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="col-md-12">
        <div className="row" style={{ marginBottom: 12 + 'px' }}>
          <div className="col-md-9 mr-auto">
            <legend className="text-info">
              Particulars of the nominee.{' '}
              <span className="font-italic">
                attach documents where required
              </span>
            </legend>
          </div>
          <div className="col-md-3 text-right" style={{ paddingTop: 8 + 'px' }}>
            <HomepageBtn onClickHome={handleHomePage} prevPage={prevPage} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
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
                        value="M"
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
                        value="F"
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
              <div class="col-md-3">
                <Form.Group controlId="idNumber">
                  <label for="idNumber">National id number:</label>
                  <input
                    type="number"
                    name="idNumber"
                    id="idNumber"
                    autoComplete="off"
                    {...register('idNumber', {
                      required: 'IdNumber is required.',
                      minLength: {
                        value: 8,
                        message: 'IdNumber should have at-least 8 characters.',
                      },
                    })}
                    className={`${
                      errors.idNumber
                        ? 'input-error form-control'
                        : 'form-control'
                    }`}
                  />
                  {errors.idNumber && (
                    <p className="errorMsg">{errors.idNumber.message}</p>
                  )}
                </Form.Group>
              </div>
              <div class="col-md-3">
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
              <div class="col-md-3">
                <Form.Group controlId="passport">
                  <label for="id">Passport photo:</label>
                  <div>
                    <input
                      type="file"
                      id="passport"
                      name="image"
                      autoComplete="off"
                      {...register('passport', {
                        required: 'Passport/id is required.',
                      })}
                      className={`${errors.passport ? 'input-error' : ''}`}
                    />
                  </div>
                  {errors.passport && (
                    <p className="errorMsg">{errors.passport.message}</p>
                  )}
                </Form.Group>
              </div>
              {/*<div class="col-md-3">
                <Form.Group controlId="passport">
                  <label for="id">Passport photo:</label>
                  <div>
                    <input
                      type="file"
                      id="passport"
                      name="image"
                      autoComplete="off"
                      {...register('passport', {
                        required: 'Passport/id is required.',
                      })}
                      className={`${errors.passport ? 'input-error' : ''}`}
                    />
                  </div>
                  {errors.passport && (
                    <p className="errorMsg">{errors.passport.message}</p>
                  )}
                </Form.Group>
              </div>*/}
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
          <Button variant="primary" type="submit">
            ADD
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default Nominee;
