import React from 'react';
import { constants } from '../../data/constants';

const ModalComponent = ({ onClick }) => {
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
            <div className="col-12">
              <fieldset>
                <legend class="col-form-legend">Type of training</legend>
                <div class="form-check">
                  <label for="" class="form-check-label">
                    <input
                      type="radio"
                      name="type"
                      id=""
                      class="form-check-input"
                      value={constants.LOCAL}
                      //   onChange={onValueChange}
                      //   checked={typeOfTraining === constants.LOCAL}
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
                      value={constants._OVERSEAS}
                      //   onChange={onValueChange}
                      //   checked={typeOfTraining === constants._OVERSEAS}
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
                      value={constants.DISTANCE}
                      //   onChange={onValueChange}
                      //   checked={typeOfTraining === constants.DISTANCE}
                    />
                    Distance learning
                  </label>
                </div>
              </fieldset>
            </div>
            <div className="col-12">
              <fieldset>
                <legend class="col-form-legend">Number of participants,</legend>
                <div class="form-check">
                  <label for="" class="form-check-label">
                    <input
                      type="radio"
                      name="amount"
                      id=""
                      class="form-check-input"
                      value={constants.ONE}
                      //   onChange={onNumberChange}
                      //   checked={number === constants.ONE}
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
                      value={constants.GROUP}
                      //   onChange={onNumberChange}
                      //   checked={number === constants.GROUP}
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
              class="btn btn-primary"
              data-dismiss="modal"
              onClick={onClick}
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
