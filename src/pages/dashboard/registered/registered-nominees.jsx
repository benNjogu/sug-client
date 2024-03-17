import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import NomineeCard from "../../../components/nominee-card/nominee-card.component";
import { FetchAllRegisteredUsers } from "./../../../redux/slices/nominee";
import FilterNominees from "./../../../components/filter-component/filter-component";
import DefaultLayout from "../../../components/default-layout/default-layout.component";
import Spinner from "../../../components/spinner";

const Registered = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { nominees } = useSelector((state) => state.nominee);

  useEffect(() => {
    dispatch(FetchAllRegisteredUsers());
  }, []);

  const handleAddNew = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      navigate("/app/register-nominee");
    }, 700);
  };

  const handleEdit = () => {
    navigate("/app/register-nominee", {
      state: { nominee_id: 1 },
    });
  };

  let nominee_levels = [
    "All",
    "Top management",
    "Middle level management",
    "Supervisory",
    "Operative",
    "Others",
  ];

  return (
    <DefaultLayout>
      <FilterNominees onAddNew={handleAddNew} options={nominee_levels} />
      <div className="row overflow-auto">
        <Spinner loading={loading} />
        {nominees.length > 0 ? (
          nominees.map((n) => {
            if (n.active)
              return (
                <div key={n.id} className="col-md-4">
                  <NomineeCard onEdit={handleEdit} nominee={n} />
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
