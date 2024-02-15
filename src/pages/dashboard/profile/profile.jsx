import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import DefaultLayout from '../../../components/default-layout/default-layout.component';

//get stylesheet
import '../../../components/application/styles/form.styles.css';

const Profile = () => {
  const [loading, setLoading] = useState(false);

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
      console.log(data)

      setLoading(false);
    }, 500);
  };

  return (
    <DefaultLayout>
      <Form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        {loading && (
          <div className="spinner">
            <div className="spinner-border" role="status" />
          </div>
        )}
        <div class="form-row">
          <legend className="text-info">Profile Details.</legend>
          <div class="col-md-4 form-group">
            <label for="name">Name of the organization:</label>
            <input
              type="text"
              name="name"
              id="name"
              class="form-control"
              placeholder="Keytech solutions"
              readOnly
            />
          </div>
          <div class="col-md-4 form-group">
            <label for="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              class="form-control"
              placeholder="organization@domain.com"
              readOnly
            />
          </div>
          <div class="col-md-4 form-group">
            <label for="regno">Levy Registration Number:</label>
            <input
              type="text"
              name="regno"
              id="regno"
              class="form-control"
              placeholder="ABCD1234"
              readOnly
            />
          </div>
        </div>
        <div class="form-row">
          <div class="col-md-3 form-group">
            <label for="address">Town:</label>
            <input
              type="text"
              name="address"
              id="address"
              class="form-control"
              placeholder="Nairobi"
              {...register('town', {
                required: 'Town is required.',
              })}
              className={`${
                errors.town ? 'input-error form-control' : 'form-control'
              }`}
            />
            {errors.town && <p className="errorMsg">{errors.town.message}</p>}
          </div>
          <div class="col-md-3 form-group">
            <label for="address">Street:</label>
            <input
              type="text"
              name="address"
              id="address"
              class="form-control"
              placeholder="1234 Grand Avenue"
              {...register('street', {
                required: 'Street is required.',
              })}
              className={`${
                errors.street ? 'input-error form-control' : 'form-control'
              }`}
            />
            {errors.street && (
              <p className="errorMsg">{errors.street.message}</p>
            )}
          </div>
          <div class="col-md-3 form-group">
            <label for="apartment">Building:</label>
            <input
              type="text"
              name="apartment"
              id="apartment"
              class="form-control"
              placeholder="Kenda House"
              {...register('building', {
                required: 'Building is required.',
              })}
              className={`${
                errors.building ? 'input-error form-control' : 'form-control'
              }`}
            />
            {errors.building && (
              <p className="errorMsg">{errors.building.message}</p>
            )}
          </div>
          <div class="col-md-3 form-group">
            <label for="floor">Floor:</label>
            <input
              type="text"
              name="apartment"
              id="apartment"
              class="form-control"
              placeholder="2nd Floor"
              {...register('floor', {
                required: 'Floor is required.',
              })}
              className={`${
                errors.floor ? 'input-error form-control' : 'form-control'
              }`}
            />
            {errors.floor && <p className="errorMsg">{errors.floor.message}</p>}
          </div>
        </div>
        <div class="form-row">
          <div class="col-md-6 form-group">
            <label for="box">P.O. Box:</label>
            <input
              type="text"
              class="form-control"
              name="box"
              id="box"
              placeholder="49 Maragua"
              {...register('box', {
                required: 'Box is required.',
              })}
              className={`${
                errors.box ? 'input-error form-control' : 'form-control'
              }`}
            />
            {errors.box && <p className="errorMsg">{errors.box.message}</p>}
          </div>
          <div class="col-md-2 form-group">
            <label for="code">Code:</label>
            <input
              type="number"
              name="code"
              id="code"
              class="form-control"
              placeholder="102005"
              {...register('code', {
                required: 'Code is required.',
              })}
              className={`${
                errors.code ? 'input-error form-control' : 'form-control'
              }`}
            />
            {errors.code && <p className="errorMsg">{errors.code.message}</p>}
          </div>
          <div class="col-md-4 form-group">
            <label for="phone">Phone/Fax Number:</label>
            <input
              type="text"
              name="phone"
              id="phone"
              class="form-control"
              placeholder="+254 745 580 333"
              {...register('phone', {
                required: 'Phone/Fax is required.',
              })}
              className={`${
                errors.phone ? 'input-error form-control' : 'form-control'
              }`}
            />
            {errors.phone && <p className="errorMsg">{errors.phone.message}</p>}
          </div>
        </div>
        <button
          type="submit"
          class="btn btn-outline-primary btn-lg d-block ml-auto"
        >
          Save
        </button>
      </Form>
    </DefaultLayout>
  );
};

export default Profile;
