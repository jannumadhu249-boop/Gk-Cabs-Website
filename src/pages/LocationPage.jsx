import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import Icon from '../components/Icon';

const API_URL = 'http://88.222.213.67:5090/v1/gkcabs/web/get-home-screen';

function LocationPage({ type: propType, slugOverride }) {
  const { slug: urlSlug } = useParams();
  const slug = slugOverride || urlSlug;
  // const path = useLocation().pathname;
  
  // Determine type: from props, or from URL path (state, district, city)
  const type = propType;

  const [homeData, setHomeData] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setHomeData(data);
 const allLocations = [
  ...(data.states || []),
  ...(data.districts || []),
  ...(data.cities || []),
];

const found = allLocations.find(item => item.slug === slug);
          if (found) setLocation(found);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [type, slug]);

  useEffect(() => {
    if (location) {
      document.title = location.metaTitle || `${location.name} - Gk Cabs`;
      
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', location.metaDescription || `Premium cab services in ${location.name}. Book your ride now with Gk Cabs.`);
      }

      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', location.metaKeyWords || `Gk Cabs, taxi booking, cab service, ${location.name}`);
      }
    }
  }, [location]);

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

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  if (!location) {
    return (
      <div className="container text-center mt-5">
        <h2>Location not found</h2>
        <Link to="/" className="btn theme-btn mt-3">Back to Home</Link>
      </div>
    );
  }

  const { homepage, contactus } = homeData || {};
  const imageBaseUrl = 'http://88.222.213.67:5090/';

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

      <section className="section-b-space section-t-space content-section">
        <div className="container">
          {location.description ? (
            <div data-aos="fade-up" dangerouslySetInnerHTML={{ __html: location.description }} />
          ) : (
            <div data-aos="fade-up" className="text-center">
              <h2>{location.name}</h2>
              <p className="lead">Cab services available in this  {location.locationType}.</p>
              <Icon name="location" size={48} className="text-primary" />
              <p className="mt-3">More details coming soon. Book a ride with Gk Cabs for the best fares!</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default LocationPage;
