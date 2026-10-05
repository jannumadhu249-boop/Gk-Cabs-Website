import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from './Icon';
import { API_ENDPOINTS } from '../config/api';


function Navbar() {
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(true);

  const isActive = (path) => location.pathname === path ? 'nav-link active' : 'nav-link';

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.CONTACT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if (data.success && data.contactus?.phoneOne) {
          setPhoneNumber(data.contactus.phoneOne);
        } else {
          setPhoneNumber('');
        }
      } catch (error) {
        console.error('Error fetching contact number:', error);
        setPhoneNumber('');
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, []);

  // Format phone number with spaces for display (e.g., 98666 00720)
  const formattedPhone = phoneNumber ? phoneNumber.replace(/(\d{5})(\d{5})/, '$1 $2') : '';


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

          {/* Contact number and Get App button - aligned right */}
          <div className="d-flex align-items-center ms-auto order-xl-2">
            <a href={`tel:+91${phoneNumber}`} className="contact-number me-3 text-decoration-none">
              <Icon name="phone" size={20} />
              <span className="highlight-number">
                {loading ? 'Loading...' : `+91 ${formattedPhone}`}
              </span>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://play.google.com/store/apps/details?id=com.gkcabs.user"
              className="btn purchase-btn"
            >
              Get App Now
            </a>
          </div>

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
