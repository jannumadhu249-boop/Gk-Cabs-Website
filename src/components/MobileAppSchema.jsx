import { useEffect } from 'react';

const mobileAppSchemaData = {
  "@context": "http://schema.org/",
  "@type": "MobileApplication",
  "name": "GKCABS",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "65330"
  },
  "applicationCategory": "Travel",
  "URL": "https://www.gk.com/",
  "operatingSystem": "Android, iOS",
  "offers": {
    "@type": "Offer",
    "price": "0", 
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "GKCABS"
    }
  }
};

/**
 * MobileAppSchema Component
 * Ensures the MobileApplication JSON-LD schema script is present in the <head> tag
 * for every page/component across the application.
 */
function MobileAppSchema() {
  useEffect(() => {
    let script = document.getElementById('gkcabs-mobile-app-schema');
    if (!script) {
      script = document.createElement('script');
      script.id = 'gkcabs-mobile-app-schema';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(mobileAppSchemaData, null, 2);
      document.head.appendChild(script);
    }
  }, []);

  return null;
}

export default MobileAppSchema;
