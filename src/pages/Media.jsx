// import { useState } from 'react';
// import './Media.css';

// const Media = () => {
//     // Dummy images for gallery - you can replace these with your actual image paths
//     const galleryImages = [
//         { id: 1, src: 'assets/images/Media/Media-1.jpg', title: 'Professional Cab Service' },
//         { id: 2, src: 'assets/images/Media/Media-2.jpg', title: 'City Tours' },
//         { id: 3, src: 'assets/images/Media/Media-3.jpg', title: 'Luxury Travel' },
//         { id: 4, src: 'assets/images/Media/Media-4.jpg', title: 'Airport Transfers' },
//         { id: 5, src: 'assets/images/Media/Media-5.jpg', title: 'Safety First' },
//         { id: 6, src: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80', title: 'Experienced Drivers' },
//         { id: 7, src: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&w=600&q=80', title: 'Clean Vehicles' },
//         { id: 8, src: 'assets/images/Media/Media-1.jpg', title: '24/7 Support' },
//     ];

//     const [selectedImage, setSelectedImage] = useState(null);

//     return (
//         <div className="media-page">
//             {/* Header Section */}
//             <section className="media-header py-5 bg-dark text-white text-center">
//                 <div className="container">
//                     <h1 className="display-4 fw-bold">Our Media Gallery</h1>
//                     <p className="lead">Experience the world of Gk Cabs </p>
//                 </div>
//             </section>

//             {/* Gallery Section */}
//             <section className="gallery-section py-5">
//                 <div className="container">
//                     <div className="row g-4">
//                         {galleryImages.map((image) => (
//                             <div key={image.id} className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
//                                 <div 
//                                     className="gallery-card" 
//                                     data-aos="fade-up" 
//                                     onClick={() => setSelectedImage(image)}
//                                 >
//                                     <div className="image-wrapper">
//                                         <img src={image.src} alt={image.title} className="img-fluid" />
//                                         <div className="overlay">
//                                             <span className="plus-icon">+</span>
//                                             <h5 className="image-title">{image.title}</h5>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* Lightbox / Modal */}
//             {selectedImage && (
//                 <div className="gallery-modal" onClick={() => setSelectedImage(null)}>
//                     <div className="modal-content-wrapper" onClick={(e) => e.stopPropagation()}>
//                         <button className="close-btn" onClick={() => setSelectedImage(null)}>&times;</button>
//                         <img src={selectedImage.src} alt={selectedImage.title} className="modal-img" />
//                         <h4 className="modal-title">{selectedImage.title}</h4>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Media;




import { useState, useEffect } from 'react';
import './Media.css';

const API_BASE = 'http://88.222.213.67:5090';
const GALLERY_URL = `${API_BASE}/v1/gkcabs/web/getallgallery`;

const Media = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch(GALLERY_URL, { method: 'POST' });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          // Filter active items and map to the required format
          const activeImages = data.gallerys
            .filter(item => item.status === 'active')
            .map(item => ({
              id: item._id,
              src: `${API_BASE}/${item.image}`,
              title: item.title || 'Untitled', // fallback if title missing
            }));
          setGalleryImages(activeImages);
        } else {
          throw new Error(data.message || 'Failed to fetch gallery');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // Render content based on state
  const renderGallery = () => {
    if (loading) {
      return (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      );
    }

    if (galleryImages.length === 0) {
      return (
        <div className="text-center py-5 text-muted">
          <p>No gallery images available.</p>
        </div>
      );
    }

    return (
      <div className="row g-4">
        {galleryImages.map((image) => (
          <div key={image.id} className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
            <div
              className="gallery-card"
              data-aos="fade-up"
              onClick={() => setSelectedImage(image)}
            >
              <div className="image-wrapper">
                <img src={image.src} alt={image.title} className="img-fluid" />
                <div className="overlay">
                  <span className="plus-icon">+</span>
                  <h5 className="image-title">{image.title}</h5>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="media-page">
      {/* Header Section */}
      <section className="media-header py-5 bg-dark text-white text-center">
        <div className="container">
          <h1 className="display-4 fw-bold">Our Media Gallery</h1>
          <p className="lead">Experience the world of Gk Cabs</p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section py-5">
        <div className="container">{renderGallery()}</div>
      </section>

      {/* Lightbox / Modal */}
      {selectedImage && (
        <div className="gallery-modal" onClick={() => setSelectedImage(null)}>
          <div
            className="modal-content-wrapper"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="modal-img"
            />
            <h4 className="modal-title">{selectedImage.title}</h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default Media;