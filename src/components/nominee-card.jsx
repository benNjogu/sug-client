const NomineeCard = ({ onEdit, nominee, component = '', onAdd }) => {
  return (
    <div>
      <div className="card mb-2" style={{ width: 18 + 'rem' }}>
        <div class="card-body">
          <div className="row">
            <div className="col-md-6">
              <img
                src={require('../data/images/passport.jpg')}
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
        <div className="card-footer">
          {component !== 'select_nominee' ? (
            <div className="row">
              <div className="col-4">
                <button class="btn btn-sm btn-outline-danger">delete</button>
              </div>
              <div className="col-4">
                <button class="btn btn-sm btn-outline-success" onClick={onEdit}>
                  edit
                </button>
              </div>
              <div className="col-4">
                <button class="btn btn-sm btn-outline-primary">view</button>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-4">
                <button
                  onClick={() => onAdd(nominee.id, nominee.first_name)}
                  class="btn btn-sm btn-outline-success"
                >
                  Add G1
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NomineeCard;
