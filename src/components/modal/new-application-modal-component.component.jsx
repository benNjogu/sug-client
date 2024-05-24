import { useState } from "react";
import { useDispatch } from "react-redux";
import { Radio, Space, message } from "antd";

import { constants } from "../../data/constants";
import { UpdateApplicationSpecs } from "../../redux/slices/application";
import { UpdateCapacity } from "../../redux/slices/cell";
import "./new-application-modal.styles.css";

const NewApplicationModalComponent = ({ handleClose, onClick }) => {
  const dispatch = useDispatch();

  const [typeOfTraining, setTypeOfTraining] = useState(constants.LOCAL);
  const [numberOfParticipants, setNumberOfParticipants] = useState(
    constants.ONE
  );
  const [numberOfGroups, setNumberOfGroups] = useState(null);

  const handleTypeOfTraining = (e) => {
    setTypeOfTraining(e.target.value);
  };
  const handleNumberOfParticipants = (e) => {
    setNumberOfParticipants(e.target.value);
  };
  const handleNumberOfGroups = (e) => {
    setNumberOfGroups(e.target.value);
  };

  const handleSubmit = () => {
    let details = {};
    details.type_of_training = typeOfTraining;
    details.number_of_participants = numberOfParticipants;

    if (numberOfParticipants === constants.GROUP) {
      if (numberOfGroups === null) {
        message.error("Enter number of groups!");
        return;
      }

      details.number_of_groups = numberOfGroups;
    }

    onSubmit(details);
  };

  const onSubmit = (data) => {
    dispatch(
      UpdateApplicationSpecs({
        data: {
          typeOfTraining: data.type_of_training,
          numberOfParticipants: data.number_of_participants,
        },
      })
    );

    if (data.number_of_participants === constants.GROUP) {
      if (
        data.type_of_training === constants.LOCAL ||
        data.type_of_training === constants.OVER_SEAS ||
        data.type_of_training === constants.DISTANCE
      ) {
        dispatch(
          UpdateCapacity({
            minCapacity: constants.LOCAL_OVERSEAS_DISTANCE.minCapacity,
            maxCapacity: constants.LOCAL_OVERSEAS_DISTANCE.maxCapacity,
          })
        );
      } else if (data.type_of_training === constants.STATUTORY) {
        dispatch(
          UpdateCapacity({
            minCapacity: constants.STATUTORY_CAP.minCapacity,
            maxCapacity: constants.STATUTORY_CAP.maxCapacity,
          })
        );
      }
    } else {
      dispatch(
        UpdateCapacity({
          minCapacity: constants.SINGLE_NOMINEE_CAP.minCapacity,
          maxCapacity: constants.SINGLE_NOMINEE_CAP.maxCapacity,
        })
      );
    }

    onClick(data);
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <Radio.Group onChange={handleTypeOfTraining} value={typeOfTraining}>
          <legend className="col-form-legend">Type of training,</legend>
          <Space direction="vertical">
            <Radio value={constants.LOCAL}>Local</Radio>
            <Radio value={constants.STATUTORY}>
              Statutory{" "}
              <span className="font-italic">
                i.e. First aid, Occupational health & safety, Fire safety
              </span>
            </Radio>
            <Radio value={constants.OVER_SEAS}>Overseas</Radio>
            <Radio value={constants.DISTANCE}>Distance Learning</Radio>
          </Space>
        </Radio.Group>
      </div>
      <div className="col-md-12">
        <Radio.Group
          onChange={handleNumberOfParticipants}
          value={numberOfParticipants}
        >
          <legend class="col-form-legend">Number of participants,</legend>
          <Space direction="vertical">
            <Radio value={constants.ONE}>One</Radio>
            <Radio value={constants.GROUP}>
              Group ( <span className="text-success">Maximum</span> of{" "}
              <span className="text-success">3 groups</span> )
            </Radio>
            <div class="col-md-12 mb-3">
              {numberOfParticipants === constants.GROUP && (
                <input
                  type="number"
                  name="number-of-groups"
                  id="groups"
                  max={3}
                  style={{
                    width: 300,
                  }}
                  onChange={handleNumberOfGroups}
                  placeholder="number of groups e.g. 2"
                  autoComplete="off"
                  className={"form-control"}
                />
              )}
            </div>
          </Space>
        </Radio.Group>
      </div>
      <div className="col-md-12 modal-footer pb-0">
        <button
          type="button"
          class="btn btn-outline-secondary"
          onClick={handleClose}
        >
          CANCEL
        </button>
        <button
          type="button"
          class="btn btn-primary"
          data-dismiss="modal"
          onClick={handleSubmit}
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default NewApplicationModalComponent;
