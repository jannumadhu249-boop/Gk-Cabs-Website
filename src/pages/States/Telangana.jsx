import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/Icon';

const routes = [
  'Telangana', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
  'Chandigarh', 'Chhattisgarh', 'Goa', 'Gujarat', 'Jharkhand',
  'Karnataka', 'Rajasthan', 'Tamil Nadu', 'Uttar Pradesh',
  'Jammu & Kashmir', 'Puducherry', 'Delhi', 'Haryana', 'Himachal Pradesh',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
  'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Sikkim', 'Tripura',
  'Uttarakhand', 'West Bengal',
];

const popularDistrictsInTelangana = [
  'Hyderabad', 'Ranga Reddy', 'Karimnagar', 'Warangal', 'Khammam',
  'Nalgonda', 'Mahabubnagar', 'Adilabad', 'Medak', ' Nizamabad',
  'Jagtial', 'Siddipet', 'Mancherial', 'Asifabad', 'Bhupalpally',
  'Kothagudem', 'Jayashankar - Bhupalpally', 'Wanaparthy', 'Nagarkurnool', 'Jogulamba',
  'Mulugu', 'Bhadradri',
];

const popularCitiesInTelangana = [
  'Hyderabad', 'Warangal', 'Karimnagar', 'Nizamabad', 'Khammam', 'Nalgonda', 'Mahabubnagar', 'Adilabad', 'Siddipet', 'Mancherial', 'Jagtial',
  'Suryapet', 'Miryalaguda', 'Ramagundam', 'Bodhan', 'Kamareddy', 'Kothagudem',
  'Wanaparthy', 'Nagarkurnool', 'Gadwal', 'Bhongir', 'Medak', 'Vikarabad', 'Asifabad', 'Mulugu',
];



function Telangana() {
  useEffect(() => {
    new window.Swiper('#testimonialSlider', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      speed: 1500,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  }, []);

  const cardColors = ['#FFF5F5', '#F5FAFF', '#FFFBF0', '#F5FFF5', '#FCF5FF', '#FFFFF0'];

  return (
    <div className="state-page-wrapper">
      {/* ── Breadcrumb Section ── */}
      <section className="contact-hero">
        <div className="container" data-aos="fade-up">
          <h1 className="text-white display-4 fw-bold mb-0">Cab Service in Telangana</h1>
          <nav className="breadcrumb-navbar" aria-label="breadcrumb">
            <ul className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Telangana</li>
            </ul>
          </nav>
        </div>
      </section>


      {/* ── Telangana Spotlight Section ── */}
      <section className="spotlight-section section-b-space py-5">
        <div className="container">
          <div className="row align-items-center g-lg-5 g-4">
            <div className="col-lg-12" data-aos="fade-left">
              <div className="spotlight-content ps-lg-4">
                <h2 className="mb-3 display-6 fw-bold">Why GK Cabs is Telangana's <span className="text-primary text-gradient">Preferred Choice</span></h2>
                <p className="text-muted mb-4">
                  Telangana is a land of rapid growth and deep-rooted heritage. From the tech-driven lanes of Hitech City to the historic walls of Warangal, our cab services are woven into the fabric of the state, providing reliable transportation for millions.
                </p>

                <div className="row g-4">
                  <div className="col-md-6 spotlight-item">
                    <div className="d-flex align-items-start">
                      <div>
                        <h6 className="fw-bold mb-1">RGIA Specialist</h6>
                        <p className="small text-muted mb-0">Dedicated airport transfers to Rajiv Gandhi International Airport with 24/7 availability.</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 spotlight-item">
                    <div className="d-flex align-items-start">
                      <div>
                        <h6 className="fw-bold mb-1">State-Wide Network</h6>
                        <p className="small text-muted mb-0">Connecting Hyderabad with Nizamabad, Karimnagar, and Ramagundam seamlessly.</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 spotlight-item">
                    <div className="d-flex align-items-start">
                      <div>
                        <h6 className="fw-bold mb-1">IT Corridor Cabs</h6>
                        <p className="small text-muted mb-0">Specialized corporate taxi solutions for Hitech City, Gachibowli, and Financial District.</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 spotlight-item">
                    <div className="d-flex align-items-start">
                      <div>
                        <h6 className="fw-bold mb-1">Heritage Tourism</h6>
                        <p className="small text-muted mb-0">Reliable local rentals for tours to Golconda Fort, Charminar, and Ramappa Temple.</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 spotlight-item mt-4">
                    <div className="p-3 bg-light rounded-3 border-start border-primary border-4">
                      <p className="mb-0 font-italic small text-dark">
                        <strong>Did you know?</strong> Telangana has the most progressive transport policies in India, and GK Cabs is proud to be at the forefront of providing eco-friendly and tech-enabled rides across all 33 districts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Popular Districts Section ── */}
      <section className="districts-section section-b-space">
        <div className="container">
          <div className="title mb-5">
            <h3>Popular Districts in Telangana</h3>
            <p className="text-muted">Direct cab services across major districts</p>
          </div>
          <div className="row g-3">
            {popularDistrictsInTelangana.map((route, i) => (
              <div key={i} className="col-xl-3 col-lg-4 col-md-6">
                <div className="route-card-new p-3 rounded-3 shadow-sm border bg-white d-flex align-items-center">
                  <div className="icon-circle bg-opacity-10 text-primary me-3">
                    <Icon name="location" size={18} />
                  </div>
                  <span className="fw-medium text-dark">{route}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular Cities Section ── */}
      <section className="cities-section section-b-space bg-light">
        <div className="container">
          <div className="title mb-5">
            <h3>Popular Cities in Telangana</h3>
            <p className="text-muted">Seamless travel between major urban hubs</p>
          </div>
          <div className="row g-3">
            {popularCitiesInTelangana.map((route, i) => (
              <div key={i} className="col-xl-3 col-lg-4 col-md-6">
                <div className="route-card-new p-3 rounded-3 shadow-sm border bg-white d-flex align-items-center">
                  <div className="icon-circle bg-opacity-10 text-primary me-3">
                    <Icon name="location" size={18} />
                  </div>
                  <span className="fw-medium text-dark">{route}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

export default Telangana;
