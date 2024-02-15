import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import DefaultLayout from '../../components/default-layout/default-layout.component';

import Spinner from './../../components/spinner';
import { convertDigitInString } from '../../utils/convertDigitsInString';
//get stylesheet
import '../../components/application/styles/form.styles.css';

const AdminProfile = () => {
  const [loading, setLoading] = useState(false);

  const { user_data } = useSelector((state) => state.auth);
  console.log('ad_d', user_data);
  let { user_name, email, created_on } = user_data;

  created_on = convertDigitInString(created_on.split('T')[0]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // town,
    },
  });

  const onSubmit = (data) => {
    setLoading(true);

    setTimeout(() => {
      console.log(data);

      setLoading(false);
    }, 500);
  };

  return (
    <DefaultLayout>
      <Form className="" onSubmit={handleSubmit(onSubmit)}>
        <Spinner loading={loading} />

        <div class="form-row">
          <legend className="text-info">Profile Details.</legend>
          <div class="col-md-4 form-group">
            <label for="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              class="form-control"
              placeholder="Bernad Njogu"
              value={user_name}
              readOnly
            />
          </div>
        </div>
        <div class="form-row">
          <div class="col-md-4 form-group">
            <label for="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              class="form-control"
              placeholder="admin@domain.com"
              value={email}
              readOnly
            />
          </div>
        </div>
        <div class="form-row">
          <div class="col-md-4 form-group">
            <label for="phone">Phone Number:</label>
            <input
              type="text"
              name="phone"
              id="phone"
              class="form-control"
              placeholder="Enter phone number"
              {...register('phone', {
                required: 'Phone is required.',
              })}
              className={`${
                errors.phone ? 'input-error form-control' : 'form-control'
              }`}
            />
            {errors.phone && <p className="errorMsg">{errors.phone.message}</p>}
          </div>
        </div>
        <div class="form-row">
          <div class="col-md-4 form-group">
            <label for="level">Level:</label>
            <input
              type="level"
              name="level"
              id="level"
              class="form-control"
              placeholder="Admin I"
              readOnly
            />
          </div>
        </div>
        <div class="form-row">
          <div class="col-md-4 form-group">
            <label for="active">Active:</label>
            <input
              type="active"
              name="active"
              id="active"
              class="form-control"
              placeholder="True"
              readOnly
            />
          </div>
        </div>
        <div class="form-row">
          <div class="col-md-4 form-group">
            <label for="created">Created:</label>
            <input
              type="created"
              name="created"
              id="created"
              class="form-control"
              placeholder="Today"
              value={created_on}
              readOnly
            />
          </div>
        </div>
        <div class="form-row">
          <div class="col-md-4 form-group">
            <button
              type="submit"
              class="btn btn-outline-primary btn-lg d-block ml-auto"
            >
              Save
            </button>
          </div>
        </div>
      </Form>
    </DefaultLayout>
  );
};

export default AdminProfile;
