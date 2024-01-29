import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { constants } from '../../data/constants';
import { UpdateApplicationSpecs } from '../../redux/slices/application';
import { AddNewGroup, UpdateCapacity } from '../../redux/slices/cell';
import './modal.styles.css';

const ModalComponent = ({ onClick }) => {
  const dispatch = useDispatch();
  const [typeOfTraining, setTypeOfTraining] = useState(constants.LOCAL);
  const [numberOfParticipants, setNumberOfParticipants] = useState(
    constants.ONE
  );

  const onValueChange = (e) => {
    setTypeOfTraining(e.target.value);
  };

  const onNumberChange = (e) => {
    setNumberOfParticipants(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(
      UpdateApplicationSpecs({ data: { typeOfTraining, numberOfParticipants } })
    );

    if (numberOfParticipants === constants.GROUP) {
      if (
        typeOfTraining === constants.LOCAL ||
        typeOfTraining === constants.OVER_SEAS ||
        typeOfTraining === constants.DISTANCE
      ) {
        dispatch(
          AddNewGroup([
            {
              g_id: constants.FIRST_GROUP_ID,
              label: constants.FIRST_GROUP_LABEL,
            },
          ])
        );
        dispatch(
          UpdateCapacity({
            minCapacity: constants.LOCAL_OVERSEAS_DISTANCE.minCapacity,
            maxCapacity: constants.LOCAL_OVERSEAS_DISTANCE.maxCapacity,
          })
        );
      } else if (typeOfTraining === constants.STATUTORY) {
        dispatch(
          AddNewGroup([
            {
              g_id: constants.FIRST_GROUP_ID,
              label: constants.FIRST_GROUP_LABEL,
            },
          ])
        );
        dispatch(
          UpdateCapacity({
            minCapacity: constants.STATUTORY_CAP.minCapacity,
            maxCapacity: constants.STATUTORY_CAP.maxCapacity,
          })
        );
      }
    } else {
      dispatch(
        AddNewGroup([
          {
            g_id: constants.FIRST_GROUP_ID,
            label: constants.SINGLE_NOMINEE_LABEL,
          },
        ])
      );
      dispatch(
        UpdateCapacity({
          minCapacity: constants.SINGLE_NOMINEE_CAP.minCapacity,
          maxCapacity: constants.SINGLE_NOMINEE_CAP.maxCapacity,
        })
      );
    }

    onClick();
  };

  return (
    <div
      class="modal"
      tabindex="-1"
      id="selectItemModal"
      aria-labelledby="selectItemModalLabel"
    >
      <div class="modal-dialog  modal-dialog-centered  modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Select appropriately</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div className="col-md-12">
              <fieldset>
                <legend class="col-form-legend">Type of training</legend>
                <div class="form-check">
                  <label for="" class="form-check-label">
                    <input
                      type="radio"
                      name="type_of_training"
                      id=""
                      class="form-check-input"
                      value={constants.LOCAL}
                      autoComplete="off"
                      onChange={onValueChange}
                      checked={typeOfTraining === constants.LOCAL}
                    />
                    Local
                  </label>
                </div>
                <div class="form-check">
                  <label for="" class="form-check-label">
                    <input
                      type="radio"
                      name="type_of_training"
                      id=""
                      class="form-check-input"
                      value={constants.STATUTORY}
                      autoComplete="off"
                      onChange={onValueChange}
                      checked={typeOfTraining === constants.STATUTORY}
                    />
                    Statutory{' '}
                    <span className="font-italic">e.g first aid...</span>
                  </label>
                </div>
                <div class="form-check">
                  <label for="" class="form-check-label">
                    <input
                      type="radio"
                      name="type_of_training"
                      id=""
                      class="form-check-input"
                      value={constants.OVER_SEAS}
                      autoComplete="off"
                      onChange={onValueChange}
                      checked={typeOfTraining === constants.OVER_SEAS}
                    />
                    Overseas
                  </label>
                </div>
                <div class="form-check">
                  <label for="" class="form-check-label">
                    <input
                      type="radio"
                      name="type_of_training"
                      id=""
                      class="form-check-input"
                      value={constants.DISTANCE}
                      autoComplete="off"
                      onChange={onValueChange}
                      checked={typeOfTraining === constants.DISTANCE}
                    />
                    Distance learning
                  </label>
                </div>
              </fieldset>
            </div>
            <div className="col-md-12">
              <fieldset>
                <legend class="col-form-legend">Number of participants,</legend>
                <div class="form-check">
                  <label for="" class="form-check-label">
                    <input
                      type="radio"
                      name="number_of_participants"
                      id=""
                      class="form-check-input"
                      value={constants.ONE}
                      autoComplete="off"
                      onChange={onNumberChange}
                      checked={numberOfParticipants === constants.ONE}
                    />
                    One
                  </label>
                </div>
                <div class="form-check">
                  <label for="" class="form-check-label">
                    <input
                      type="radio"
                      name="number_of_participants"
                      id=""
                      class="form-check-input"
                      value={constants.GROUP}
                      autoComplete="off"
                      onChange={onNumberChange}
                      checked={numberOfParticipants === constants.GROUP}
                    />
                    Group
                  </label>
                </div>
              </fieldset>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              class="btn btn-primary"
              data-dismiss="modal"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
