const Profile = () => {
  return (
    <div class="tab-content" id="navContent">
      <div
        class="tab-pane fade pt-4 show active"
        id="step-1"
        role="tabpanel"
        aria-labelledby="step-1-tab"
      >
        <div class="form-row">
          <div class="col-md-4 form-group">
            <label for="name">Name of the organization:</label>
            <input
              type="text"
              name="name"
              id="name"
              class="form-control"
              placeholder="Keytech solutions"
            />
          </div>
          <div class="col-md-4 form-group">
            <label for="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              class="form-control"
              placeholder="organization@domain.com"
              readOnly
            />
          </div>
          <div class="col-md-4 form-group">
            <label for="regno">Levy Registration Number:</label>
            <input
              type="text"
              name="regno"
              id="regno"
              class="form-control"
              placeholder="ABCD1234"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="col-md-9 form-group">
            <label for="address">Physical Address:</label>
            <input
              type="text"
              name="address"
              id="address"
              class="form-control"
              placeholder="1234 Grand Avenue, Nairobi"
            />
          </div>
          <div class="col-md-3 form-group">
            <label for="apartment">Apartment and floor:</label>
            <input
              type="text"
              name="apartment"
              id="apartment"
              class="form-control"
              placeholder="Kenda House, 2nd Floor"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="col-md-6 form-group">
            <label for="city">Postal Address:</label>
            <input
              type="text"
              class="form-control"
              name="city"
              id="city"
              placeholder="49 Maragua"
            />
          </div>
          <div class="col-md-2 form-group">
            <label for="zip">Code:</label>
            <input
              type="number"
              name="zip"
              id="zip"
              class="form-control"
              placeholder="102005"
            />
          </div>
          <div class="col-md-4 form-group">
            <label for="zip">Phone:</label>
            <input
              type="text"
              name="phone"
              id="phone"
              class="form-control"
              placeholder="+254 745 580 333"
            />
          </div>
        </div>
        <button
          type="button"
          class="btn btn-outline-primary btn-lg d-block ml-auto"
          id="save"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Profile;
