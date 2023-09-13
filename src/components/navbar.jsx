import Logo from '../assets/images/logo.png';

const Navbar = ({ handleProfileClick }) => {
  return (
    <div>
      <nav className="navbar bg-primary navbar-dark navbar-expand-lg">
        <a className="navbar-brand">
          <img src={Logo} alt="Logo" style={{ height: 48, width: 240 }} />
        </a>

        <button
          type="button"
          className="navbar-toggler navbar-toggler-right"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="profile ml-auto">
            <img
              src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
              className="rounded-circle"
              style={{ width: 48, cursor: 'pointer' }}
              alt="Avatar"
              onClick={handleProfileClick}
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
