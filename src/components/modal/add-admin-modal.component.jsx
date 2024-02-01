import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';

import '../application/styles/form.styles.css';

const AddAdminModal = ({ handleClose, handleAddAdmin, options }) => {
  const [level, setLevel] = useState('All');
  const [levelErrors, setLevelErrors] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const handleSelectChange = (e) => {
    e.preventDefault();
    setLevel(e.target.value);
  };

  const onSubmit = (data) => {
    if (level === 'All') {
      setLevelErrors(true);
      console.log(levelErrors);
    } else {
      data = { ...data, level };
      console.log(data);
      handleClose();
      handleAddAdmin(data);
    }
  };

  return (
    <Form className="row" onSubmit={handleSubmit(onSubmit)}>
      <div className="col-md-12 my-2">
        <label for="type">Level of administration:</label>
        <select
          class="form-control form-control-md"
          onChange={handleSelectChange}
        >
          {options.map((o) => (
            <option>{o}</option>
          ))}
        </select>
        {level === 'All' && <p className="errorMsg">{'Select Admin level'}</p>}
      </div>
      <div class="col-md-12">
        <Form.Group controlId="sex">
          <label for="sex">Gender:</label>
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
          {errors.sex && <p className="errorMsg">{errors.sex.message}</p>}
        </Form.Group>
      </div>
      <div class="col-md-12 form-group">
        <label for="name">Name of admin:</label>
        <input
          type="text"
          name="name"
          id="name"
          class="form-control"
          placeholder="FirstName LastName"
          {...register('name', {
            required: 'Admin name is required.',
          })}
          className={`${
            errors.name ? 'input-error form-control' : 'form-control'
          }`}
        />
        {errors.name && <p className="errorMsg">{errors.name.message}</p>}
      </div>
      <div class="col-md-12 form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          class="form-control"
          placeholder="stuff@nita.go.ke"
          {...register('email', {
            required: 'Email is required.',
          })}
          className={`${
            errors.email ? 'input-error form-control' : 'form-control'
          }`}
        />
        {errors.email && <p className="errorMsg">{errors.email.message}</p>}
      </div>
      <div class="col-md-12 form-group">
        <label for="regno">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          class="form-control"
          placeholder="ABCD1234"
          {...register('password', {
            required: 'Password is required.',
          })}
          className={`${
            errors.password ? 'input-error form-control' : 'form-control'
          }`}
        />
        {errors.password && (
          <p className="errorMsg">{errors.password.message}</p>
        )}
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
            CREATE
          </button>
        </div>
      </div>
    </Form>
  );
};

export default AddAdminModal;
