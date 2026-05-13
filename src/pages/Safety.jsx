import { useState } from 'react';
import Icon from '../components/Icon';
import './Safety.css';

const Safety = () => {
    const [activeTab, setActiveTab] = useState('overviews');
    const [showMoreWayForward, setShowMoreWayForward] = useState(false);

    const tabs = [
        { id: 'overviews', label: 'Overviews' },
        { id: 'riders', label: 'Riders' },
        { id: 'drivers', label: 'Drivers' },
    ];

    const renderOverviews = () => (
        <div className="safety-tab-content fade-in">
            <div className="row align-items-center mb-5">
                <div className="col-lg-6">
                    <h1 className="display-4 fw-bold mb-4">Safety for every ride.</h1>
                    <p className="lead text-muted">
                        At Gk Cabs, the well-being of our riders is above everything else. We are constantly in pursuit of enhancing our safety measures to ensure every Gk Cabs ride is a pleasant and comfortable experience.
                    </p>
                </div>
                <div className="col-lg-6">
                    <div className="safety-collage">
                        <div className="collage-img main">
                            <img src="assets/images/Media/Media-1.jpg" alt="Safety" />
                        </div>
                        <div className="collage-img sub-1">
                            <img src="assets/images/Media/Media-2.jpg" alt="Driver" />
                        </div>
                        <div className="collage-img sub-2">
                            <img src="assets/images/Media/Media-3.jpg" alt="Support" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="section-title text-center mb-5">
                <h2 className="fw-bold">Covers Our Riders & Drivers</h2>
            </div>

            <div className="row g-4 mb-5">
                <div className="col-md-6">
                    <div className="safety-card">
                        <div className="card-image">
                            <img src="assets/images/Media/Media-4.jpg" alt="Riders" />
                        </div>
                        <div className="card-body p-4">
                            <h3 className="fw-bold h4">Riders</h3>
                            <p className="text-muted">Every ride is tracked by Gk Cabs, with access to granular latitudinal and longitudinal data.</p>
                            <button className="btn p-0 text-decoration-none text-primary fw-bold" onClick={() => setActiveTab('riders')}>Know More →</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="safety-card">
                        <div className="card-image">
                            <img src="assets/images/Media/Media-5.jpg" alt="Drivers" />
                        </div>
                        <div className="card-body p-4">
                            <h3 className="fw-bold h4">Drivers</h3>
                            <p className="text-muted">From hiring to training to monitoring to ongoing checks, we take all necessary steps to ensure our drivers safety</p>
                            <button className="btn p-0 text-decoration-none text-primary fw-bold" onClick={() => setActiveTab('drivers')}>Know More →</button>
                        </div>
                    </div>
                </div>
            </div>

            {renderMeasuresSection()}
        </div>
    );

    const renderRiders = () => (
        <div className="safety-tab-content fade-in">
            <div className="row align-items-center mb-5">
                <div className="col-lg-6 order-lg-2">
                    <h1 className="display-4 fw-bold mb-4">Safety of Our Riders</h1>
                    <p className="lead text-muted">
                        By leveraging the latest safety technologies and onboarding/ training process for our drivers. Every ride is tracked by Gk Cabs, with access to granular latitudinal and longitudinal.
                    </p>
                </div>
                <div className="col-lg-6 order-lg-1">
                    <div className="safety-main-img">
                        <img src="assets/images/Media/Media-2.jpg" alt="Riders Safety" className="rounded-4 shadow-lg w-100" />
                    </div>
                </div>
            </div>

            <div className="drivers-verification-section mb-5">
                <h2 className="fw-bold mb-4 text-center">Four-Step Background Verification For Drivers</h2>
                <div className="row align-items-center">
                    <div className="col-lg-5">
                        <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80" alt="Verification" className="img-fluid rounded-4 mb-4" />
                    </div>
                    <div className="col-lg-7">
                        <p className="text-muted mb-4">In line with our Safety First philosophy, we have been conducting a stringent Four-step Background Verification of every drivers on our platform since</p>
                        <div className="verification-list">
                            {[
                                'Hiring Process',
                                'Verification through third party vendor',
                                'Driver Training Process',
                                'Driver Monitoring Process',
                                'Driver Retention Process'
                            ].map((item, index) => (
                                <div key={index} className="verification-item d-flex justify-content-between align-items-center p-3 border-bottom">
                                    <span className="fw-semibold">{item}</span>
                                    <Icon name="chevron-up" size={16} className="rotate-180" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="app-safety-features yellow-bg py-5 px-4 rounded-4 mb-5">
                <h2 className="fw-bold mb-5 text-center">App Safety Features</h2>
                <div className="row g-4">
                    {[
                        { icon: 'gps', title: 'Trip Sharing', desc: 'Riders can share their trip status with their respective emergency contacts on the Gk Cabs app right after their ride starts.' },
                        { icon: 'shield-tick', title: 'Information Masking', desc: 'Every woman rider\'s contact number is masked to protect their privacy and their interaction with the drivers happens only through app encryption.' },
                        { icon: 'flash', title: 'SOS Button', desc: 'The app has an SOS button which is a 24*7 in-app support feature. This helps the rider connect with an emergency team that is backed by on-ground support in every city.' },
                        { icon: 'text-align-left', title: 'Driver Information', desc: 'Once the ride is booked, details like drivers\'s name, vehicle number, vehicle model, and star rating are visible to riders.' },
                        { icon: 'car', title: 'On ground support', desc: 'In line with our Safety First philosophy, we have been conducting a stringent Four-step Background Verification of every drivers on our platform since' }
                    ].map((feature, index) => (
                        <div key={index} className="col-md-4 mb-4">
                            <div className="feature-item">
                                <div className="feature-icon mb-3">
                                    <Icon name={feature.icon} size={40} color="black" />
                                </div>
                                <h4 className="fw-bold h5">{feature.title}</h4>
                                <p className="small text-dark opacity-75">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderDrivers = () => (
        <div className="safety-tab-content fade-in">
            <div className="row align-items-center mb-5">
                <div className="col-lg-6">
                    <h1 className="display-4 fw-bold mb-4">Safety of Drivers</h1>
                    <p className="lead text-muted">
                        All rides are insured. Accidental coverage and medical benefits covered up to Rs 5 Lakh for drivers & family.
                    </p>
                </div>
                <div className="col-lg-6">
                    <div className="safety-main-img">
                        <img src="assets/images/Media/Media-4.jpg" alt="Driver Safety" className="rounded-4 shadow-lg w-100" />
                    </div>
                </div>
            </div>

            {renderMeasuresSection()}
        </div>
    );

    const renderMeasuresSection = () => (
        <div className="measures-section yellow-bg py-5 px-4 rounded-4 mb-5">
            <div className="row">
                <div className="col-lg-5">
                    <div className="mb-4">
                        <Icon name="shield-tick" size={48} color="black" />
                    </div>
                    <h2 className="fw-bold mb-4">Measures to ensure the well-being of both, our Drivers and Riders.</h2>
                </div>
                <div className="col-lg-7">
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <div className="measure-item">
                                <Icon name="wallet-money" size={32} color="black" className="mb-2" />
                                <h4 className="fw-bold h5">Insurance</h4>
                                <p className="small text-dark opacity-75">Insurance can be claimed for any accident that occurs during the ride covering OPD treatment, hospitalization, and accidental benefit with a maximum sum insured of ₹5 Lakh.</p>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="measure-item">
                                <Icon name="phone" size={32} color="black" className="mb-2" />
                                <h4 className="fw-bold h5">24 x 7 Riders Support</h4>
                                <p className="small text-dark opacity-75">Both, our drivers and riders can report any kind of issues to Gk Cabs through the 24*7 support feature on the app post & during the ride.</p>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="measure-item">
                                <Icon name="star" size={32} color="black" className="mb-2" />
                                <h4 className="fw-bold h5">Two-way Rating System</h4>
                                <p className="small text-dark opacity-75">Post the ride, both parties can give a rating to each other and any rating below 3 is flagged from Gk Cabs's end.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="safety-page pb-5">
            <div className="safety-nav py-3 mb-5 sticky-top bg-white">
                <div className="container">
                    <div className="d-flex justify-content-center gap-4">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                className={`btn tab-btn px-4 py-2 rounded-pill fw-bold ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container">
                {activeTab === 'overviews' && renderOverviews()}
                {activeTab === 'riders' && renderRiders()}
                {activeTab === 'drivers' && renderDrivers()}

                <div className="way-forward-section py-5 mt-5 border-top">
                    <div className="row">
                        <div className="col-lg-8">
                            <h2 className="fw-bold mb-3">Way forward on Safety</h2>
                            <p className="text-muted lead">To further substantiate our commitment to Safety First towards riders & drivers, we will be incorporating new features on our platform very soon.</p>
                            {!showMoreWayForward && (
                                <button
                                    className="btn btn-link p-0 fw-bold mt-2 text-decoration-none"
                                    onClick={() => setShowMoreWayForward(true)}
                                >
                                    Know More ↓
                                </button>
                            )}
                        </div>
                    </div>

                    {showMoreWayForward && (
                        <div className="row mt-5 fade-in">
                            <div className="col-md-6 mb-4">
                                <div className="d-flex gap-4 align-items-start">
                                    <div className="bg-dark p-3 rounded-circle">
                                        <Icon name="clock" size={32} color="white" />
                                    </div>
                                    <div>
                                        <h4 className="fw-bold mb-2">Ride Completion Check</h4>
                                        <p className="text-muted mb-0">Anyone who takes a ride between 10 pm and 6 am will be contacted by Gk Cabs Riders Care for a safety check after the ride is completed.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 mb-4">
                                <div className="d-flex gap-4 align-items-start">
                                    <div className="bg-dark p-3 rounded-circle">
                                        <Icon name="phone" size={32} color="white" />
                                    </div>
                                    <div>
                                        <h4 className="fw-bold mb-2">Proactive Check-In</h4>
                                        <p className="text-muted mb-0">Every rider will be alerted on the system and called by Gk Cabs Riders Care when there is any unusual activity or deviation from the set protocol.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 mt-4">
                                <button
                                    className="btn btn-link p-0 fw-bold text-decoration-none"
                                    onClick={() => setShowMoreWayForward(false)}
                                >
                                    Show Less ↑
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Safety;
