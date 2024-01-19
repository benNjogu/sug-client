import { useLocation } from 'react-router-dom';

import './view-application-details.styles.css';

const ViewApplicationDetails = () => {
  const { state } = useLocation();
  const record = state.record;
  console.log(record);

  const addComma = (number) =>
    'KSh. ' + Intl.NumberFormat('en-US').format(number);

  return (
    <div className="main-div">
      <div className="main-div--rejection row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12">
              <div class="form-row">
                <div class="col-md-6">
                  <label for="navbar" className="label">
                    Navbar
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-div--rejection row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12">
              <div class="form-row">
                <div class="col-md-6">
                  <label for="rejection" className="label">
                    Rejection/Approval message banner
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-div--profile row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12">
              <legend className="text-info">Organization Profile.</legend>
              <div class="form-row">
                <div class="col-md-6">
                  <label for="profile" className="label">
                    Profile
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-div--selected-nominees row mt-4">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12">
              <legend className="text-info">Selected nominees.</legend>
              <div class="form-row">
                <div class="col-md-6">
                  <label for="nominees" className="label">
                    Nominees
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-div--course-details row mt-4">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12">
              <legend className="text-info">
                Details of the course applied for.
              </legend>
              <div class="form-row">
                <div class="col-md-6">
                  <div>
                    <label for="course_title" className="label">
                      Course title:
                    </label>
                    <span>{record.course_title}</span>
                  </div>
                  <div>
                    <label for="provider" className="label">
                      Training provider:
                    </label>
                    <span>{record.training_provider}</span>
                  </div>
                  <div>
                    <label for="venue" className="label">
                      Specific course venue:
                    </label>
                    <span>{record.course_venue}</span>
                  </div>
                </div>
                <div class="col-md-6">
                  <div>
                    <label className="label">Country:</label>
                    <span>{record.country}</span>
                  </div>
                  <div>
                    <label className="label">State:</label>
                    <span>{record.state}</span>
                  </div>
                  <div>
                    <label className="label">City:</label>
                    <span>{record.city}</span>
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-12">
                  <label for="course_objectives" className="label">
                    Course objectives:
                  </label>
                  <span className="span--block">
                    {record.course_objectives}
                  </span>
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-6">
                  <div>
                    <label for="admission" className="label">
                      Course proposal or admission letter:
                    </label>
                    <a href="#">{record.admission_letter}</a>
                  </div>
                </div>

                <div class="col-md-6">
                  <div>
                    <label for="contents" className="label">
                      Course contents and timetable:
                    </label>
                    <a href="#">{record.course_contents}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-div--overseas-requirements row mt-4">
        <div className="col-md-12">
          <legend className="text-info">
            Regional/Overseas training additional requirements.
          </legend>
          <div class="form-row">
            <div class="col-md-6">
              <div>
                <label className="label">
                  Is the course available locally?
                </label>
                <span>{record.available_locally === 0 ? 'No' : 'Yes'}</span>
              </div>
            </div>
            <div class="col-md-6">
              <div>
                <label for="employment_date" className="label">
                  Date of employment:
                </label>
                <span>{record.date_of_employment.split('T')[0]}</span>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="col-md-12">
              <div>
                <label for="trainer_employer_relationship" className="label">
                  Does the trainer have any business connection with the
                  Employer/Applicant?
                </label>
                <span>
                  {record.trainer_employer_relationship === 0 ? 'No' : 'Yes'}
                </span>
              </div>
              <div class="col-md-12">
                <label
                  for="trainer_employer_relationship_details"
                  className="inner__label"
                >
                  The organization name:
                </label>
                <span>
                  {record.related_organization_name === null
                    ? 'N/A'
                    : record.related_organization_name}
                </span>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="col-md-12">
              <div>
                <label for="other_organization_funds" className="label">
                  Is any other organization funding the training?
                </label>
                <span>
                  {record.other_organization_funding === 0 ? 'No' : 'Yes'}
                </span>
              </div>
              <div class="col-md-12">
                <label
                  for="other_organization_funds_details"
                  className="inner__label"
                >
                  The organization name:
                </label>
                <span>
                  {record.organization_funding_name === null
                    ? 'N/A'
                    : record.organization_funding_name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-div--training-expenses row mt-4">
        <div className="col-md-12">
          <legend className="text-info">Training expenses.</legend>
          <div class="form-row">
            <div class="col-md-6">
              <label for="tuition_fees" className="label">
                Tuition fees:
              </label>
              <span>{addComma(record.tuition_fees)}</span>
            </div>
          </div>
          <div class="form-row">
            <div class="col-md-6 ">
              <label for="examination" className="label">
                Examination fees:
              </label>
              <span>{addComma(record.examination_fees)}</span>
            </div>
          </div>
          <div class="form-row">
            <div class="col-md-6">
              <label for="books" className="label">
                Cost of recommended books and study material:
              </label>
              <span>{addComma(record.study_materials_fees)}</span>
            </div>
          </div>
          <div class="form-row">
            <div class="col-md-6">
              <label for="examination" className="label">
                Accomodation and meals:
              </label>
              <span>{addComma(record.accomodation_and_meals_fees)}</span>
            </div>
          </div>
          <div class="form-row">
            <div class="col-md-6">
              <label for="fare" className="label">
                Return economy airfare/bus fare/mileage:
              </label>
              <span>{addComma(record.bus_fare_fees)}</span>
            </div>
          </div>
          <div class="form-row">
            <div class="col-md-6 form-group">
              <label for="others" className="label">
                Others:
              </label>
              <span>{addComma(record.other_expenses)}</span>
            </div>
          </div>
          <div class="form-row">
            <div class="col-md-6 form-group">
              <label for="others" className="label">
                Support document:
              </label>
              <a href="#">{record.support_document}</a>
            </div>
          </div>
          <div class="form-row">
            <div class="col-md-6 form-group">
              <label for="total" className="label">
                TOTAL COST :
              </label>
              <span>{addComma(record.total_cost)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="main-div--hr_manager row mt-4">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12">
              <legend className="text-info">Authorizing officer.</legend>
              <div class="form-row">
                <div class="col-md-6">
                  <label for="hr_manager" className="label">
                    HR
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

export default ViewApplicationDetails;
