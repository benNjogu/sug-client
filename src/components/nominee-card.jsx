const NomineeCard = ({ onEdit }) => {
  return (
    <div>
      <div
        className="card"
        style={{ width: 18 + 'rem', marginBottom: 8 + 'px' }}
      >
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
              <h5 className="card-title">Name</h5>
              <p className="card-text">Job level</p>
            </div>
          </div>
        </div>
        <div className="card-footer">
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
        </div>
      </div>
    </div>
  );
};

export default NomineeCard;
