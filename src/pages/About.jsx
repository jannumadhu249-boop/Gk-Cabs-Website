// import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MobileAppSchema from '../components/MobileAppSchema';
import { API_ENDPOINTS, base_url, getHomeScreenData, getCachedHomeData } from '../config/api';
import './About.css';

function About() {
  const [homeData, setHomeData] = useState(getCachedHomeData);
  const [aboutUs, setAboutUs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutRes, homeJson] = await Promise.all([
          fetch(API_ENDPOINTS.ABOUT_US, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          }),
          getHomeScreenData()
        ]);

        if (!aboutRes.ok) throw new Error(`About API error: ${aboutRes.status}`);

        const aboutJson = await aboutRes.json();

        if (aboutJson.success) {
          setAboutUs(aboutJson.aboutus);
        } else {
          throw new Error(aboutJson.message || 'Failed to load about data');
        }

        if (homeJson && homeJson.success) {
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
          lazy: true,
        };

        if (document.querySelector('#aboutHeroUserSlider')) {
          new window.Swiper('#aboutHeroUserSlider', heroSwiperConfig);
        }
        if (document.querySelector('#aboutHeroDriverSlider')) {
          new window.Swiper('#aboutHeroDriverSlider', heroSwiperConfig);
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [homeData]);

  // Loading state
  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted">Loading...</p>
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

  // Only require aboutUs, homeData is optional for hero
  if (!aboutUs) {
    return (
      <div className="alert alert-warning m-4" role="alert">
        Unable to load about content. Please refresh the page.
      </div>
    );
  }

  const { homepage, contactus } = homeData || {};
  const imageBaseUrl = base_url;

  return (
    <>
      <MobileAppSchema />
      
      {/* ── Hero Section with Phones (only if homeData loaded) ── */}
      {homeData && homepage && (
        <section 
          className="home-wrapper about-hero-section" 
          id="about-hero" 
          style={{ 
            position: 'relative', 
            zIndex: 1, 
            minHeight: '700px',
            paddingTop: '60px',
            paddingBottom: '80px',
            overflow: 'visible'
          }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-6 col-lg-6">
                <div className="home-content" data-aos="fade-right">
                  <div>
                    <h5 className="mb-3">{homepage?.mainName}</h5>
                    <h1 className="fw-bold mb-3 display-5">
                      <span>{homepage?.heroSubTitle}</span>{homepage?.subTitle}
                    </h1>
                    {homepage?.mainDecription && (
                      <div className="text-muted mb-4 lead" dangerouslySetInnerHTML={{ __html: homepage.mainDecription }} />
                    )}
                    {contactus && (
                      <div className="button-part d-flex gap-3 align-items-center flex-wrap">
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
                            <img 
                              src={`${imageBaseUrl}${img}`} 
                              className="screen-img" 
                              alt="User App"
                              loading="lazy"
                            />
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
                            <img 
                              src={`${imageBaseUrl}${img}`} 
                              className="screen-img" 
                              alt="Driver App"
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img className="img-fluid car1" src="assets/images/car.png" alt="car" loading="lazy" />
        </section>
      )}

      {/* Main Content from API */}
      <section 
        className="section-b-space section-t-space content-section" 
        style={{ 
          position: 'relative', 
          zIndex: 2, 
          clear: 'both',
          backgroundColor: '#f8f9fa',
          paddingTop: '60px',
          paddingBottom: '60px',
          overflow: 'visible'
        }}
      >
        <div className="container" style={{ overflow: 'visible' }}>
          <div
            data-aos="fade-up"
            className="about-content"
            style={{
              backgroundColor: '#ffffff',
              padding: '2rem',
              borderRadius: '1rem',
              boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,0.075)',
              overflow: 'visible',
              maxHeight: 'none',
              height: 'auto'
            }}
            dangerouslySetInnerHTML={{ __html: aboutUs?.description || '' }}
          />
        </div>
      </section>
    </>
  );
}

export default About;
