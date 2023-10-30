const NomineeCard = () => {
  return (
    <div>
      <div className="card" style={{ width: 18 + 'rem' }}>
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
              <a href="#" class="btn btn-sm btn-outline-danger">
                delete
              </a>
            </div>
            <div className="col-4">
              <a href="#" class="btn btn-sm btn-outline-success">
                edit
              </a>
            </div>
            <div className="col-4">
              <a href="#" class="btn btn-sm btn-outline-primary">
                view
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NomineeCard;
