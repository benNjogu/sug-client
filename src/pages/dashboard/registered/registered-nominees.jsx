import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import NomineeCard from "../../../components/nominee-card/nominee-card.component";
import { FetchAllRegisteredUsers } from "./../../../redux/slices/nominee";
import FilterNominees from "./../../../components/filter-component/filter-component";
import DefaultLayout from "../../../components/default-layout/default-layout.component";
import Spinner from "../../../components/spinner";
import { constants } from "../../../data/constants";
import { Modal } from "antd";
import ViewUser from "../../../components/modal/view-user-modal";
import UsersCard from "../../../components/users-card/users-card.component";

const Registered = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { nominees } = useSelector((state) => state.nominee);
  const [showViewNomineeModal, setShowViewNomineeModal] = useState(false);
  const [user, setUser] = useState({});

  const handleAddNew = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      navigate("/app/register-nominee", {
        state: { type: constants.ADD_NOMINEE },
      });
    }, 700);
  };

  const handleView = (data) => {
    setShowViewNomineeModal(true);
    setUser(data);
  };

  const handleCancel = () => {
    setShowViewNomineeModal(false);
  };

  const handleEdit = (nominee) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);

      navigate("/app/register-nominee", {
        state: { nominee, type: constants.EDIT_NOMINEE },
      });
    }, 700);
  };

  let nominee_levels = [
    "All",
    "Top management",
    "Middle level management",
    "Supervisory",
    "Operative",
    "Others",
  ];

  useEffect(() => {
    let org = window.localStorage.getItem("user_id");
    dispatch(FetchAllRegisteredUsers(org));
  }, []);

  return (
    <DefaultLayout>
      {showViewNomineeModal && (
        <Modal
          open={showViewNomineeModal}
          title={`User Data`}
          onCancel={handleCancel}
          footer={false}
        >
          {<ViewUser user={user} />}
        </Modal>
      )}
      <FilterNominees onAddNew={handleAddNew} options={nominee_levels} />
      <div className="row overflow-auto mt-3">
        <Spinner loading={loading} />
        {nominees.length > 0 ? (
          nominees.map((n) => {
            if (n.active)
              return (
                <div key={n.id} className="col-md-4 mb-3">
                  <UsersCard
                    btn1Text={"View"}
                    btn2Text={"Edit"}
                    btn1Click={handleView}
                    btn2Click={() => handleEdit(n)}
                    user={n}
                  />
                </div>
              );
          })
        ) : (
          <div className="col-md-12">
            <p className="text-center">
              No Registered nominess.{" "}
              <span
                className="text-primary cursor-pointer"
                onClick={handleAddNew}
              >
                Register Now
              </span>
              .
            </p>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Registered;
