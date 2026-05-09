import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';

const imageBaseUrl = 'http://88.222.213.67:5090/';

function Home() {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('user');

  useEffect(() => {
    fetch('http://88.222.213.67:5090/v1/gkcabs/web/get-home-screen', {
      method: 'POST'
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          setHomeData(json);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching home data:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (homeData) {
      document.title = homepage?.mainName || "Gk Cabs - Premium Taxi Booking Solution";
      
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', "Gk Cabs offers reliable, safe, and affordable taxi services in Hyderabad and across India. Book your ride now.");
      }

      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', "Gk Cabs, taxi booking, Hyderabad cabs, car rental, airport taxi");
      }

      // Small timeout to ensure DOM is fully ready
      const timer = setTimeout(() => {
        // Testimonial Slider
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

        // App Screenshot Sliders (Inside Phones)
        const heroSwiperConfig = {
          slidesPerView: 1,
          loop: true,
          autoplay: { delay: 2000, disableOnInteraction: false },
        };

        if (document.querySelector('#heroUserSlider')) {
          new window.Swiper('#heroUserSlider', heroSwiperConfig);
        }
        if (document.querySelector('#heroDriverSlider')) {
          new window.Swiper('#heroDriverSlider', heroSwiperConfig);
        }

        // Feature screenshot sliders (Tabs)
        const featSwiperConfig = {
          slidesPerView: 2,
          spaceBetween: 15,
          loop: true,
          autoplay: { delay: 2500, disableOnInteraction: false },
          breakpoints: {
            576: { slidesPerView: 3 },
            991: { slidesPerView: 4 },
            1200: { slidesPerView: 5 },
          },
        };

        if (document.querySelector('#userSlider')) {
          new window.Swiper('#userSlider', featSwiperConfig);
        }
        if (document.querySelector('#driverSlider')) {
          new window.Swiper('#driverSlider', featSwiperConfig);
        }
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [homeData]);

  const cardColors = ['#FFF5F5', '#F5FAFF', '#FFFBF0', '#F5FFF5', '#FCF5FF', '#FFFFF0'];

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!homeData) return null;

  const { homepage, states, districts, cities, testimonials, faqs, whychooseus, servicecategorys, contactus } = homeData;

  return (
    <div className="home-page-container overflow-hidden">
      {/* ── Hero Section ── */}
      <section className="home-wrapper" id="home">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6">
              <div className="home-content" data-aos="fade-right">
                <div>
                  <h5 className="mb-3">{homepage.mainName}</h5>
                  <h1 className="fw-bold mb-3 display-5"><span>{homepage.heroSubTitle}</span>{homepage.subTitle}</h1>
                  <div className="text-muted mb-4 lead" dangerouslySetInnerHTML={{ __html: homepage.mainDecription }} />
                  <div className="button-part d-flex gap-3 align-items-center">
                    <h6 className="mb-0 fw-bold border-0 p-0 text-dark">Click To View :</h6>
                    <a target="_blank" rel="noopener noreferrer" href={contactus.userAppLink} className="btn theme-btn px-4">User App</a>
                    <a target="_blank" rel="noopener noreferrer" href={contactus.driverAppLink} className="btn theme-btn px-4">Driver App</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6">
              <div className="home-img d-none d-lg-flex justify-content-center" data-aos="fade-left">
                {/* User App Phone */}
                <div className="phone mx-2">
                  <div className="screen-slider swiper" id="heroUserSlider">
                    <div className="swiper-wrapper">
                      {homepage.userAppImages?.map((img, i) => (
                        <div className="swiper-slide" key={i}>
                          <img src={`${imageBaseUrl}${img}`} className="screen-img" alt="User App" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Driver App Phone */}
                <div className="phone mx-2">
                  <div className="screen-slider swiper" id="heroDriverSlider">
                    <div className="swiper-wrapper">
                      {homepage.driverAppImages?.map((img, i) => (
                        <div className="swiper-slide" key={i}>
                          <img src={`${imageBaseUrl}${img}`} className="screen-img" alt="Driver App" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img className="img-fluid car1" src="assets/images/car.png" alt="car" />
      </section>

      {/* ── Banner Image (Middle) ── */}
      <div className="app-banner-container overflow-hidden w-100 bg-white">
        <img className="img-fluid app-banner" src={homepage.bannerImage ? `${imageBaseUrl}${homepage.bannerImage}` : "assets/images/app-banner.png"} alt="Banner" style={{ width: '100%', objectFit: 'cover' }} />
      </div>

      {/* ── Application Showcase Sections ── */}
      <section className="application-wrapper section-b-space overflow-hidden py-5">
        <div className="container">
          {homepage.section && homepage.section.map((sec, i) => (
            <div key={i} className={`row align-items-center g-4 ${i !== 0 ? 'mt-5' : ''}`}>
              <div className={`col-md-5 ${i % 2 !== 0 ? 'order-md-2' : 'order-md-1 order-2'}`}>
                <div className="application-content" data-aos={i % 2 !== 0 ? "fade-left" : "fade-right"}>
                  <h2 className="fw-bold">{sec.name}</h2>
                  <div className="text-muted" dangerouslySetInnerHTML={{ __html: sec.description }} />
                </div>
              </div>
              <div className={`col-md-6 offset-md-1 d-flex align-items-center justify-content-center ${i % 2 !== 0 ? 'order-md-1' : 'order-md-2 order-1'}`}>
                <div className="application-img">
                  <img className="img-fluid app-img" src={`${imageBaseUrl}${sec.image}`} alt={sec.name} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <img className="img-fluid effect1" src="assets/images/effect.png" alt="effect" />
        <img className="img-fluid effect2" src="assets/images/effect.png" alt="effect" />
      </section>

      {/* ── Services Section ── */}
      <section id="services" className="service-section section-b-space py-5">
        <div className="container">
          <div className="title text-center mb-5">
            <h3>Our Premium Services</h3>
            <p>Experience the best-in-class taxi services tailored for your every need.</p>
          </div>
          <div className="row g-4 justify-content-center">
            {servicecategorys.map((service, i) => (
              <div key={i} className="col-xl-3 col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="service-card p-4 rounded-4 h-100 text-center border-0 shadow-sm bg-white">
                  <div className="service-icon mb-4 mx-auto d-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-circle" style={{ width: '80px', height: '80px' }}>
                    {service.image ? (
                      <img src={`${imageBaseUrl}${service.image}`} alt={service.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                    ) : (
                      <Icon name="car" size={35} className="text-primary" />
                    )}
                  </div>
                  <h5 className="fw-bold">{service.name}</h5>
                  <div className="text-muted small" dangerouslySetInnerHTML={{ __html: service.description || "" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us Section ── */}
      <section id="feature" className="features-wrapper section-b-space py-5">
        <div className="container">
          <div className="title text-center mb-5">
            <h3 className="text-white">Why Choose Gk Cabs?</h3>
            <p className="text-white opacity-75">We are committed to providing you with the best travel experience. With a focus on safety, comfort, 
              and affordability, Gk Cabs is your trusted partner for every journey.</p>
          </div>
          <div className="row g-4">
            {whychooseus.map((feature, i) => (
              <div key={i} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="card-body h-100 p-4 rounded-4 shadow-sm">
                  <div className="d-flex align-items-center mb-3">
                    <div className="icon-box me-3 bg-primary bg-opacity-20 p-2 rounded-3 d-flex align-items-center justify-content-center"
                        style={{ width: '48px', height: '48px' }}>
                      {feature.image ? (
                        <img
                          src={`${imageBaseUrl}${feature.image}`}
                          alt={feature.name}
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                      ) : (
                        <Icon name="star" size={24} className="text-primary" />
                      )}
                    </div>
                    <h5 className="mb-0 fw-bold">{feature.name}</h5>
                  </div>
                  <div className="text-light opacity-75 small" dangerouslySetInnerHTML={{ __html: feature.description }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── App Interfaces Section ── */}
      <section className="screenshots-section section-b-space overflow-hidden py-5">
        <div className="container">
          <div className="title text-center mb-5">
            <h3>Gk Cabs App Interfaces</h3>
            <p>Explore our user-friendly and intuitive app interfaces designed for both riders and drivers.
               Simple, clean, and efficient navigation for a seamless experience.</p>
          </div>

          <ul className="nav nav-pills screenshots-tab mb-5" role="tablist">
            <li className="nav-item">
              <button className={`nav-link px-4 ${activeTab === 'user' ? 'active' : ''}`} onClick={() => setActiveTab('user')}>User App</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link px-4 ${activeTab === 'driver' ? 'active' : ''}`} onClick={() => setActiveTab('driver')}>Driver App</button>
            </li>
          </ul>

          <div className="tab-content">
            <div className={`tab-pane fade ${activeTab === 'user' ? 'show active' : ''}`}>
              <div className="swiper" id="userSlider">
                <div className="swiper-wrapper">
                  {homepage.userAppImages?.map((img, i) => (
                    <div key={i} className="swiper-slide text-center p-2">
                      <img src={`${imageBaseUrl}${img}`} className="img-fluid rounded-4 shadow-sm" alt="User App Screen" style={{ maxHeight: '450px' }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={`tab-pane fade ${activeTab === 'driver' ? 'show active' : ''}`}>
              <div className="swiper" id="driverSlider">
                <div className="swiper-wrapper">
                  {homepage.driverAppImages?.map((img, i) => (
                    <div key={i} className="swiper-slide text-center p-2">
                      <img src={`${imageBaseUrl}${img}`} className="img-fluid rounded-4 shadow-sm" alt="Driver App Screen" style={{ maxHeight: '450px' }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <img className="img-fluid effect3" src="assets/images/effect.png" alt="effect" />
        <img className="img-fluid effect4" src="assets/images/effect.png" alt="effect" />
      </section>

      {/* ── Inner Pages Section (Missing App Image Section) ── */}
      <section id="inner-page" className="inner-page-wrapper section-b-space py-5">
        <div className="container">
          <div className="title text-center mb-0">
            <h3>Gk Cabs App Inner Pages</h3>
            <p>Explore the comprehensive set of features that make Gk Cabs the ultimate choice for your
              journey. From intuitive booking to detailed ride history, every screen is designed for your
              convenience.</p>
          </div>
        </div>
        <div className="text-center mt-4">
          <img className="img-fluid inner-page-img" src="assets/images/user-app-multi-img.png" alt="inner-pages" style={{ width: '100%' }} />
        </div>
      </section>

      {/* ── Popular Routes Sections ── */}
      <section id="routes" className="route-section section-b-space bg-light">
        <div className="container">
          <div className="py-5">
            <div className="title text-center mb-4">
              <h3>Popular States Taxi Services</h3>
              <p>Reliable and affordable taxi services for popular routes across Telangana and neighboring states.
                 Whether you're traveling for pilgrimage, tourism, or business, we've got you covered.</p>
            </div>
            <div className="row gy-3">
              {states.map((state, i) => (
                <div key={i} className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                  <div className="route-card bg-white p-3 rounded-3 shadow-sm border-0">
                    <Link to={state.slug === 'telangana' ? '/cab-service-in-telangana' : `/${state.slug}`} className="text-decoration-none d-flex align-items-center">
                      <div className="icon-circle bg-opacity-10 text-primary rounded-circle">
                        <Icon name="location" size={18} />
                      </div>
                      <span className="fw-medium text-dark">{state.name}</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="py-5">
            <div className="title text-center mb-4">
              <h3>Popular Districts Taxi Services</h3>
              <p>Reliable and affordable taxi services for popular routes across Telangana districts.
                Whether you're traveling for pilgrimage, tourism, or business, we've got you covered.</p>
            </div>
            <div className="row gy-3">
              {districts.map((dist, i) => (
                <div key={i} className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                  <div className="route-card bg-white p-3 rounded-3 shadow-sm border-0">
                    <Link to={dist.slug === 'hyderabad' ? '/cab-service-in-hyderabad' : `/${dist.slug}`} className="text-decoration-none d-flex align-items-center">
                      <div className="icon-circle bg-opacity-10 text-primary rounded-circle">
                        <Icon name="location" size={18} />
                      </div>
                      <span className="fw-medium text-dark">{dist.name}</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='py-5'>
            <div className="title text-center mb-4">
              <h3>Popular Cities Taxi Services</h3>
              <p>Reliable and affordable taxi services for popular routes across Telangana cities.
                Whether you're traveling for pilgrimage, tourism, or business, we've got you covered.</p>
            </div>
            <div className="row gy-3">
              {cities.map((city, i) => (
                <div key={i} className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                  <div className="route-card bg-white p-3 rounded-3 shadow-sm border-0">
                    <Link to={city.slug === 'warangal' ? '/cab-service-in-warangal' : `/${city.slug}`} className="text-decoration-none d-flex align-items-center">
                      <div className="icon-circle bg-opacity-10 text-primary rounded-circle">
                        <Icon name="location" size={18} />
                      </div>
                      <span className="fw-medium text-dark">{city.name}</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials Section ── */}
      <section id="testimonials" className="testimonials-section section-b-space py-5 overflow-hidden">
        <div className="container">
          <div className="title text-center mb-5">
            <h3>Client Testimonials</h3>
            <p>What our travelers say about Gk Cabs experience.</p>
          </div>
          <div className="swiper overflow-visible" id="testimonialSlider">
            <div className="swiper-wrapper">
              {testimonials.map((testimonial, i) => (
                <div key={i} className="swiper-slide h-auto">
                  <div className="card h-100 p-4 border-0 shadow-sm rounded-4" style={{ backgroundColor: cardColors[i % cardColors.length] }}>
                    <div className="d-flex align-items-center mb-3">
                      <div className="testimonial-avatar me-3 shadow-sm overflow-hidden rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: '55px', height: '55px' }}>
                        {testimonial.image ? (
                          <img src={`${imageBaseUrl}${testimonial.image}`} alt={testimonial.name} className="img-fluid w-100 h-100" style={{ objectFit: 'cover' }} />
                        ) : (
                          <h5 className="mb-0">{testimonial.name.charAt(0)}</h5>
                        )}
                      </div>
                      <div> 
                        <h6 className="mb-0 fw-bold">{testimonial.name}</h6>
                        <small className="text-muted">{testimonial.designation}</small>
                      </div>
                    </div>
                    <p className="card-text text-muted mb-3 flex-grow-1 font-italic">
                      "{testimonial.message.replace(/<[^>]+>/g, '')}"
                    </p>
                    <div className="text-warning">★★★★★</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section id="faq" className="faq-section section-b-space bg-light py-5">
        <div className="container">
          <div className="title text-center mb-5">
            <h3>Frequently Asked Questions</h3>
            <p>Clear answers to your most common inquiries.</p>
          </div>
          <div className="row align-items-center">
            {/* <div className="col-lg-5 d-none d-lg-block">
              <div className="faq-img text-center" data-aos="fade-right">
                <img src="assets/images/driver-app-img.png" alt="FAQ" className="img-fluid rounded-4 shadow-lg" style={{ maxHeight: '550px' }} />
              </div>
            </div> */}
            <div className="col-lg-8 m-auto">
              <div className="accordion custom-accordion shadow-sm rounded-4 overflow-hidden" id="faqAccordion" data-aos="fade-left">
                {faqs.map((faq, i) => (
                  <div key={i} className="accordion-item border-0 border-bottom bg-white">
                    <h2 className="accordion-header">
                      <button className={`accordion-button ${i !== 0 ? 'collapsed' : ''} py-4`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${i}`}>
                        {faq.question}
                      </button>
                    </h2>
                    <div id={`collapse${i}`} className={`accordion-collapse collapse ${i === 0 ? 'show' : ''}`} data-bs-parent="#faqAccordion">
                      <div className="accordion-body text-muted pb-4 pt-0">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
