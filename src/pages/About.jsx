import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ABOUT_API_URL = 'http://88.222.213.67:5090/v1/gkcabs/web/get-about-us';
const HOME_API_URL = 'http://88.222.213.67:5090/v1/gkcabs/web/get-home-screen';
const IMAGE_BASE = 'http://88.222.213.67:5090';

function About() {
  const [aboutUs, setAboutUs] = useState(null);
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutRes, homeRes] = await Promise.all([
          fetch(ABOUT_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          }),
          fetch(HOME_API_URL, {
            method: 'POST',
          })
        ]);

        if (!aboutRes.ok) throw new Error(`About API error: ${aboutRes.status}`);
        if (!homeRes.ok) throw new Error(`Home API error: ${homeRes.status}`);

        const aboutJson = await aboutRes.json();
        const homeJson = await homeRes.json();

        if (aboutJson.success) {
          setAboutUs(aboutJson.aboutus);
        } else {
          throw new Error(aboutJson.message || 'Failed to load about data');
        }

        if (homeJson.success) {
          setHomeData(homeJson);
        }

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (aboutUs) {
      document.title = aboutUs.title || "About Us - Gk Cabs";
      
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', "Learn more about Gk Cabs, our mission, and why we are India's leading taxi service provider.");
      }

      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', "Gk Cabs mission, about taxi service, professional drivers, reliable transport");
      }
    }
  }, [aboutUs]);

  useEffect(() => {
    if (homeData) {
      const timer = setTimeout(() => {
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
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [homeData]);

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
        Error: {error}
      </div>
    );
  }

  const { homepage, contactus } = homeData || {};
  const imageBaseUrl = `${IMAGE_BASE}/`;

  return (
    <>
      {/* ── Hero Section (Replaces Breadcrumb) ── */}
      <section className="home-wrapper" id="home">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6">
              <div className="home-content" data-aos="fade-right">
                <div>
                  <h5 className="mb-3">Taxi Booking Service</h5>
                  <h1 className="fw-bold mb-3 display-5"><span>Gk Cabs</span> - Premium Taxi Booking Solution</h1>
                  {homepage && (
                    <div className="text-muted mb-4 lead" dangerouslySetInnerHTML={{ __html: homepage.mainDecription }} />
                  )}
                  {contactus && (
                    <div className="button-part d-flex gap-3 align-items-center">
                      <h6 className="mb-0 fw-bold border-0 p-0 text-dark">Click To View :</h6>
                      <a target="_blank" rel="noopener noreferrer" href={contactus.userAppLink} className="btn theme-btn px-4">User App</a>
                      <a target="_blank" rel="noopener noreferrer" href={contactus.driverAppLink} className="btn theme-btn px-4">Driver App</a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6">
              <div className="home-img d-none d-lg-flex justify-content-center" data-aos="fade-left">
                {/* User App Phone */}
                <div className="phone mx-2">
                  <div className="screen-slider swiper" id="heroUserSlider">
                    <div className="swiper-wrapper">
                      {homepage?.userAppImages?.map((img, i) => (
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
                      {homepage?.driverAppImages?.map((img, i) => (
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


      {/* Main Content from API */}
      <section className="section-b-space section-t-space content-section">
        <div className="container">
          <div
            data-aos="fade-up"
            className="about-content"
            dangerouslySetInnerHTML={{ __html: aboutUs?.description || '' }}
          />
        </div>
      </section>

      {/* Dynamic styles to match original .why-choose-list styling */}
      <style>{`
        .about-content ul {
          list-style: none;
          padding-left: 0;
        }
        .about-content ul li {
          position: relative;
          padding-left: 25px;
          margin-bottom: 8px;
        }
        .about-content ul li::before {
          content: '✔';
          position: absolute;
          left: 0;
          color: #f68e1f; /* your brand orange – adjust if needed */
          font-weight: bold;
        }
        .about-content h2 {
          margin-top: 1.5rem;
        }
        .about-content h4 {
          margin-top: 1.2rem;
        }
      `}</style>
    </>
  );
}

export default About;