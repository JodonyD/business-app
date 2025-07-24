// App.js
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';

const App = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false); // new state for back to top button

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [formStatus, setFormStatus] = useState(''); // display success or error messages

    // handle form input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent default form submission

        setFormStatus('Sending...'); // give feedback to the user

        try {
            // send form data to your backend server
            const response = await fetch('https://business-app-1s45.onrender.com/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // convert form data object to JSON string
            });
            const data = await response.json(); // parse the JSON response from the server

            if (response.ok) { // check if the HTTP status code is in the 200 range
                setFormStatus('Message sent successfully!');
                setFormData({ name: '', email: '', message: '' }); // clear the form fields on success
            } else {
                // if server responded with an error status
                setFormStatus(`Error: ${data.msg || 'Something went wrong.'}`);
            }
        } catch (error) {
            // handle network errors
            console.error('Submission error:', error);
            setFormStatus('An error occurred. Please try again later.');
        }
    };

    // back to Top button logic 
    const handleScroll = () => {
        if (window.scrollY > 300) { // shows button if scrolled down more than 300px
            setShowBackToTop(true);
        } else {
            setShowBackToTop(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // smooth scroll animation
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll); // clean up the event listener
        };
    }, []);
    // end of logic

    // portfolio items
    const portfolioItems = [
        {
            title: 'Blaze Beauty School',
            category: 'Education',
            images: [
                '/images/blaze1.png',
                '/images/blaze2.png',
                '/images/blaze3.png',
                '/images/blaze4.png'
            ],
            description: 'Beauty school website with course listing',
            link:'https://blazebeauty.byethost13.com/index.php'
        },
        {
            title: 'Oomas Jamaican Goodies',
            category: 'Bakery',
            images: [
                '/images/oomas.png',
                '/images/oomas2.png',
                '/images/oomas3.png',
                '/images/oomas4.png',
                '/images/oomas5.png'
            ],
            description: 'Local bakery website',
            link:'https://jodonyd.github.io/oomas/'
        },
        {
            title: 'Personal Portfolio',
            category: 'Professional',
            images: [
                '/images/portfolio1.png',
                '/images/portfolio2.png',
                '/images/portfolio3.png',
                '/images/portfolio4.png',
            ],
            description: 'My personal developer portfolio',
            link:'https://jodonyd.github.io/portfolio/'
        }
    ];

    //servicing price
    const servicePricing = [
        { type: 'Basic Website (Static)', description: '1-3 pages (HTML, CSS, basic JavaScript/React). Great for personal information or bio sites.', price: 'JMD $25,000' },
        { type: 'Business Website (5-7 pages)', description: 'Full business website with Home, About, Services, Contact, etc. Mobile responsive.', price: 'JMD $38,000' },
        { type: 'Custom Website (from scratch)', description: 'Designed from scratch with your brand in mind. Can include interactive features.', price: 'JMD $55,000+' },
        { type: 'CMS Website (WordPress, Wix, etc.)', description: 'Editable website using a content management system like WordPress/Wix.', price: 'JMD $40,000+' },
        { type: 'Portfolio/Booking Website', description: 'Ideal for creatives, salons, architects or consultants.', price: 'JMD $42,000+' },
        { type: 'Landing Page', description: 'One-page promotional site or product page.', price: 'JMD $15,000' },
    ];

    return (
        <div>
            {/* navigation bar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-warning px-4" >
                <a className="navbar-brand fw-bold" href="#home">JRD WebCreations</a>
                <button className="navbar-toggler" type="button" onClick={() => setIsMenuOpen(!isMenuOpen)}><span className="navbar-toggler-icon"></span></button>
                <div className={`collapse navbar-collapse justify-content-end ${isMenuOpen ? 'show' : ''}`}>
                    <ul className="nav navbar-nav navbar-right">
                        <li className="nav-item ms-3"><a href="#about" className="text-dark text-decoration-none fw-bold">About</a></li>
                        <li className="nav-item ms-3"><a href="#portfolio" className="text-dark text-decoration-none fw-bold">Portfolio</a></li>
                        <li className="nav-item ms-3"><a href="#contact" className="text-dark text-decoration-none fw-bold">Contact</a></li>
                    </ul>
                </div>
            </nav>

            {/* hero section */}
            <header className="bg-light py-5 text-center" id="home">
                <div className="container">
                    <h1 className="display-4 fw-bold">Crafting Digital Excellence</h1>
                    <p className="lead">We turn your vision into beautiful user-friendly websites.</p>
                    <a href="#portfolio" className="btn btn-default btn-outline-dark py-1">View Work </a>
                    <a href="#contact" className="btn btn-dark py-1">Contact Us</a>
                </div>
            </header>

            {/* about section */}
            <section className="py-5 bg-white" id="about">
                <div className="container text-center">
                    <h2 className="text-warning fw-bold mb-4" >About JRD WebCreations</h2>
                    <p className="text-muted">
                        At JRD WebCreations, we are passionate about transforming your vision into stunning, functional, and user-friendly digital experiences.
                        <br></br>
                        We specialize in crafting custom websites tailored specifically for small businesses and ambitious entrepreneurs.
                        <br></br>
                        Our core mission is to empower your brand with the professional online presence it truly deserves, helping you stand out in today's digital landscape.
                        <br></br>
                        We believe a strong online foundation is key to growth, and we're committed to delivering high-quality, impactful web solutions that help you connect with more customers and achieve your business goals.
                    </p>
                </div>
            </section>

            {/* portfolio section */}
            <section className="py-5 bg-light" id="portfolio">
                <div className="container">
                    <h2 className="text-center fw-bold mb-5">Portfolio</h2>
                    <div className="row">
                        {portfolioItems.map((item, index) => (
                            <div className="col-md-4 mb-4" key={index}>
                                <div className="card h-100 shadow-sm">
                                    <div id={`carousel-${index}`} className="carousel slide" data-bs-ride="carousel">
                                        <div className="carousel-inner">
                                            {item.images.map((img, imgIndex) => (
                                                <div key={imgIndex} className={`carousel-item ${imgIndex === 0 ? 'active' : ''}`}>
                                                    <img src={img} className="d-block w-100" alt={`${item.title} ${imgIndex + 1}`} />
                                                </div>
                                            ))}
                                        </div>
                                        {item.images.length > 1 && (
                                            <>
                                                <button className="carousel-control-prev" type="button" data-bs-target={`#carousel-${index}`} data-bs-slide="prev">
                                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                    <span className="visually-hidden">Previous</span>
                                                </button>
                                                <button className="carousel-control-next" type="button" data-bs-target={`#carousel-${index}`} data-bs-slide="next">
                                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                    <span className="visually-hidden">Next</span>
                                                </button>
                                            </>
                                        )}
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{item.title}</h5>
                                        <h6 className="text-muted mb-2">{item.category}</h6>
                                        <p className="card-text">{item.description}</p>
                                        <p className="card-text">{item.link}</p>
                                        {item.link && <p className="card-text mt-3"><a href={item.link.replace('🔗 ', '')} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary">View Live Site <i className="bi bi-box-arrow-up-right"></i></a></p>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* pricing section */}
            <section className="py-5 bg-white" id="pricing">
                <div className="container">
                    <h2 className="text-center mb-4 text-warning fw-bold">💲Price List</h2>
                    <p className="text-center text-muted mb-5">Choose the perfect plan for your business needs. All plans include our signature quality support</p>

                    <div className="row">
                        {servicePricing.map((service, index) => (
                            <div className="col-md-6 mb-3" key={index}>
                                <div className="p-4 border rounded shadow-sm h-100 bg-light">
                                    <h5 className="fw-bold text-dark mb-2">{service.type}</h5>
                                    <p className="text-muted mb-2">{service.description}</p>
                                    <h6 className="text-warning fw-bold">{service.price}</h6>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* add-on list */}
                    <div className="mt-5">
                        <h3 className="text-center text-warning mb-4">🚀 Add-Ons & Extras</h3>
                        <p className="text-center text-muted mb-4">Conditions apply</p>
                        <div className="row">
                            <div className="col-md-6 mb-3"><strong>Domain Setup & Linking:</strong> Help registering and connecting your domain name – <em>JMD $6,000</em></div>
                            <div className="col-md-6 mb-3"><strong>Deployment to Free Hosting:</strong> Netlify / GitHub Pages (free platforms) – <em>Included</em></div>
                            <div className="col-md-6 mb-3"><strong>Deployment with Custom Domain:</strong> Deployment with custom domain (including DNS setup) – <em>JMD $6,000–$8,000</em></div>
                            <div className="col-md-6 mb-3"><strong>Contact Form Integration:</strong> Form that sends info to your email – <em>JMD $3,500</em></div>
                            <div className="col-md-6 mb-3"><strong>Google Map / WhatsApp Button:</strong> Embedded map or click-to-chat WhatsApp – <em>JMD $2,000</em></div>
                            <div className="col-md-6 mb-3"><strong>Basic SEO Optimization:</strong> Keywords, meta descriptions, Google search setup – <em>JMD $6,000</em></div>
                            <div className="col-md-6 mb-3"><strong>Monthly Maintenance:</strong> Website updates, edits, backups – <em>JMD $7,000/m</em></div>
                            <div className="col-md-6 mb-3"><strong>For More Info:</strong> Please contact us for more detailed information! <em>☑</em></div>
                        </div>
                    </div>
                </div>
            </section>

            {/*contact section */}
            <section className="py-5 bg-light" id="contact">
                <div className="container">
                    <h2 className="text-center mb-4">🔎Contact Us</h2>
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name"  name="name" value={formData.name} onChange={handleChange} placeholder="Your name..." required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com"required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message" className="form-label">Message</label>
                                    <textarea className="form-control" id="message" name="message" rows="4" value={formData.message} onChange={handleChange} placeholder="Tell us about your project idea..." required ></textarea>
                                </div>
                                <button type="submit" className="btn btn-warning w-100">Send Message</button>
                                {formStatus && <p className="mt-3 text-center">{formStatus}</p>}
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* footer */}
            <footer className="bg-dark text-white text-center py-4" >
                <div className="container">
                    <p className="mb-1">&copy; 2025 JRD WebCreations. All rights reserved.</p>
                    <p className="mb-0">
                        📧 Email: <a href="mailto:jrdwebcreations@gmail.com" className="text-white">jrdwebcreations@gmail.com</a> |
                        📱 WhatsApp: <a href="https://wa.me/18763487520?text=Hi%20JRD%20WebCreations%20I'm%20interested%20in%20your%20services" className="text-white" target="_blank" rel="noreferrer">876-348-7520</a> |
                        <i className="bi bi-tiktok"></i> TikTok: <a href="https://www.tiktok.com/@rdwebcreations" className="text-white" target="_blank" rel="noreferrer">jrdwebcreations</a> |
                        <i className="bi bi-instagram"></i> Instagram: <a href="https://www.instagram.com/jrdwebcreations" className="text-white" target="_blank" rel="noreferrer">jrdwebcreations</a>
                    </p>
                </div>
            </footer>

            {/* back to Top button */}
            {showBackToTop && (
                <button className="back-to-top-btn btn btn-warning" onClick={scrollToTop} title="Back to Top"> ↑</button>
            )}
        </div>
    );
}

export default App;