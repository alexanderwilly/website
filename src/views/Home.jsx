import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

import Navbar from "../components/Navbar";

// experience
import cogoport_logo from "../media/experience/cogoport_logo.jpg"
import pt__treessolutions_logo from "../media/experience/pt__trees_solutions_logo.jpeg"
import wellknown_logo from "../media/experience/wellknown_logo.jpeg"
// education
import smu_logo from "../media/education/smu_logo.png"
import uow_logo from "../media/education/uow_logo.png"
import simge_logo from "../media/education/simge_logo.png"
// project
import finance_chatbot from "../media/projects/finance_chatbot.jpg"
import sciqa from "../media/projects/sciqa.jpg"
import beat_churn_with_ml from "../media/projects/beat_churn_with_ml.jpg"
import petheaven from "../media/projects/petheaven.jpg"
import activeaxis from "../media/projects/activeaxis.jpg"
import portfolio from "../media/projects/portfolio.jpg"
import portfolio_2 from "../media/projects/portfolio_2.jpg"
import cafe from "../media/projects/cafe.jpg"

// contact
import github_icon from "../media/social_media/github_icon.png"
import linkedin_icon from "../media/social_media/linkedin_icon.png"
import mail_icon from "../media/social_media/mail_icon.png"

import info from "../media/input.json"

import './styles/Home.css';

