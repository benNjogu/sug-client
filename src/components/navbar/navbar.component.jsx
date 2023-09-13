import Logo from '../../assets/images/logo.png';
<<<<<<<< HEAD:src/components/navbar/navbar.component.js
import './navbar.style.css'
========
import './navbar.styles.css';
>>>>>>>> a633266f9794573d0a28b84eca472308ea1c6994:src/components/navbar/navbar.component.jsx

const Navbar = ({ handleProfileClick }) => {
  return (
    <div>
      <nav className="navbar nav-bg navbar-dark navbar-expand-lg">
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
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <a
                class="text-primary nav-link cursor-pointer"
                onClick={handleProfileClick}
              >
                <strong>View Profile</strong>
              </a>
            </li>
            <li class="nav-item active">
              <a className="text-danger nav-link cursor-pointer">
                <strong>Logout</strong>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
