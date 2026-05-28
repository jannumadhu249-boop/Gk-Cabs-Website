import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS, BASE_URL } from '../config/api';

function TermsConditions() {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.HOME_SCREEN, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();
        if (data.success) {
          setPageData({
            policies: data.policies,
            homepageImage: data.homepage?.mainImage || data.homepage?.bannerImage
          });
        } else {
          throw new Error(data.message || 'Failed to load');
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
    if (pageData) {
      document.title = "Terms & Conditions - Gk Cabs";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', "Read the Terms & Conditions of Gk Cabs to understand the rules and guidelines for using our taxi services.");
      }
    }
  }, [pageData]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-4" role="alert">
        Error: {error}
      </div>
    );
  }

  const heroImage = pageData?.homepageImage
    ? `${BASE_URL}${pageData.homepageImage}`
    : null;
  const policyText = pageData?.policies?.termsAndCondition || '';
  const policyHtml = policyText.replace(/\n/g, '<br>');

  return (
    <>
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container" data-aos="fade-up">
          <h1 className="text-white display-4 fw-bold mb-0">Terms &amp; Conditions - GKCABS</h1>
          <nav className="breadcrumb-navbar" aria-label="breadcrumb">
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Terms &amp; Conditions
              </li>
            </ul>
          </nav>
        </div>
      </section>

      {/* Policy Content */}
      <section className="section-b-space section-t-space content-section">
        <div className="container">
          <div
            data-aos="fade-up"
            dangerouslySetInnerHTML={{ __html: policyHtml }}
          />
        </div>
      </section>
    </>
  );
}

export default TermsConditions;