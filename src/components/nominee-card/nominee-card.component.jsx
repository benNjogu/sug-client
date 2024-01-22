import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AddNominee } from '../../redux/slices/cell';
import './nominee-card.style.css';
import { constants } from '../../data/constants';

const NomineeCard = ({ onEdit, nominee, component = '', onAdd }) => {
  const dispatch = useDispatch();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const groups = useSelector((state) => state.cell.groups);
  const group_nominees = useSelector((state) => state.cell.nominees);
  const deletedNominee = useSelector((state) => state.cell.deletedNominee);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  const handleDeleteNominee = (nominee_id) => {
    console.log(nominee_id);
    dispatch(AddNominee(group_nominees.filter((n) => n.key !== nominee_id)));
    setDropdownVisible(false);
  };

  let a = [];
  const getUserKeys = () => {
    for (let i = 0; i < group_nominees.length; i++) {
      a.push(group_nominees[i].key);
    }
  };
  getUserKeys();

  const getNomineeId = (id) => {
    for (let i = 0; i < group_nominees.length; i++) {
      if (group_nominees[i].key === id) {
        return group_nominees[i].g_id;
      }
    }
  };

  useEffect(() => {
    handleDeleteNominee(deletedNominee);
  }, [deletedNominee]);

  return (
    <div>
      <div className="card mb-2" style={{ width: 18 + 'rem' }}>
        <div class="card-body">
          <div className="row">
            <div className="col-md-6">
              <img
                src={require('../../data//images/passport.jpg')}
                className="rounded-circle"
                style={{ width: 80 + 'px' }}
                alt="passport photo"
              ></img>
            </div>
            <div className="col-md-6">
              <h5 className="card-title">{nominee.first_name}</h5>
              <p className="card-text">{nominee.job_level}</p>
            </div>
          </div>
        </div>
        {component !== 'view_nominee' && (
          <div className="card-footer">
            {component === 'select_nominee' ? (
              <div className="row">
                {!a.includes(nominee.id) ? (
                  <div
                    className="col-md-12 text-center"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {!isDropdownVisible && (
                      <button
                        class="btn btn-sm btn-outline-success"
                        onClick={handleMouseEnter}
                      >
                        ADD NOMINEE
                      </button>
                    )}
                    {isDropdownVisible && (
                      <div className="dropy">
                        <ul>
                          {groups.map((g) => (
                            <li
                              key={g.g_id}
                              onClick={() =>
                                onAdd(g.g_id, nominee.id, nominee.first_name)
                              }
                            >
                              {g.label.toUpperCase() ===
                              constants.SINGLE_NOMINEE_LABEL.toUpperCase()
                                ? 'ADD NOMINEE'
                                : g.label.toUpperCase()}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="col-md-12 text-center">
                    <button
                      class="btn btn-sm btn-outline-danger"
                      onClick={() => handleDeleteNominee(nominee.id)}
                    >
                      {'REMOVE GROUP ' + getNomineeId(nominee.id)}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="row">
                <div className="col-md-4">
                  <button
                    class="btn btn-sm btn-outline-success"
                    onClick={onEdit}
                  >
                    edit
                  </button>
                </div>
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <button class="btn btn-sm btn-outline-primary">view</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NomineeCard;
