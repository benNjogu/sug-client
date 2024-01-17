import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import csc from 'country-state-city';

import './styles/form.styles.css';
import { constants } from '../../data/constants';

const CourseDetails = ({ user, updateUser }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const [dates, setDates] = useState([]);
  const [error, setError] = useState(true);

  let applicationSpecs = useSelector(
    (state) => state.application.applicationSpecs
  );

  let groups = useSelector((state) => state.cell.groups);
  let reversedArray = [];
  groups.forEach((element) => {
    reversedArray.unshift(element);
  });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      course_title: user.course_title,
      training_provider: user.training_provider,
      venue: user.venue,
      country: user.country,
      state: user.state,
      city: user.city,
      course_objectives: user.course_objectives,
      start_date: user.start_date,
      end_date: user.end_date,
    },
  });

  useEffect(() => {
    let initial_dates = [];
    for (let i = 0; i < groups.length; i++) {
      let key1 = 'start_date_' + groups[i].g_id;
      let key2 = 'end_date_' + groups[i].g_id;
      initial_dates.push({ group: groups[i].g_id, [key1]: '', [key2]: '' });
    }
    if (initial_dates !== null) setDates(initial_dates);
  }, []);

  useEffect(() => {
    const getCountries = async () => {
      try {
        setIsLoading(true);
        const result = csc.getAllCountries();
        let allCountries = [];
        allCountries = result?.map(({ isoCode, name }) => ({
          isoCode,
          name,
        }));
        const [{ isoCode: firstCountry } = {}] = allCountries;
        setCountries(allCountries);
        setSelectedCountry(firstCountry);
        setIsLoading(false);
      } catch (error) {
        setCountries([]);
        setIsLoading(false);
      }
    };

    getCountries();
  }, []);

  useEffect(() => {
    const getStates = async () => {
      try {
        const result = csc.getStatesOfCountry(selectedCountry);
        let allStates = [];
        allStates = result?.map(({ isoCode, name }) => ({
          isoCode,
          name,
        }));
        const [{ isoCode: firstState = '' } = {}] = allStates;
        setCities([]);
        setSelectedCity('');
        setStates(allStates);
        setSelectedState(firstState);
      } catch (error) {
        setStates([]);
        setCities([]);
        setSelectedCity('');
      }
    };

    getStates();
  }, [selectedCountry]);

  useEffect(() => {
    const getCities = async () => {
      try {
        const result = await csc.getCitiesOfState(
          selectedCountry,
          selectedState
        );
        let allCities = [];
        allCities = result?.map(({ name }) => ({
          name,
        }));
        const [{ name: firstCity = '' } = {}] = allCities;
        setCities(allCities);
        setSelectedCity(firstCity);
      } catch (error) {
        setCities([]);
      }
    };

    getCities();
  }, [selectedState]);

  const handleDate = (event) => {
    for (let i = 0; i < dates.length; i++) {
      let start_date = `start_date_${dates[i].group}`;
      let end_date = `end_date_${dates[i].group}`;

      if (start_date === event.target.id) {
        dates[i]['start_date'] = event.target.value;
        delete dates[i][`${start_date}`];
      } else if (end_date === event.target.id) {
        dates[i]['end_date'] = event.target.value;
        delete dates[i][`${end_date}`];
      }
    }
    // selected_dates[event.target.id] = event.target.value;
    setError(false);
  };

  const onSubmit = (data) => {
    updateUser({
      ...data,
      country: selectedCountry,
      state: selectedState,
      city: selectedCity,
      dates: dates,
    });

    //TODO: Check if group or one person then show start and end date-pickers accordingly
    applicationSpecs.typeOfTraining === constants.OVER_SEAS
      ? navigate('/app/new-application/overseas')
      : navigate('/app/new-application/training-expenses');
  };

  return (
    <div className="form-container">
      <Form className="row" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-md-12">
          <div className="row form_div">
            <div className="col-md-12">
              <legend className="text-info">
                Details of the course applied for.{' '}
                <span className="font-italic">
                  all fields and attachments required
                </span>
              </legend>
              <div class="form-row">
                <div class="col-md-6">
                  <Form.Group controlId="course_title">
                    <label for="course_title">Course title:</label>
                    <input
                      type="text"
                      name="course_title"
                      id="title"
                      placeholder="Certified Ethical Hacking"
                      autoComplete="off"
                      {...register('course_title', {
                        required: 'Course title is required.',
                      })}
                      className={`${
                        errors.course_title
                          ? 'input-error form-control'
                          : 'form-control'
                      }`}
                    />
                    {errors.course_title && (
                      <p className="errorMsg">{errors.course_title.message}</p>
                    )}
                  </Form.Group>
                </div>
                <div class="col-md-6">
                  <Form.Group controlId="course_provider">
                    <label for="provider">Training provider:</label>
                    <input
                      type="text"
                      name="training_provider"
                      id="provider"
                      placeholder="Keytech technologies"
                      autoComplete="off"
                      {...register('training_provider', {
                        required: 'Training provider is required.',
                      })}
                      className={`${
                        errors.training_provider
                          ? 'input-error form-control'
                          : 'form-control'
                      }`}
                    />
                    {errors.training_provider && (
                      <p className="errorMsg">
                        {errors.training_provider.message}
                      </p>
                    )}
                  </Form.Group>
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-12 form-group">
                  <Form.Group controlId="course_venue">
                    <label for="venue">Specific course venue:</label>
                    <input
                      type="text"
                      name="venue"
                      id="venue"
                      placeholder="Venue"
                      autoComplete="off"
                      {...register('venue', {
                        required: 'Venue is required.',
                      })}
                      className={`${
                        errors.venue
                          ? 'input-error form-control'
                          : 'form-control'
                      }`}
                    />
                    {errors.venue && (
                      <p className="errorMsg">{errors.venue.message}</p>
                    )}
                  </Form.Group>
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-4">
                  <Form.Group controlId="country">
                    {isLoading && (
                      <p className="loading">
                        Loading countries. Please wait...
                      </p>
                    )}
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      as="select"
                      name="country"
                      value={selectedCountry}
                      onChange={(event) =>
                        setSelectedCountry(event.target.value)
                      }
                    >
                      {countries.map(({ isoCode, name }) => (
                        <option value={isoCode} key={isoCode}>
                          {name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </div>
                <div class="col-md-4">
                  <Form.Group controlId="state">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      as="select"
                      name="state"
                      value={selectedState}
                      onChange={(event) => setSelectedState(event.target.value)}
                    >
                      {states.length > 0 ? (
                        states.map(({ isoCode, name }) => (
                          <option value={isoCode} key={isoCode}>
                            {name}
                          </option>
                        ))
                      ) : (
                        <option value="" key="">
                          No state found
                        </option>
                      )}
                    </Form.Control>
                  </Form.Group>
                </div>
                <div class="col-md-4">
                  <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      as="select"
                      name="city"
                      value={selectedCity}
                      onChange={(event) => setSelectedCity(event.target.value)}
                    >
                      {cities.length > 0 ? (
                        cities.map(({ name }) => (
                          <option value={name} key={name}>
                            {name}
                          </option>
                        ))
                      ) : (
                        <option value="">No cities found</option>
                      )}
                    </Form.Control>
                  </Form.Group>
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-12">
                  <fieldset>
                    <legend class="col-form-legend">Course objectives</legend>
                    <Form.Group controlId="course_objectives">
                      <label for="message" class="sr-only">
                        message:
                      </label>
                      <textarea
                        id="message"
                        rows="6"
                        autoComplete="off"
                        {...register('course_objectives', {
                          required: 'Course objectives are required.',
                        })}
                        className={`${
                          errors.course_objectives
                            ? 'input-error form-control'
                            : 'form-control'
                        }`}
                      />
                      {errors.course_objectives && (
                        <p className="errorMsg">
                          {errors.course_objectives.message}
                        </p>
                      )}
                    </Form.Group>
                  </fieldset>
                </div>
              </div>
              {reversedArray.map((i) => (
                <>
                  <legend>Group {i.g_id} Dates.</legend>
                  <div key={i} class="form-row">
                    <div class="col-md-6">
                      <Form.Group controlId="start_date">
                        <label for="from">Start date:</label>
                        <input
                          type="date"
                          name={`start_date_${i.g_id}`}
                          id={`start_date_${i.g_id}`}
                          placeholder="mm/dd/yyyy"
                          autoComplete="off"
                          onChange={handleDate}
                          className={`${
                            error ? 'input-error form-control' : 'form-control'
                          }`}
                        />
                        {error && (
                          <p className="errorMsg">
                            {'Start date is required.'}
                          </p>
                        )}
                      </Form.Group>
                    </div>
                    <div class="col-md-6 form-group">
                      <Form.Group controlId="end_date">
                        <label for="to">End date:</label>
                        <input
                          type="date"
                          name={`end_date_${i.g_id}`}
                          id={`end_date_${i.g_id}`}
                          class="form-control"
                          placeholder="mm/dd/yyyy"
                          autoComplete="off"
                          onChange={handleDate}
                          className={`${
                            error ? 'input-error form-control' : 'form-control'
                          }`}
                        />
                        {error && (
                          <p className="errorMsg">{'End date is required.'}</p>
                        )}
                      </Form.Group>
                    </div>
                  </div>
                </>
              ))}
              <div class="form-row">
                <div class="col-md-6">
                  <Form.Group controlId="admission_letter">
                    <label for="admission">
                      Course proposal or admission letter from the training
                      provider:
                    </label>
                    <div>
                      <input
                        type="file"
                        id="customFile"
                        autoComplete="off"
                        {...register('admission_letter', {
                          required:
                            'Course proposal/admission letter required.',
                        })}
                        className={`${
                          errors.admission_letter ? 'input-error' : ''
                        }`}
                      />
                    </div>
                    {errors.admission_letter && (
                      <p className="errorMsg">
                        {errors.admission_letter.message}
                      </p>
                    )}
                  </Form.Group>
                </div>

                <div class="col-md-6">
                  <Form.Group controlId="timetable">
                    <label for="contents">Course contents and timetable:</label>
                    <div>
                      <input
                        type="file"
                        id="customFile"
                        autoComplete="off"
                        {...register('timetable', {
                          required: 'Course content/timetable is required.',
                        })}
                        className={`${errors.timetable ? 'input-error' : ''}`}
                      />
                    </div>
                    {errors.timetable && (
                      <p className="errorMsg">{errors.timetable.message}</p>
                    )}
                  </Form.Group>
                </div>
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
    </div>
  );
};

export default CourseDetails;
