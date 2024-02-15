import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal, message } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

import { constants } from './../../data/constants';
import {
  GetApplicationHR,
  GetApplicationNominees,
  UpdateType,
} from '../../redux/slices/application';
import NomineeCard from '../../components/nominee-card/nominee-card.component';
import Navbar from '../../components/navbar/navbar.component';
import Spinner from './../../components/spinner';

import './view-application-details.styles.css';
import RejectApplicationModal from '../../components/modal/reject-application-modal.component';
import ApproveApplicationModal from './../../components/modal/approve-application-modal.component';
import DefferApplicationModal from '../../components/modal/deffer-application-modal.component';

const ViewApplicationDetails = () => {
  const [loading, setLoading] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showDefferModal, setShowDefferModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const record = state.record;
  console.log(record);

  const addComma = (number) =>
    'KSh. ' + Intl.NumberFormat('en-US').format(number);

  const { applicationNominees } = useSelector((state) => state.application);
  console.log(applicationNominees);
  const { nominees } = useSelector((state) => state.nominee);
  console.log(nominees);
  const { applicationHR } = useSelector((state) => state.application);
  console.log(applicationHR);

  //filtering nominees based on fetched ids
  let filteredNominees = [];
  const getFilteredNominees = () => {
    for (let i = 0; i < applicationNominees.length; i++) {
      for (let j = 0; j < nominees.length; j++) {
        if (applicationNominees[i].nominee_id === nominees[j].id) {
          filteredNominees.push(nominees[j]);
        } else continue;
      }
    }

    return filteredNominees;
  };

  useEffect(() => {
    dispatch(GetApplicationNominees(record.id));
  }, []);

  useEffect(() => {
    dispatch(GetApplicationHR(record.id));
  }, []);

  const handleApprove = () => {
    setShowApproveModal(true);
  };

  const handleReject = () => {
    setShowRejectModal(true);
  };

  const handleDeffer = () => {
    setShowDefferModal(true);
  };

  const handleCancel = () => {
    setShowApproveModal(false);
    setShowDefferModal(false);
    setShowRejectModal(false);
  };

  const handleBackpressed = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      navigate(-1);
    }, 300);
  };

  let the_message;
  const handleAppApprove = (reason) => {
    let in_house = reason.in_house;
    let open_house = reason.open_house;
    let signature_id = reason.signature_id;
    the_message = in_house + ' ' + open_house + ' ' + signature_id;

    // console.log(in_house, open_house, signature_id);
    message.success(the_message, [2]);
  };

  const handleAppReject = (reason) => {
    console.log(reason);
    console.log(reason.rejection_message, reason.signature_id);
    the_message = reason.rejection_message + ' ' + reason.signature_id;

    message.success(the_message, [2]);
  };

  const handleAppDeffer = (reason) => {
    console.log(reason);
    the_message = reason.deffer_message + ' ' + reason.signature_id;

    message.success(the_message, [2]);
  };

  return (
    <>
      <Navbar
        title={record.course_title}
        handleApprove={handleApprove}
        handleReject={handleReject}
        handleDeffer={handleDeffer}
        handleBackpressed={handleBackpressed}
      />
      {/* {contextHolder} */}
      <div className="main-div">
        {showApproveModal && (
          <Modal
            open={showApproveModal}
            title={`Approve application`}
            onCancel={handleCancel}
            footer={false}
          >
            {
              <ApproveApplicationModal
                handleClose={handleCancel}
                handleApprove={handleAppApprove}
              />
            }
          </Modal>
        )}
        {showDefferModal && (
          <Modal
            open={showDefferModal}
            title={`Reason for deffer`}
            onCancel={handleCancel}
            footer={false}
          >
            {
              <DefferApplicationModal
                handleClose={handleCancel}
                handleDeffer={handleAppDeffer}
              />
            }
          </Modal>
        )}
        {showRejectModal && (
          <Modal
            open={showRejectModal}
            title={`Reason for rejection`}
            onCancel={handleCancel}
            footer={false}
          >
            {
              <RejectApplicationModal
                handleClose={handleCancel}
                handleReject={handleAppReject}
              />
            }
          </Modal>
        )}
        <Spinner loading={loading} />
        {record.approved === 'Rejected' && (
          <div className="main-div--rejection row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-12">
                  <div className="alert alert-danger mb-4" role="alert">
                    <h2 className="alert-heading">Application rejected!</h2>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quibusdam et quaerat perferendis illo laboriosam officiis
                      amet quisquam aliquid dolor culpa! Lorem, ipsum dolor sit
                      amet consectetur adipisicing elit. Recusandae voluptatum
                      fugiat optio alias quos ab nam, esse beatae iure sunt.
                      <p className="verifier-name alert-link">- By Edith.</p>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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
                  <div class="col-md-12">
                    <div className="row overflow-auto mt-0">
                      {getFilteredNominees().map((n) => (
                        <div key={n.id} className="col-md-4">
                          <NomineeCard nominee={n} component="view_nominee" />
                        </div>
                      ))}
                    </div>
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
                    <label for="course_objectives" className="label">
                      Group 1 start date:
                    </label>
                    <span className="span--block">
                      {/* TODO: Add group start date */}
                    </span>
                  </div>
                  <div class="col-md-6">
                    <label for="course_objectives" className="label">
                      Group 1 end date:
                    </label>
                    <span className="span--block">
                      {/* TODO: Add group end date */}
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
        {record.type_of_training === constants.OVER_SEAS && (
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
                    <label
                      for="trainer_employer_relationship"
                      className="label"
                    >
                      Does the trainer have any business connection with the
                      Employer/Applicant?
                    </label>
                    <span>
                      {record.trainer_employer_relationship === 0
                        ? 'No'
                        : 'Yes'}
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
        )}
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
        {/* <div className="main-div--hr_manager row mt-4">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12">
                <legend className="text-info">Authorizing officer.</legend>
                <div class="form-row">
                  <div class="col-md-3">
                    <label className="label">ID Number: </label>{' '}
                    <label>{applicationHR[0].national_id_number}</label>
                  </div>
                  <div class="col-md-3">
                    <label className="label">Names: </label>{' '}
                    <label>{applicationHR[0].first_name}</label>
                    {'  '}
                    <label>{applicationHR[0].last_name}</label>
                  </div>
                  <div class="col-md-3">
                    <label className="label">ID PDF: </label>{' '}
                    <a href="">{applicationHR[0].id_pdf}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default ViewApplicationDetails;
