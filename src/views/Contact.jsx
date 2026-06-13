import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import info from "../media/input.json"

// contact icons
import github_icon from "../media/social_media/github_icon.png"
import linkedin_icon from "../media/social_media/linkedin_icon.png"
import mail_icon from "../media/social_media/mail_icon.png"

import './styles/Contact.css';

function Contact() {
    const navigate = useNavigate();

    const home_image_maps = {
        "github_icon": github_icon,
        "linkedin_icon": linkedin_icon,
        "mail_icon": mail_icon
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const ContactCard = ({ index, contact_type, contact_display, contact_icon, contact_value }) => {
        return (
            <div className="pg-contact-card-wrapper" key={`contact-${index}`}>
                <a href={contact_value} target="_blank" rel="noopener noreferrer" className="pg-contact-glass pg-contact-card">
                    <div className="pg-contact-icon-wrapper">
                        <img src={home_image_maps[`${contact_icon}`]} alt={contact_type} />
                    </div>
                    <span>{contact_display}</span>
                </a>
            </div>
        );
    }

    return (
        <main id="pg-contact-main">
            <Navbar />
            
            <section className="pg-contact-hero-container">
                <div className="pg-contact-background-glow"></div>
                
                <div className="pg-contact-content-wrapper">
                    <h4 className="pg-contact-section-subheading pg-contact-gradient-text">
                        {info.full_name === null ? "FULL NAME" : info.full_name.toUpperCase()}
                    </h4>
                    <h1 className="pg-contact-section-heading">Let's Connect!</h1>
                    <p className="pg-contact-hero-tagline">
                        I'd love to chat with you on LinkedIn and share my projects on GitHub!
                    </p>
                    
                    <div className="pg-contact-container">
                        {
                            info.contacts.slice(0, 3).map((contact, index) => (
                                <ContactCard
                                    key={index}
                                    index={index}
                                    contact_type={contact.contact_type}
                                    contact_display={contact.contact_display}
                                    contact_icon={contact.contact_icon}
                                    contact_value={contact.contact_value}
                                />
                            ))
                        }
                    </div>
                </div>
            </section>

            {/* Footer */}
            <section className="pg-contact-footer-container">
                <footer>
                    <span>&copy; {new Date().getFullYear()} {info.full_name === null ? "" : `${info.full_name}.`} All rights reserved.</span>
                </footer>
            </section>
        </main>
    );
}

export default Contact;