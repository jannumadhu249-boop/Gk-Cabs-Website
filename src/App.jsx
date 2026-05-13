import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Icon from './components/Icon';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import TermsConditions from './pages/TermsConditions';
import Telangana from './pages/States/Telangana';
import Hyderabad from './pages/Districts/Hyderbad';
import Warangal from './pages/Cities/Warangal';
import LocationPage from './pages/LocationPage';

import Safety from './pages/Safety';
import Careers from './pages/Careers';
import Media from './pages/Media';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.AOS) window.AOS.refreshHard();
  }, [pathname]);

  return null;
}

function AppLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/safety" element={<Safety />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/media" element={<Media />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/:slug" element={<LocationPage type="state" />} />
        <Route path="/:slug" element={<LocationPage type="district" />} />
        <Route path="/:slug" element={<LocationPage type="city" />} />

        {/* Support for legacy special URLs handled by dynamic page */}
        <Route path="/cab-service-in-telangana" element={<LocationPage type="state" slugOverride="telangana" />} />
        <Route path="/cab-service-in-hyderabad" element={<LocationPage type="district" slugOverride="hyderabad" />} />
        <Route path="/cab-service-in-warangal" element={<LocationPage type="city" slugOverride="warangal" />} />

      </Routes>
      <Footer />

      {/* Scroll to top button */}
      <a
        className="scroll scroll-to-top"
        href="#top"
        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        aria-label="Scroll to top"
      >
        <Icon name="chevron-up" size={20} />
      </a>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
