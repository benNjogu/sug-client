import { useState, useEffect } from 'react';

import Category from '../../components/category';
import { application_categories } from '../../data/data';
import './application.style.css';

const Application = () => {
  const [selectedCategory, setSelectedCategory] = useState(1);

  const handleSelectedCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="size row">
      <div className="col-3 steps">
        <Category
          categories={application_categories}
          selectedItem={selectedCategory}
          onItemSelect={handleSelectedCategory}
          badge={false}
        />
      </div>
      <div className="col steps">
        {selectedCategory === 1 ? (
          <div className="row">
            <div className="col-6">
              <fieldset>
                <legend class="col-form-legend">Select type of training</legend>
                <div class="form-check">
                  <label for="" class="form-check-label">
                    <input
                      type="radio"
                      name="type"
                      id=""
                      class="form-check-input"
                      value="yes"
                    />
                    Local
                  </label>
                </div>
                <div class="form-check">
                  <label for="" class="form-check-label">
                    <input
                      type="radio"
                      name="type"
                      id=""
                      class="form-check-input"
                      value="no"
                    />
                    Overseas
                  </label>
                </div>
                <div class="form-check">
                  <label for="" class="form-check-label">
                    <input
                      type="radio"
                      name="type"
                      id=""
                      class="form-check-input"
                      value="no"
                    />
                    Distance learning
                  </label>
                </div>
              </fieldset>
            </div>
            <div className="col-6">
              <fieldset>
                <legend class="col-form-legend">
                  Select number of participants,
                </legend>
                <div class="form-check">
                  <label for="" class="form-check-label">
                    <input
                      type="radio"
                      name="amount"
                      id=""
                      class="form-check-input"
                      value="yes"
                    />
                    One
                  </label>
                </div>
                <div class="form-check">
                  <label for="" class="form-check-label">
                    <input
                      type="radio"
                      name="amount"
                      id=""
                      class="form-check-input"
                      value="no"
                    />
                    Group
                  </label>
                </div>
              </fieldset>
            </div>
          </div>
        ) : selectedCategory === 2 ? (
          <div className="col">
            <div class="form-row">
              <div class="col-md-3 form-group">
                <label for="sex">Sex:</label>
                <div>
                  <div class="form-check form-check-inline">
                    <input
                      type="radio"
                      class="form-check-input"
                      name="sex"
                      id="sex-male"
                      value="male"
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
                    />
                    <label for="sex-female" class="form-check-label">
                      Female
                    </label>
                  </div>
                </div>
              </div>
              <div class="col-md-3 form-group">
                <label for="age">Age:</label>
                <input type="number" name="age" class="form-control" id="age" />
              </div>
              <div class="col-md-6 form-group">
                <label for="phone">Phone:</label>
                <input
                  type="tel"
                  name="phone"
                  class="form-control"
                  id="phone"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-6 form-group">
                <label for="name">Name:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  class="form-control"
                  placeholder="Firstname Lastname"
                />
              </div>
              <div class="col-md-6 form-group">
                <label for="id">ID or Passport:</label>
                <input
                  type="text"
                  name="id"
                  id="id"
                  class="form-control"
                  placeholder="Attachment"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-12 form-group">
                <label for="qualification">Qualifications:</label>
                <input
                  type="text"
                  name="qualification"
                  id="qualification"
                  class="form-control"
                  placeholder="Qualifications"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-12 form-group">
                <label for="level">Job level:</label>
                <div className="col-12">
                  <div class="form-check form-check-inline col-3">
                    <input
                      type="radio"
                      class="form-check-input"
                      name="level"
                      id="top"
                      value="top"
                    />
                    <label for="top" class="form-check-label">
                      Top Management
                    </label>
                  </div>
                  <div class="form-check form-check-inline col-3">
                    <input
                      type="radio"
                      class="form-check-input"
                      name="level"
                      id="middle"
                      value="middle"
                    />
                    <label for="middle" class="form-check-label">
                      Middle Level Management
                    </label>
                  </div>
                  <div class="form-check form-check-inline col-3">
                    <input
                      type="radio"
                      class="form-check-input"
                      name="level"
                      id="supervisor"
                      value="supervisor"
                    />
                    <label for="supervisor" class="form-check-label">
                      supervisory Level
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      type="radio"
                      class="form-check-input"
                      name="level"
                      id="operatives"
                      value="operatives"
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
                      class="form-check-input"
                      name="level"
                      id="other"
                      value="other"
                    />
                    <label for="other" class="form-check-label">
                      Other
                    </label>
                  </div>
                  <div class="col-12">
                    <input
                      type="text"
                      name="level"
                      id="specify"
                      class="form-control"
                      placeholder="Specify"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-12 form-group">
                <label for="description">Job description:</label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  class="form-control"
                  placeholder="Brief job description"
                />
              </div>
            </div>
          </div>
        ) : selectedCategory === 3 ? (
          <div className="col">
            <div class="form-row">
              <div class="col-md-6 form-group">
                <label for="title">Course title:</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  class="form-control"
                  placeholder="Certified Ethical Hacking"
                />
              </div>
              <div class="col-md-6 form-group">
                <label for="provider">Training provider:</label>
                <input
                  type="text"
                  name="provider"
                  id="provider"
                  class="form-control"
                  placeholder="Keytech technologies"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-9 form-group">
                <label for="venue">Specific course venue:</label>
                <input
                  type="text"
                  name="venue"
                  class="form-control"
                  id="venue"
                  placeholder="Venue"
                />
              </div>
              <div class="col-md-3 form-group">
                <label for="age">Country:</label>
                <input
                  type="text"
                  name="country"
                  class="form-control"
                  id="country"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-12 form-group">
                {/* <label for="level">Job level:</label> */}
                <fieldset>
                  <legend class="col-form-legend">Course objectives</legend>
                  <div class="form-group">
                    <label for="message" class="sr-only">
                      message:
                    </label>
                    <textarea
                      class="form-control"
                      id="message"
                      rows="6"
                    ></textarea>
                  </div>
                </fieldset>
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-4 form-group">
                <label for="from">Start date:</label>
                <input
                  type="date"
                  name="from"
                  id="from"
                  class="form-control"
                  placeholder="dd/mm/yyyy"
                />
              </div>
              <div class="col-md-4 form-group">
                <label for="to">End date:</label>
                <input
                  type="date"
                  name="to"
                  id="to"
                  class="form-control"
                  placeholder="dd/mm/yyyy"
                />
              </div>
              <div class="col-md-4 form-group">
                <label for="contents">Course contents and timetable:</label>
                <input
                  type="text"
                  name="contents"
                  id="contents"
                  class="form-control"
                  placeholder="Attachment"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-12 form-group">
                <label for="admission">
                  Course proposal or admission letter from the training
                  provider:
                </label>
                <input
                  type="text"
                  name="admission"
                  id="admission"
                  class="form-control"
                  placeholder="Attachment"
                />
              </div>
            </div>
          </div>
        ) : selectedCategory === 4 ? (
          <div>
            <div class="form-row">
              <div class="col-md-3 form-group">
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
                    />
                    <label for="available-no" class="form-check-label">
                      No
                    </label>
                  </div>
                </div>
              </div>
              <div class="col-md-4 form-group">
                <label for="employment_date">Date of employment:</label>
                <input
                  type="date"
                  name="employment_date"
                  id="employment_date"
                  class="form-control"
                  placeholder="dd/mm/yyyy"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-12 form-group">
                <label for="local_availability">
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
                    />
                    <label for="relationship-yes" class="form-check-label">
                      Yes
                    </label>
                  </div>
                </div>
              </div>
              <div class="col-md-12 form-group">
                <input
                  type="text"
                  name="trainer_employer"
                  id="trainer_employer"
                  class="form-control"
                  placeholder="If yes, which organization"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-12 form-group">
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
                    />
                    <label for="funds-yes" class="form-check-label">
                      Yes
                    </label>
                  </div>
                </div>
              </div>
              <div class="col-md-12 form-group">
                <input
                  type="text"
                  name="other_funds"
                  id="other_funds"
                  class="form-control"
                  placeholder="If yes, which organization"
                />
              </div>
            </div>
          </div>
        ) : selectedCategory === 5 ? (
          <div>
            <div class="form-row">
              <div class="col-md-3 form-group">
                <label for="tuition">Tuition fees:</label>
              </div>
              <div class="col-md-3 form-group">
                <input
                  type="number"
                  name="tuition"
                  class="form-control"
                  id="tuition_fees"
                  placeholder="0.00"
                />
              </div>
              <div class="col-md-3 form-group">
                <input
                  type="number"
                  name="tuition"
                  class="form-control"
                  id="tuition_fees"
                  placeholder="attachment"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-3 form-group">
                <label for="examination">Examination fees:</label>
              </div>
              <div class="col-md-3 form-group">
                <input
                  type="number"
                  name="examination"
                  class="form-control"
                  id="examination_fees"
                  placeholder="0.00"
                />
              </div>
              <div class="col-md-3 form-group">
                <input
                  type="number"
                  name="tuition"
                  class="form-control"
                  id="tuition_fees"
                  placeholder="attachment"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-3 form-group">
                <label for="books">
                  Cost of recommended books and study material:
                </label>
              </div>
              <div class="col-md-3 form-group">
                <input
                  type="number"
                  name="books"
                  class="form-control"
                  id="books_fees"
                  placeholder="0.00"
                />
              </div>
              <div class="col-md-3 form-group">
                <input
                  type="number"
                  name="tuition"
                  class="form-control"
                  id="tuition_fees"
                  placeholder="attachment"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-3 form-group">
                <label for="examination">Accomodation and meals:</label>
              </div>
              <div class="col-md-3 form-group">
                <input
                  type="number"
                  name="accomodation"
                  class="form-control"
                  id="accomodation_fees"
                  placeholder="0.00"
                />
              </div>
              <div class="col-md-3 form-group">
                <input
                  type="number"
                  name="tuition"
                  class="form-control"
                  id="tuition_fees"
                  placeholder="attachment"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-3 form-group">
                <label for="fare">
                  Return economy airfare/bus fare/mileage:
                </label>
              </div>
              <div class="col-md-3 form-group">
                <input
                  type="number"
                  name="fare"
                  class="form-control"
                  id="fare_fees"
                  placeholder="0.00"
                />
              </div>
              <div class="col-md-3 form-group">
                <input
                  type="number"
                  name="tuition"
                  class="form-control"
                  id="tuition_fees"
                  placeholder="attachment"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-3 form-group">
                <label for="others">Others:</label>
              </div>
              <div class="col-md-3 form-group">
                <input
                  type="number"
                  name="others"
                  class="form-control"
                  id="other_fees"
                  placeholder="0.00"
                />
              </div>
              <div class="col-md-3 form-group">
                <input
                  type="number"
                  name="tuition"
                  class="form-control"
                  id="tuition_fees"
                  placeholder="attachment"
                />
              </div>
              <div class="col-md-9 form-group">
                <input
                  type="text"
                  name="others"
                  class="form-control"
                  id="other_fees_notes"
                  placeholder="If others, specify"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-3 form-group">
                <legend for="total">TOTAL COST:</legend>
              </div>
              <div class="col-md-6 form-group">
                <input
                  type="number"
                  name="total"
                  class="form-control"
                  id="total"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
        ) : selectedCategory === 6 ? (
          <div>
            <legend className="text-danger">Certify and submit</legend>
            <div class="form-row">
              <div class="col-md-12 form-group">
                <div class="form-group form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="declaration"
                  />
                  <label class="form-check-label" for="declaration">
                    I hereby declare that the information here given is true to
                    the best of my knowledge.{' '}
                    <span className="text-danger">
                      I understand that checking the box will apply as my
                      signature to this form!
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-12 form-group">
                <input
                  type="text"
                  name="name_hr"
                  class="form-control"
                  id="name_hr"
                  placeholder="Firstname Lastname"
                />
              </div>
              <div class="col-md-3 form-group">
                <button className="btn-primary btn-sm">Submit</button>
              </div>
            </div>
          </div>
        ) : (
          <div>end</div>
        )}
      </div>
    </div>
  );
};

export default Application;
