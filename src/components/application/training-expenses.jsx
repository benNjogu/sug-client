import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const TrainingExpenses = ({ user, updateUser }) => {
  const navigate = useNavigate();

  const [other_fees, setOther_fees] = useState(
    user.other_fees === undefined ? '' : user.other_fees
  );
  const [tuition_fees, setTuition_fees] = useState(
    user.tuition_fees === undefined ? '' : user.tuition_fees
  );
  const [examination_fees, setExamination_fees] = useState(
    user.examination_fees === undefined ? '' : user.examination_fees
  );
  const [books_fees, setBooks_fees] = useState(
    user.books_fees === undefined ? '' : user.books_fees
  );
  const [accomodation_fees, setAccomodation_fees] = useState(
    user.accomodation_fees === undefined ? '' : user.accomodation_fees
  );
  const [fare_fees, setFare_fees] = useState(
    user.fare_fees === undefined ? '' : user.fare_fees
  );
  const [sum, setSum] = useState(user.sum === undefined ? '' : user.sum);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tuition_fees: user.tuition_fees,
      examination_fees: user.examination_fees,
      books_fees: user.books_fees,
      accomodation_fees: user.accomodation_fees,
      fare_fees: user.fare_fees,
      other_fees: user.other_fees,
      other_fees_notes: user.other_fees_notes,
      training_expenses_support_doc: user.training_expenses_support_doc,
      total_cost: user.total_cost,
    },
  });

  const handleChange = (e) => {
    setOther_fees(e.target.value);
    setSum(e.target.value);
  };

  useEffect(() => {
    let total =
      Number(tuition_fees) +
      Number(examination_fees) +
      Number(books_fees) +
      Number(accomodation_fees) +
      Number(fare_fees) +
      Number(other_fees);
    setSum(total);
  }, [
    tuition_fees,
    examination_fees,
    books_fees,
    accomodation_fees,
    fare_fees,
    other_fees,
  ]);

  const onChangeTuitionFee = (e) => {
    setTuition_fees(e.target.value);
  };

  const onChangeExaminationFee = (e) => {
    setExamination_fees(e.target.value);
  };

  const onChangeBooksFees = (e) => {
    setBooks_fees(e.target.value);
  };

  const onChangeFareFees = (e) => {
    setFare_fees(e.target.value);
  };

  const onChangeAccomodationFees = (e) => {
    setAccomodation_fees(e.target.value);
  };

  const onSubmit = (data) => {
    if (other_fees !== '') {
      data = { ...data, total_cost: sum, other_fees };
      console.log(data);
    } else {
      data = { ...data, other_fees, total_cost: sum, other_fees_notes: '' };
      console.log(data);
    }

    updateUser({ ...data });
    console.log('tex', user);
    navigate('/app/new-application/declaration');
  };

  return (
    <Form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <div className="row form_div">
        <div className="col-md-12">
          <legend className="text-info">
            Training expenses.{' '}
            <span className="font-italic">
              please indicate costs with suporting document(s)
            </span>
          </legend>
          <div class="form-row">
            <div class="col-md-4">
              <label for="tuition_fees">Tuition fees:</label>
            </div>
            <div class="col-md-8">
              <Form.Group controlId="tuition-fees">
                <input
                  type="number"
                  name="tuition_fees"
                  id="tuition_fees"
                  placeholder="0.00"
                  autoComplete="off"
                  value={tuition_fees}
                  step="0.01"
                  {...register('tuition_fees', {
                    required: 'Tuition fees required.',
                  })}
                  onChange={onChangeTuitionFee}
                  className={`${
                    errors.tuition_fees
                      ? 'input-error form-control'
                      : 'form-control'
                  }`}
                />
                {errors.tuition_fees && (
                  <p className="errorMsg">{errors.tuition_fees.message}</p>
                )}
              </Form.Group>
            </div>
          </div>
          <div class="form-row">
            <div class="col-md-4 ">
              <label for="examination">Examination fees:</label>
            </div>
            <div class="col-md-8 ">
              <Form.Group controlId="examination_fees">
                <input
                  type="number"
                  name="examination_fees"
                  class="form-control"
                  id="examination_fees"
                  placeholder="0.00"
                  autoComplete="off"
                  step="0.01"
                  value={examination_fees}
                  {...register('examination_fees', {
                    required: 'Examination fees required.',
                  })}
                  className={`${
                    errors.examination_fees
                      ? 'input-error form-control'
                      : 'form-control'
                  }`}
                  onChange={onChangeExaminationFee}
                />
                {errors.examination_fees && (
                  <p className="errorMsg">{errors.examination_fees.message}</p>
                )}
              </Form.Group>
            </div>
          </div>
          <div class="form-row">
            <div class="col-md-4">
              <label for="books">
                Cost of recommended books and study material:
              </label>
            </div>
            <div class="col-md-8">
              <Form.Group controlId="books_fees">
                <input
                  type="number"
                  name="books"
                  class="form-control"
                  id="books_fees"
                  placeholder="0.00"
                  autoComplete="off"
                  value={books_fees}
                  step="0.01"
                  {...register('books_fees', {
                    required: 'Study material fees required.',
                  })}
                  className={`${
                    errors.books_fees
                      ? 'input-error form-control'
                      : 'form-control'
                  }`}
                  onChange={onChangeBooksFees}
                />
                {errors.books_fees && (
                  <p className="errorMsg">{errors.books_fees.message}</p>
                )}
              </Form.Group>
            </div>
          </div>
          <div class="form-row">
            <div class="col-md-4">
              <label for="examination">Accomodation and meals:</label>
            </div>
            <div class="col-md-8">
              <Form.Group controlId="accomodation_fees">
                <input
                  type="number"
                  name="accomodation"
                  class="form-control"
                  id="accomodation_fees"
                  placeholder="0.00"
                  autoComplete="off"
                  value={accomodation_fees}
                  step="0.01"
                  {...register('accomodation_fees', {
                    required: 'Accomodation fees required.',
                  })}
                  className={`${
                    errors.accomodation_fees
                      ? 'input-error form-control'
                      : 'form-control'
                  }`}
                  onChange={onChangeAccomodationFees}
                />
                {errors.accomodation_fees && (
                  <p className="errorMsg">{errors.accomodation_fees.message}</p>
                )}
              </Form.Group>
            </div>
          </div>
          <div class="form-row">
            <div class="col-md-4">
              <label for="fare">Return economy airfare/bus fare/mileage:</label>
            </div>
            <div class="col-md-8">
              <Form.Group controlId="fare_fees">
                <input
                  type="number"
                  name="fare"
                  class="form-control"
                  id="fare_fees"
                  placeholder="0.00"
                  autoComplete="off"
                  value={fare_fees}
                  step="0.01"
                  {...register('fare_fees', {
                    required: 'Fare fees required.',
                  })}
                  className={`${
                    errors.fare_fees
                      ? 'input-error form-control'
                      : 'form-control'
                  }`}
                  onChange={onChangeFareFees}
                />
                {errors.fare_fees && (
                  <p className="errorMsg">{errors.fare_fees.message}</p>
                )}
              </Form.Group>
            </div>
          </div>
          <div class="form-row">
            <div class="col-md-4 form-group">
              <label for="others">Others:</label>
            </div>
            <div class="col-md-8">
              <Form.Group controlId="other_fees">
                <input
                  type="number"
                  id="other_fees"
                  name="other_fees"
                  value={other_fees}
                  placeholder="0.00"
                  autoComplete="off"
                  step="0.01"
                  className="form-control"
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
            {other_fees > 0 && (
              <div class="col-md-12 form-group">
                <input
                  type="text"
                  name="others"
                  class="form-control"
                  id="other_fees_notes"
                  placeholder="If others, specify"
                  autoComplete="off"
                  {...register('other_fees_notes', {
                    required: 'Specify!',
                  })}
                  className={`${
                    errors.other_fees_notes
                      ? 'input-error form-control'
                      : 'form-control'
                  }`}
                />
                {errors.other_fees_notes && (
                  <p className="errorMsg">{errors.other_fees_notes.message}</p>
                )}
              </div>
            )}
          </div>
          <div class="form-row">
            <div class="col-md-4 form-group">
              <label for="others">Attach support document:</label>
            </div>
            <div class="col-md-8 form-group">
              <div>
                <input
                  type="file"
                  id="customFile"
                  autoComplete="off"
                  {...register('training_expenses_support_doc', {
                    required: 'Support document required.',
                  })}
                  className={`${
                    errors.training_expenses_support_doc ? 'input-error' : ''
                  }`}
                />
                {errors.training_expenses_support_doc && (
                  <p className="errorMsg">
                    {errors.training_expenses_support_doc.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="col-md-3 form-group">
              <legend for="total">TOTAL COST:</legend>
            </div>
            <div class="col-md-9 form-group">
              <input
                {...register('total_cost')}
                type="number"
                name="total_cost"
                class="form-control"
                id="total_cost"
                value={sum}
                placeholder="0.00"
                disabled
                step="0.01"
              />
            </div>
          </div>
        </div>
        <div className={'col-md-12 text-right pb-2 px-0'}>
          <Button variant="primary" type="submit">
            Next
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default TrainingExpenses;
