import './Careers.css';
import Icon from '../components/Icon';

const Careers = () => {
  return (
    <div className="careers-page">
      {/* Hero Section */}
      <section className="careers-hero py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="hero-content fade-in">
                <h1 className="display-3 fw-bold mb-4">Be a part of our team.</h1>
                <p className="lead text-muted mb-5">
                  We are so glad you want to join us in exploring a world of endless opportunities at Gk Cabs. Let's find a spot for you.
                </p>
                <button className="btn btn-primary btn-lg rounded-pill px-5 py-3 fw-bold shadow-sm" style={{ backgroundColor: '#174897' }}>
                  View Jobs
                </button>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-image-collage">
                <div className="collage-bg-shape"></div>
                <div className="collage-img main-team">
                  <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Team" />
                </div>
                <div className="collage-img sub-team">
                  <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=400&q=80" alt="Meeting" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why work with us */}
      <section className="why-work py-5 bg-white">
        <div className="container">
          <div className="section-header mb-5">
            <h2 className="fw-bold section-title-line">Why work with us</h2>
          </div>
          <div className="row g-4 text-center mb-5">
            <div className="col-md-4">
              <div className="why-card p-4">
                <div className="icon-wrapper mb-4 mx-auto">
                  <Icon name="wallet-money" size={48} color="black" />
                </div>
                <p className="fw-medium">We pride ourselves on rewarding great work with great compensation.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="why-card p-4">
                <div className="icon-wrapper mb-4 mx-auto">
                  <Icon name="clock" size={48} color="black" />
                </div>
                <p className="fw-medium">Flexible hours and vacation. Night owls welcome.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="why-card p-4">
                <div className="icon-wrapper mb-4 mx-auto">
                  <Icon name="user-group" size={48} color="black" />
                </div>
                <p className="fw-medium">Meet new cultures and enjoy our crew from all over the world</p>
              </div>
            </div>
          </div>

          {/* Office Gallery */}
          <div className="office-gallery row g-3 mt-5">
            <div className="col-md-4">
              <div className="gallery-item rounded-4 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80" alt="Office 1" className="img-fluid" />
              </div>
            </div>
            <div className="col-md-4">
              <div className="gallery-item rounded-4 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=600&q=80" alt="Office 2" className="img-fluid" />
              </div>
            </div>
            <div className="col-md-4">
              <div className="gallery-item rounded-4 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80" alt="Office 3" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="employee-testimonials py-5 bg-light-soft">
        <div className="container py-5">
          <div className="section-header text-center mb-5">
            <h2 className="fw-bold section-title-line center">What our employees say</h2>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="testimonial-card p-4 bg-white rounded-4 shadow-sm h-100">
                    <div className="d-flex gap-4 align-items-start">
                      <div className="emp-photo rounded-circle overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Employee" />
                      </div>
                      <div className="emp-quote">
                        <p className="text-muted small italic">
                          "Gk Cabs, for me holds a special place. I was skeptical before joining. But after I joined, the experience speaks for itself. Hardworking and goal oriented team as well as Manager. Everyday, I learn..."
                        </p>
                        <h6 className="fw-bold mb-0 mt-3">Pritha Mistri</h6>
                        <span className="text-muted small">Cluster Manager</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="testimonial-card p-4 bg-white rounded-4 shadow-sm h-100">
                    <div className="d-flex gap-4 align-items-start">
                      <div className="emp-photo rounded-circle overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Employee" />
                      </div>
                      <div className="emp-quote">
                        <p className="text-muted small italic">
                          "Gk Cabs has been Home for me. Pleasant multicultural environment and the enthusiasm which everyone around carries is infectious. Proud to be a part of Gk Cabs."
                        </p>
                        <h6 className="fw-bold mb-0 mt-3">Bhavana Rathi</h6>
                        <span className="text-muted small">CRM Specialist</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
