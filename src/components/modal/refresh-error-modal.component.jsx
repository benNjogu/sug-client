const RefreshErrorModal = ({ handleClose, onClick }) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <h4 className="text-danger">
          We caught a few errors while submitting your application!
        </h4>
        <h5>Possible Causes:</h5>
        <ul>
          <li>
            <h6>Refreshing this page.</h6> We have found out that refreshing
            this page when editing, is causing errors. We are working on this
            problem.
          </li>
        </ul>
        <h5>Possible Solution:</h5>
        <ul>
          <li>
            <h6>Repeat the editing.</h6> Just go back (using the button on top
            right corner) and start the editing again. Avoid refreshing the page
            while You are editing.
          </li>
        </ul>
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
          onClick={onClick}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default RefreshErrorModal;
