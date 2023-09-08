import Logo from '../assets/images/logo.png';

const Navbar = ({ handleProfileClick }) => {
  const handleClick = () => {
    console.log('clicked');
  };

  return (
    <div>
      <nav class="navbar bg-primary navbar-dark navbar-expand-lg">
        <a class="navbar-brand">
          <img src={Logo} alt="Logo" style={{ height: 48, width: 240 }} />
        </a>

        <button
          type="button"
          class="navbar-toggler navbar-toggler-right"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <div className="mr-auto"></div>
          <div className="profile">
            <img
              src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
              class="rounded-circle"
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
