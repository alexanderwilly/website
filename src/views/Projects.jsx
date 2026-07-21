import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import info from "../media/input.json";

// project images
import finance_chatbot from "../media/projects/finance_chatbot.jpg";
import sciqa from "../media/projects/sciqa.jpg";
import beat_churn_with_ml from "../media/projects/beat_churn_with_ml.jpg";
import portfolio_2 from "../media/projects/portfolio_2.jpg";
import petheaven from "../media/projects/petheaven.jpg";
import activeaxis from "../media/projects/activeaxis.jpg";
import portfolio from "../media/projects/portfolio.jpg";
import cafe from "../media/projects/cafe.jpg";

// contact icons
import github_icon from "../media/social_media/github_icon.png";
import linkedin_icon from "../media/social_media/linkedin_icon.png";
import mail_icon from "../media/social_media/mail_icon.png";

import './styles/Projects.css';

function Projects() {
    const navigate = useNavigate();

    const home_image_maps = {
        "finance_chatbot": finance_chatbot,
        "sciqa": sciqa,
        "beat_churn_with_ml": beat_churn_with_ml,
        "portfolio_2": portfolio_2,
        "petheaven": petheaven,
        "activeaxis": activeaxis,
        "portfolio": portfolio,
        "cafe": cafe,
        "github_icon": github_icon,
        "linkedin_icon": linkedin_icon,
        "mail_icon": mail_icon
    };

    const ProjectCard = ({ index, project_name, description, project_type, project_image, repository_link, product_link, tags }) => {
        return (
            <div className="pg-proj-card-container pg-proj-glass" key={`project-${index}`}>
                <div className="pg-proj-card-image">
                    <img src={home_image_maps[project_image]} alt={project_name} />
                </div>
                <div className="pg-proj-card-details">
                    <div className="pg-proj-card-description">
                        <h4 className="pg-proj-gradient-text">{project_type}</h4>
                        <h1>{project_name.toUpperCase()}</h1>
                        <div className="pg-proj-card-meta">
                            <div className="pg-proj-tags-wrapper">
                                {tags.map((tag, i) => <span key={i} className="pg-proj-tech-tag">{tag}</span>)}
                            </div>
                        </div>
                        <p>{description}</p>
                    </div>

                    <div className="pg-proj-card-buttons">
                        <a href={repository_link !== null ? repository_link : "#"} target="_blank" rel="noopener noreferrer" className={repository_link !== null ? "pg-proj-btn-primary" : "pg-proj-btn-disabled"}>View Repository</a>
                        <a href={product_link !== null ? product_link : "#"} target="_blank" rel="noopener noreferrer" className={product_link !== null ? "pg-proj-btn-secondary" : "pg-proj-btn-disabled"}>View Project</a>
                    </div>
                </div>
            </div>
        )
    }

    const ContactCard = ({ index, contact_type, contact_display, contact_icon, contact_value }) => {
        return (
            <div className="pg-proj-contact-card" key={`contact-${index}`}>
                <a href={contact_value} target="_blank" rel="noopener noreferrer">
                    <img src={home_image_maps[contact_icon]} alt={contact_type} />
                    <span>{contact_display}</span>
                </a>
            </div>
        );
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main id="pg-projects-main">
            <Navbar />

            <section className="pg-proj-hero">
                <h1 className="pg-proj-section-heading">Project Showcase</h1>
                <p className="pg-proj-text-muted">Explore my latest work, experiments, and open-source contributions.</p>
            </section>

            {/* Projects Grid */}
            <section className='pg-proj-section-container'>
                <article className="pg-proj-grid-content">
                    {info.projects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            index={index}
                            {...project}
                        />
                    ))}
                </article>
            </section>

            {/* Footer / Contact */}
            <section className="pg-proj-footer-container">
                <div className="pg-proj-footer-content">
                    <h1 className="pg-proj-gradient-text">{info.full_name === null ? "FULL NAME" : info.full_name}</h1>
                    <h4>Let's Connect!</h4>
                    <div className="pg-proj-contact-container">
                        {info.contacts.slice(1, 3).map((contact, index) => (
                            <ContactCard key={index} index={index} {...contact} />
                        ))}
                    </div>
                </div>
                <footer>
                    <span>&copy; {new Date().getFullYear()} {info.full_name === null ? "" : `${info.full_name}.`} All rights reserved.</span>
                </footer>
            </section>
        </main>
    )
}

export default Projects;