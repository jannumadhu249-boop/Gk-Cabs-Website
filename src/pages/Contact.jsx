import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';

const CONTACT_API = 'http://88.222.213.67:5090/v1/gkcabs/web/get-contactus';
const ENQUIRY_API = 'http://88.222.213.67:5090/v1/gkcabs/web/enquiry/addenquiry';
const IMAGE_BASE = 'http://88.222.213.67:5090';

function Contact() {
  // Contact data state
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  // Fetch contact info on mount
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch(CONTACT_API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();
        if (data.success) {
          setContactData(data.contactus);
        } else {
          throw new Error(data.message || 'Failed to load contact data');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, []);

  useEffect(() => {
    if (contactData) {
      document.title = "Contact Us - Gk Cabs";

      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', "Get in touch with Gk Cabs for any queries, bookings, or support. We are available 24/7 to assist you.");
      }

      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', "contact Gk Cabs, taxi support, cab booking help, Riders service");
      }
    }
  }, [contactData]);

  // Form input handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Enquiry form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        subject: formData.subject,
        description: formData.message, // map "message" to "description"
      };

      const res = await fetch(ENQUIRY_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (result.success) {
        alert('Enquiry submitted successfully! We will get back to you soon.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      alert('Submission error: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="alert alert-danger m-4" role="alert">
        Error loading contact information: {error}
      </div>
    );
  }

  // Derived data
  const heroImage = contactData?.image ? `${IMAGE_BASE}/${contactData.image}` : null;
  const mapEmbedUrl = `${contactData?.map || ''}`;

  return (
    <>
      {/* Hero with dynamic background */}
      <section
        className="contact-hero"
        style={
          heroImage
            ? {
              backgroundImage: `url(${heroImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
            : {}
        }
      >
        <div className="container" data-aos="fade-up">
          <h1 className="text-white display-4 fw-bold mb-0">Get In Touch</h1>
          <nav className="breadcrumb-navbar" aria-label="breadcrumb">
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Contact Us
              </li>
            </ul>
          </nav>
        </div>
      </section>

      {/* Contact Info Cards */}
      {/* <section className="contact-info-section">
        <div className="container">
          <div className="row g-4 justify-content-center">
            <div className="col-lg-4 col-md-6">
              <div className="contact-card" data-aos="fade-up" data-aos-delay="100">
                <div className="icon-box">
                  <Icon name="location" size={28} />
                </div>
                <h4>Head Office</h4>
                <p>{contactData?.addressLineOne || 'Not available'}</p>
                {contactData?.addressLineTwo && (
                  <p className="text-muted">{contactData.addressLineTwo}</p>
                )}
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="contact-card" data-aos="fade-up" data-aos-delay="200">
                <div className="icon-box">
                  <Icon name="phone" size={28} />
                </div>
                <h4>Phone Numbers</h4>
                {contactData?.phoneOne && (
                  <p>
                    <a href={`tel:${contactData.phoneOne}`}>{contactData.phoneOne}</a>
                  </p>
                )}
                {contactData?.phoneTwo && (
                  <p>
                    <a href={`tel:${contactData.phoneTwo}`}>{contactData.phoneTwo}</a>
                  </p>
                )}
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="contact-card" data-aos="fade-up" data-aos-delay="300">
                <div className="icon-box">
                  <Icon name="direct-notification" size={28} />
                </div>
                <h4>Email Addresses</h4>
                {contactData?.emailOne && (
                  <p>
                    <a href={`mailto:${contactData.emailOne}`}>{contactData.emailOne}</a>
                  </p>
                )}
                {contactData?.emailTwo && (
                  <p>
                    <a href={`mailto:${contactData.emailTwo}`}>{contactData.emailTwo}</a>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="contact-info-section">
        <div className="container">
          <div className="row g-4 justify-content-center">

            {/* Address Card */}
            {(contactData?.addressLineOne) && (
              <div className="col-lg-4 col-md-6">
                <div
                  className="contact-card"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <div className="icon-box">
                    <Icon name="location" size={28} />
                  </div>

                  <h4>
                    {contactData?.addressLineOne
                      ? "Head Office"
                      : ""}
                  </h4>

                  {contactData?.addressLineOne && (
                    <p>{contactData.addressLineOne}</p>
                  )}

                </div>
              </div>
            )}

            {(contactData?.addressLineTwo) && (
              <div className="col-lg-4 col-md-6">
                <div
                  className="contact-card"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <div className="icon-box">
                    <Icon name="location" size={28} />
                  </div>

                  <h4>
                    {contactData?.addressLineTwo
                      ? "Branch Office" : ""}
                  </h4>

                  {contactData?.addressLineTwo && (
                    <p className="text-muted">
                      {contactData.addressLineTwo}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Phone Card */}
            {(contactData?.phoneOne || contactData?.phoneTwo) && (
              <div className="col-lg-4 col-md-6">
                <div
                  className="contact-card"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <div className="icon-box">
                    <Icon name="phone" size={28} />
                  </div>

                  <h4>Phone Numbers</h4>

                  {contactData?.phoneOne && (
                    <p>
                      <a href={`tel:${contactData.phoneOne}`}>
                        {contactData.phoneOne}
                      </a>
                    </p>
                  )}

                  {contactData?.phoneTwo && (
                    <p>
                      <a href={`tel:${contactData.phoneTwo}`}>
                        {contactData.phoneTwo}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Email Card */}
            {(contactData?.emailOne || contactData?.emailTwo) && (
              <div className="col-lg-4 col-md-6">
                <div
                  className="contact-card"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <div className="icon-box">
                    <Icon name="direct-notification" size={28} />
                  </div>

                  <h4>Email Addresses</h4>

                  {contactData?.emailOne && (
                    <p>
                      <a href={`mailto:${contactData.emailOne}`}>
                        {contactData.emailOne}
                      </a>
                    </p>
                  )}

                  {contactData?.emailTwo && (
                    <p>
                      <a href={`mailto:${contactData.emailTwo}`}>
                        {contactData.emailTwo}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <div className="map-container" data-aos="fade-up">
            <iframe
              className="gmap_iframe"
              width="100%"
              title="GK Cabs Location"
              src={mapEmbedUrl}
            ></iframe>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-wrapper">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="form-container" data-aos="zoom-in">
                <div className="title text-center mb-5">
                  <h2>Send Us a Message</h2>
                  <p className="mt-2">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                          id="name"
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                          id="phone"
                          type="tel"
                          name="phone"
                          className="form-control"
                          placeholder="Enter your phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          maxLength={10}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <input
                          id="subject"
                          name="subject"
                          className="form-control"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder='Enter Subject'
                          required
                        />
                        {/* <option value="">Select Subject</option>
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Booking Issue">Booking Issue</option>
                          <option value="Feedback">Feedback</option>
                          <option value="Other">Other</option>
                        </select> */}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="message">Your Message</label>
                        <textarea
                          id="message"
                          name="message"
                          className="form-control"
                          rows="5"
                          placeholder="How can we help you?"
                          value={formData.message}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-12 text-center mt-4">
                      <button
                        type="submit"
                        className="btn theme-btn px-5 py-3 mx-auto"
                        disabled={submitting}
                      >
                        {submitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Sending...
                          </>
                        ) : (
                          'Send Message'
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Links (optional) */}
      {/* {contactData && (
        <section className="social-links-section py-4">
          <div className="container text-center">
            <h5 className="mb-3">Connect with us</h5>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              {contactData.facebook && (
                <a href={contactData.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary">
                  <Icon name="facebook" /> Facebook
                </a>
              )}
              {contactData.twitter && (
                <a href={contactData.twitter} target="_blank" rel="noopener noreferrer" className="btn btn-outline-info">
                  <Icon name="twitter" /> Twitter
                </a>
              )}
              {contactData.instagram && (
                <a href={contactData.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-outline-danger">
                  <Icon name="instagram" /> Instagram
                </a>
              )}
              {contactData.youtube && (
                <a href={contactData.youtube} target="_blank" rel="noopener noreferrer" className="btn btn-outline-danger">
                  <Icon name="youtube" /> YouTube
                </a>
              )}
              {contactData.linkedin && (
                <a href={contactData.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary">
                  <Icon name="linkedin" /> LinkedIn
                </a>
              )}
              {contactData.whatsapp && (
                <a href={contactData.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-outline-success">
                  <Icon name="whatsapp" /> WhatsApp
                </a>
              )}
            </div>
          </div>
        </section>
      )} */}
    </>
  );
}

export default Contact;