function Home(){
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(1);
    const [currentIndex, setCurrentIndex] = useState(0);

    const updateToggle = (value) => {
        const activeContent = document.querySelector(".resume-content-active");
        if (activeContent) {
            activeContent.classList.add("fade-out");
            setTimeout(() => {
                activeContent.classList.remove("fade-out");
                setToggle(value);
            }, 300); 
        } else {
            setToggle(value);
        }
    }

    const showTestimonial = (index)=>{
        if (index >= info.testimonials.length) {
            index = 0;
        } else if (index < 0){
            index = info.testimonials.length - 1;
        }
        setCurrentIndex(index);
    }

    const handlePrev = () => {
        const newIndex = currentIndex === 0 ? info.testimonials.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const handleNext = () => {
        const newIndex = currentIndex === info.testimonials.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const home_image_maps = {
        // experience logo
        "cogoport_logo":cogoport_logo,
        "pt__trees_solutions_logo":pt__treessolutions_logo,
        "wellknown_logo": wellknown_logo,

        // education logo
        "smu_logo":smu_logo,
        "uow_logo":uow_logo,
        "simge_logo":simge_logo,

        // project images
        "finance_chatbot":finance_chatbot,
        "sciqa":sciqa,
        "beat_churn_with_ml":beat_churn_with_ml,
        "portfolio_2":portfolio_2,
        "petheaven":petheaven,
        "activeaxis":activeaxis,
        "portfolio":portfolio,
        "cafe":cafe,

        // contact icons
        "github_icon":github_icon,
        "linkedin_icon":linkedin_icon,
        "mail_icon":mail_icon
    }

    const ExperienceCard = ({index, job_title, company_name, company_logo, start_date, end_date, description}) =>{
        return(
            <div className="glass-card experience-card-container" key={`experience-${index}`}>
                <div className="experience-card-logo">
                    <div className="logo-wrapper">
                        <img src={home_image_maps[company_logo]} alt={company_name} />
                    </div>
                </div>
                <div className="experience-card-details">
                    <h1>{job_title.toUpperCase()}</h1>
                    <div className="experience-card-meta">
                        <span className="highlight-text">{company_name}</span>
                        <span className="muted-text"> | {start_date} - {end_date}</span>
                    </div>
                    <ul>
                        {description.map((desc, index) => (
                            <li key={`experience-desc-${index}`}>{desc}</li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    const EducationCard = ({index, degree_name, university_name, university_logo, start_date, end_date, is_current, description})=>{
        return(
            <div className="glass-card education-card-container" key={`education-${index}`}>
                <div className="education-card-logo">
                    <div className="logo-wrapper">
                        <img src={home_image_maps[university_logo]} alt={university_name} />
                    </div>
                </div>
                <div className="education-card-details">
                    <h1>{degree_name.toUpperCase()}</h1>
                    <div className="education-card-meta">
                        <span className="highlight-text">{university_name}</span>
                        <span className="muted-text"> | {start_date} - {end_date}{is_current ? " (Expected)":""}</span>
                    </div>
                    <ul>
                        {description.map((desc, index) => (
                            <li key={`education-desc-${index}`}>{desc}</li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }

    const ProjectCard = ({index, project_name, description, project_type, project_image, repository_link, product_link, tags}) =>{
        return(
            <div className="glass-card project-card-container" key={`project-${index}`}>
                <div className="project-card-image">
                    <img src={home_image_maps[project_image]} alt={project_name} />
                </div>
                <div className="project-card-details">
                    <div className="project-card-description">
                        <h4 className="gradient-text">{project_type}</h4>
                        <h1>{project_name.toUpperCase()}</h1>
                        <div className="project-card-meta">
                            <span className="tags-container">
                                {tags.map((tag, i) => <span key={i} className="tech-tag">{tag}</span>)}
                            </span>
                        </div>
                        <p>{description}</p>
                    </div>
                    
                    <div className="project-card-buttons">
                        <a href={repository_link !== null ? repository_link : "#"} target="_blank" rel="noopener noreferrer" className={repository_link !== null? "btn-primary" : "btn-disabled"}>View Repository</a>
                        <a href={product_link !== null ? product_link : "#"} target="_blank" rel="noopener noreferrer" className={product_link !== null? "btn-secondary" : "btn-disabled"}>View Project</a>
                    </div>
                </div>
            </div>
        )
    }

    const TestimonialCard = ({ index, testimonial, author, link }) => {
        return (
            <div className="testimonial-card" key={`testimonial-${index}`}>
                <p className="testimonial-text">"{testimonial}"</p>
                <cite className="testimonial-author">&mdash; <a href={link} target="_blank" rel="noopener noreferrer">{author}</a></cite>
            </div>
        );
    };

    const ContactCard = ({index, contact_type, contact_display, contact_icon, contact_value})=>{
        return(
            <div className="contact-card" key={`contact-${index}`}>
                <a href={contact_value} target="_blank" rel="noopener noreferrer">
                    <img src={home_image_maps[contact_icon]} alt={contact_type} />
                    <span>{contact_display}</span>
                </a>
            </div>
        );
    }

    useEffect(() => {
        const autoScrollInterval = setInterval(() => {
            handleNext(); 
        }, 5000);
        return () => clearInterval(autoScrollInterval);
    }, [currentIndex, info.testimonials.length]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return(
        <main id="home">
            <Navbar />
            
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-background-glow"></div>
                <article className="hero-content">
                    <div className="hero-content-container"> 
                        <h5 className="section-subheading glow-subtext">{info.full_name == null ? "FULL NAME" : info.full_name.toUpperCase() }</h5>
                        <h1 className="section-heading">Hello, I'm <span className="gradient-text">{info.display_name == null ? "DISPLAY NAME" : info.display_name }</span></h1>
                        <p className="hero-tagline">Building intelligent systems & scalable AI software solutions.</p>
                    </div>
                    <div className="hero-button-container">
                        <button className="btn-primary hero-btn" onClick={() => {window.location.href = info.contacts[1].contact_value}}>
                            Let's Connect
                        </button>
                    </div>
                </article>
            </section>

            {/* Resume Summary */}
            <section className="section-container">
                <div className="section-header">
                    <h5 className="section-subheading">BACKGROUND</h5>
                    <h2 className="section-heading">My Experience</h2>
                </div>

                <article className="resume-content">
                    <div className="resume-content-container">
                        <div className="toggle-wrapper">
                            <ul className="resume-content-options glass-pill">
                                <li className={toggle === 1 ? "option-active" : "option-inactive"} onClick={()=>updateToggle(1)}>Experience</li>
                                <li className={toggle === 2 ? "option-active" : "option-inactive"} onClick={()=>updateToggle(2)}>Education</li>
                            </ul>
                        </div>

                        <div className="card-stack">
                            <div className={toggle === 1 ? "resume-content-active" : "resume-content-inactive"}>
                                {info.experiences.map((experience, index) => (
                                    <ExperienceCard key={index} index={index} {...experience} />
                                ))}
                            </div>
                            <div className={toggle === 2 ? "resume-content-active" : "resume-content-inactive"}>
                                {info.educations.map((education, index) => (
                                    <EducationCard key={index} index={index} {...education} />
                                ))}
                            </div>
                        </div>
                    </div>
                </article>
            </section>

            {/* Project */}
            <section className='section-container project-section'>
                <div className="section-header">
                    <h5 className="section-subheading">PORTFOLIO</h5>
                    <h2 className="section-heading">Featured Projects</h2>
                </div>

                <article className="project-content">
                    {info.projects.slice(0,3).map((project, index) => (
                        <ProjectCard key={index} index={index} {...project} />
                    ))}
                </article>

                <div className="project-load-more-container">
                    <button className="btn-secondary load-more-btn" onClick={()=>navigate("/projects")}>View All Projects</button>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section-container">
                <div className="section-header">
                    <h5 className="section-subheading">ENDORSEMENTS</h5>
                    <h2 className="section-heading">What People Say</h2>
                </div>

                <article id="testimonial-carousel" className="carousel-wrapper glass-card">
                    <div className="carousel-container">
                        <div className="carousel-slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                            {info.testimonials.map((testimonial, index) => (
                                <div style={{ flex: '0 0 100%' }} key={index}>
                                    <TestimonialCard index={index} {...testimonial} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className="carousel-btn left" onClick={handlePrev}>&#10094;</button>
                    <button className="carousel-btn right" onClick={handleNext}>&#10095;</button>

                    <div className="dots-container">
                        {info.testimonials.map((_, index) => (
                            <button
                                key={index}
                                className={currentIndex === index ? "dot active" : "dot"}
                                aria-label={`Go to testimonial ${index + 1}`}
                                onClick={() => setCurrentIndex(index)}
                            />
                        ))}
                    </div>
                </article>
            </section>

            {/* Footer / Contact */}
            <section className="footer-container">
                <div className="footer-content">
                    <h1 className="gradient-text">{info.full_name === null ? "FULL NAME" : info.full_name}</h1>
                    <h4>Let's build something great together.</h4>
                    <div className="contact-container">
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
    );
}

export default Home;