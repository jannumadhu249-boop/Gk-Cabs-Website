import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';

const API_URL = 'http://88.222.213.67:5090/v1/gkcabs/web/get-contactus';

function Footer() {
  const [contactData, setContactData] = useState(null);

  useEffect(() => {
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setContactData(data.contactus);
        }
      })
      .catch((err) => console.error('Footer API fetch error:', err));
  }, []);

  // Fallback to original hardcoded values if API hasn't loaded or fails
  const address =
    contactData?.addressLineOne ||
    '';
  const phone = contactData?.phoneTwo || '';
  const email = contactData?.emailOne || '';
  const copyrightText = contactData?.copyRightText || '';

  const socialLinks = contactData
    ? {
        facebook: contactData.facebook,
        instagram: contactData.instagram,
        youtube: contactData.youtube,
        twitter: contactData.twitter,
        whatsapp: contactData.whatsapp,
        linkedin: contactData.linkedin,
      }
    : {};

  return (
    <footer className="footer-wrapper section-t-space">
      <div className="container">
        <div className="row">
          {/* Branding & Socials */}
          <div className="col-lg-4 col-md-6 footer-col">
            <Link to="/" className="footer-logo mb-4 d-inline-block">
              <img
                className="img-fluid logo"
                src="assets/images/logo/gk_logo.png"
                alt="logo"
                style={{ width: '120px' }}
              />
            </Link>
            <p className="footer-description">
              Connecting you with comfort, safety, and reliability on every journey. Gk Cabs is
              your trusted partner for city and outstation travel.
            </p>
            <ul className="social-links-footer mt-md-4 mt-3">
              {socialLinks.facebook && (
                <li>
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <Icon name="facebook" size={20} className="iconsax" />
                  </a>
                </li>
              )}
              {socialLinks.instagram && (
                <li>
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <Icon name="instagram" size={20} className="iconsax" />
                  </a>
                </li>
              )}
              {socialLinks.youtube && (
                <li>
                  <a
                    href={socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                  >
                    <Icon name="youtube" size={20} className="iconsax" />
                  </a>
                </li>
              )}
              {socialLinks.twitter && (
                <li>
                  <a
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X"
                  >
                    <Icon name="x-twitter" size={20} className="iconsax" />
                  </a>
                </li>
              )}
              <li>
                <a
                  href={socialLinks.whatsapp || "https://wa.me/919866610415"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  <Icon name="whatsapp" size={20} className="iconsax" />
                </a>
              </li>
              {socialLinks.linkedin && (
                <li>
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <Icon name="linkedin" size={20} className="iconsax" />
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          {/* <div className="col-lg-2 col-md-6 footer-col">
            <h4>Services</h4>
            <ul className="footer-list">
              <li><Link to="/#services">City Rides</Link></li>
              <li><Link to="/#services">Outstation Rides</Link></li>
              <li><Link to="/#services">Rental Rides</Link></li>
              <li><Link to="/#services">Corporate Travel</Link></li>
            </ul>
          </div> */}

          {/* Information */}
          <div className="col-lg-2 col-md-6 footer-col">
            <h4>Information</h4>
            <ul className="footer-list">
              <li><Link to="/terms-conditions">Terms &amp; Conditions</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/refund-policy">Refund Policy</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 footer-col">
            <h4>Contact Us</h4>
            <ul className="footer-contact-info">
              <li>
                <Icon name="location" size={48} className="iconsax" />
                <span>{address}</span>
              </li>
              <li>
                <Icon name="phone" size={20} className="iconsax" />
                <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
              </li>
              <li>
                <Icon name="direct-notification" size={20} className="iconsax" />
                <a href={`mailto:${email}`}>{email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="row">
            <div className="col-md-6">
              <p className="text-white text-left opacity-50">{copyrightText}</p>
            </div>
            <div className="col-md-6">
              <p className="text-white text-right opacity-50">
                Designed & Developed By{' '}
                <a
                  className="text-white"
                  href="https://moironix.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Moironix Software Solutions
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;