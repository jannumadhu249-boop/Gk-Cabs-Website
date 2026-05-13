import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from './Icon';

function Navbar() {
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'nav-link active' : 'nav-link';

  return (
    <header>
      <div className="container">
        <nav className="navbar navbar-expand-xl p-0">
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            aria-controls="navbarNavDropdown"
            aria-expanded={!collapsed}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <Icon name="text-align-left" size={22} />
            </span>
          </button>

          <Link to="/">
            <img className="img-fluid logo" src="assets/images/logo/gk_logo.png" alt="logo" />
          </Link>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://play.google.com/store/apps/details?id=com.gkcabs.user"
            className="btn purchase-btn order-xl-2"
          >
            Get App Now
          </a>

          <div
            className={`collapse navbar-collapse justify-content-center${collapsed ? '' : ' show'}`}
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className={isActive('/')} to="/" onClick={() => setCollapsed(true)}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className={isActive('/about')} to="/about" onClick={() => setCollapsed(true)}>About Us</Link>
              </li>
              <li className="nav-item">
                <Link className={isActive('/contact')} to="/contact" onClick={() => setCollapsed(true)}>Contact Us</Link>
              </li>
              <li className="nav-item">
                <Link className={isActive('/safety')} to="/safety" onClick={() => setCollapsed(true)}>Safety</Link>
              </li>
              {/* <li className="nav-item">
                <Link className={isActive('/careers')} to="/careers" onClick={() => setCollapsed(true)}>Careers</Link>
              </li> */}
              <li className="nav-item">
                <Link className={isActive('/media')} to="/media" onClick={() => setCollapsed(true)}>Media</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
