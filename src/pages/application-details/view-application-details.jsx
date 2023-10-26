import { useNavigate } from 'react-router-dom';

import { GroupMemberDetails } from '../application/application';
import Navbar from './../../components/navbar/navbar.component';
import './view-application-details.styles.css';

const ApplicationDetails = () => {
  const AdminBtns = ({ onApprove, onReject }) => {
    return (
      <div style={{ marginTop: '40px', marginBottom: '80px' }}>
        <button
          type="button"
          class="btn btn-danger"
          style={{ marginRight: '40px' }}
          onClick={onReject}
        >
          {'Reject'}
        </button>
        <button
          type="button"
          class="btn btn-success"
          style={{ marginLeft: '40px' }}
          onClick={onApprove}
        >
          {'Approve'}
        </button>
      </div>
    );
  };

  let formArr = [];
  for (let i = 1; i <= 25; i++) {
    formArr.push(<GroupMemberDetails key={i} id={i} />);
  }

  const handleApprove = () => {};
  const handleEscalate = () => {};
  const handleReject = () => {};

  return (
    <div className="parent_div">
      <div className="col-md-12">
        <Navbar />
      </div>
      <div className="main_div">
        <div>
          <div class="form-row">
            <div className="col-12 text-center">
              <legend className="text-info">Particulars of the employer</legend>
            </div>
            <div class="col-md-4 form-group">
              <label for="name">Name of the organization:</label>
              <input
                type="text"
                name="name"
                id="name"
                class="form-control"
                placeholder="Keytech solutions"
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
              />
            </div>
          </div>
          <div class="form-row">
            <div class="col-md-9 form-group">
              <label for="address">Physical Address:</label>
              <input
                type="text"
                name="address"
                id="address"
                class="form-control"
                placeholder="1234 Grand Avenue, Nairobi"
              />
            </div>
            <div class="col-md-3 form-group">
              <label for="apartment">Apartment and floor:</label>
              <input
                type="text"
                name="apartment"
                id="apartment"
                class="form-control"
                placeholder="Kenda House, 2nd Floor"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="col-md-6 form-group">
              <label for="city">Postal Address:</label>
              <input
                type="text"
                class="form-control"
                name="city"
                id="city"
                placeholder="49 Maragua"
              />
            </div>
            <div class="col-md-2 form-group">
              <label for="zip">Code:</label>
              <input
                type="number"
                name="zip"
                id="zip"
                class="form-control"
                placeholder="102005"
              />
            </div>
            <div class="col-md-4 form-group">
              <label for="zip">Phone:</label>
              <input
                type="text"
                name="phone"
                id="phone"
                class="form-control"
                placeholder="+254 745 580 333"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 group_div">
            <legend className="text-info text-center">
              Particulars of the nominees.{' '}
              <span className="font-italic">
                attach documents where required.{' '}
                <span className="text-danger font-italic">minimum of 8</span>
              </span>
            </legend>
            {formArr}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <legend className="text-info text-center">
              Details of the course applied for.{' '}
              <span className="font-italic">
                all fields and attachments required
              </span>
            </legend>
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
                <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    id="customFile"
                  />
                  <label class="custom-file-label" for="customFile">
                    Choose file
                  </label>
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-12 form-group">
                <label for="admission">
                  Course proposal or admission letter from the training
                  provider:
                </label>
                <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    id="customFile"
                  />
                  <label class="custom-file-label" for="customFile">
                    Choose file
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <legend className="text-info text-center">
              Regional/Overseas training additional requirements.
            </legend>
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
        </div>
        <div className="row">
          <div className="col-md-12">
            <legend className="text-info text-center">
              Training expenses.{' '}
              <span className="font-italic">
                please indicate costs with suporting document(s)
              </span>
            </legend>
            <div class="form-row">
              <div class="col-md-4 form-group">
                <label for="tuition">Tuition fees:</label>
              </div>
              <div class="col-md-4 form-group">
                <input
                  type="number"
                  name="tuition"
                  class="form-control"
                  id="tuition_fees"
                  placeholder="0.00"
                />
              </div>
              <div class="col-md-4 form-group">
                <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    id="customFile"
                  />
                  <label class="custom-file-label" for="customFile">
                    Choose file
                  </label>
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-4 form-group">
                <label for="examination">Examination fees:</label>
              </div>
              <div class="col-md-4 form-group">
                <input
                  type="number"
                  name="examination"
                  class="form-control"
                  id="examination_fees"
                  placeholder="0.00"
                />
              </div>
              <div class="col-md-4 form-group">
                <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    id="customFile"
                  />
                  <label class="custom-file-label" for="customFile">
                    Choose file
                  </label>
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-4 form-group">
                <label for="books">
                  Cost of recommended books and study material:
                </label>
              </div>
              <div class="col-md-4 form-group">
                <input
                  type="number"
                  name="books"
                  class="form-control"
                  id="books_fees"
                  placeholder="0.00"
                />
              </div>
              <div class="col-md-4 form-group">
                <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    id="customFile"
                  />
                  <label class="custom-file-label" for="customFile">
                    Choose file
                  </label>
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-4 form-group">
                <label for="examination">Accomodation and meals:</label>
              </div>
              <div class="col-md-4 form-group">
                <input
                  type="number"
                  name="accomodation"
                  class="form-control"
                  id="accomodation_fees"
                  placeholder="0.00"
                />
              </div>
              <div class="col-md-4 form-group">
                <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    id="customFile"
                  />
                  <label class="custom-file-label" for="customFile">
                    Choose file
                  </label>
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-4 form-group">
                <label for="fare">
                  Return economy airfare/bus fare/mileage:
                </label>
              </div>
              <div class="col-md-4 form-group">
                <input
                  type="number"
                  name="fare"
                  class="form-control"
                  id="fare_fees"
                  placeholder="0.00"
                />
              </div>
              <div class="col-md-4 form-group">
                <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    id="customFile"
                  />
                  <label class="custom-file-label" for="customFile">
                    Choose file
                  </label>
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-4 form-group">
                <label for="others">Others:</label>
              </div>
              <div class="col-md-4 form-group">
                <input
                  type="number"
                  name="others"
                  class="form-control"
                  id="other_fees"
                  placeholder="0.00"
                />
              </div>
              <div class="col-md-4 form-group">
                <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    id="customFile"
                  />
                  <label class="custom-file-label" for="customFile">
                    Choose file
                  </label>
                </div>
              </div>
              <div class="col-md-12 form-group">
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
              <div class="col-md-9 form-group">
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
        </div>
        <div className="row">
          <div className="col-md-12">
            <legend className="text-danger text-center">Declaration</legend>
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
              <div class="col-md-3 form-group">
                <input
                  type="text"
                  name="first_name_hr"
                  class="form-control"
                  id="first_name_hr"
                  placeholder="FirstName"
                />
              </div>
              <div class="col-md-3 form-group">
                <input
                  type="text"
                  name="last_name_hr"
                  class="form-control"
                  id="last_name_hr"
                  placeholder="LastName"
                />
              </div>
              <div class="col-md-3 form-group">
                <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    id="customFile"
                  />
                  <label class="custom-file-label" for="customFile">
                    Choose file (id/passport)
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
