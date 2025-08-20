import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

import Navbar from "../components/Navbar";

import display_image from "../media/home_pic.png"
// experience
import cogoport_logo from "../media/experience/cogoport_logo.jpg"
import pt__treessolutions_logo from "../media/experience/pt__trees_solutions_logo.jpeg"
// education
import smu_logo from "../media/education/smu_logo.png"
import uow_logo from "../media/education/uow_logo.png"
import simge_logo from "../media/education/simge_logo.png"
// project
import petheaven from "../media/projects/petheaven.jpg"
import activeaxis from "../media/projects/activeaxis.jpg"
import portfolio from "../media/projects/portfolio.jpg"
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

        const dots = document.querySelectorAll(".dot");
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
        
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
        "display_image":display_image,
        // experience logo
        "cogoport_logo":cogoport_logo,
        "pt__trees_solutions_logo":pt__treessolutions_logo,

        // education logo
        "smu_logo":smu_logo,
        "uow_logo":uow_logo,
        "simge_logo":simge_logo,

        // project images
        "petheaven":petheaven,
        "activeaxis":activeaxis,
        "portfolio":portfolio,
        "cafe":cafe,

        // contact icons
        "github_icon":github_icon,
        "linkedin_icon":linkedin_icon,
        "mail_icon":mail_icon
    }

    const experience_card = (index, job_title, company_name, company_logo, start_date, end_date, description) =>{
        return(
            <div className = "experience-card-container" key={`experience-${index}`}>
                <div className = "experience-card-logo">
                    <img src = {home_image_maps[company_logo]} alt = {company_name} />
                </div>
                <div className = "experience-card-details">
                    <h1>{job_title.toUpperCase()}</h1>
                    <div className = "experience-card-meta">
                        <span>{company_name}</span><span>({start_date} - {end_date})</span>
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

    const education_card = (index, degree_name, university_name, university_logo, start_date, end_date, is_current, description)=>{
        return(
            <div className = "education-card-container" key={`education-${index}`}>
                <div className = "education-card-logo">
                    <img src = {home_image_maps[university_logo]} alt = {university_name} />
                </div>
                <div className = "education-card-details">
                    <h1>{degree_name.toUpperCase()}</h1>
                    <div className = "education-card-meta">
                        <span>{university_name}</span><span>({start_date} - {end_date}{is_current ? ", Expected":""})</span>
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

    const project_card = (index, project_name, description, project_type, project_image, repository_link, product_link, tags) =>{
        return(
            <div className = "project-card-container" key={`project-${index}`}>
                <div className = "project-card-image">
                    <img src = {home_image_maps[project_image]} alt = {project_name} />
                </div>
                <div className = "project-card-details">
                    <div className = "project-card-description">
                        <h4>{project_type}</h4>
                        <h1>{project_name.toUpperCase()}</h1>
                        <div className = "project-card-meta">
                            <span>Tags:</span> <span>{tags.join(", ")}</span>
                        </div>
                        <p>{description}</p>
                    </div>
                    
                    
                    <div className="project-card-buttons">
                        <a href={repository_link !== null ? repository_link : "#"} target="_blank" rel="noopener noreferrer" className={repository_link !== null? "link-avail" : "link-unavail"}>View Repository</a>
                        <a href={product_link !== null ? product_link : "#"} target="_blank" rel="noopener noreferrer" className={product_link !== null? "link-avail" : "link-unavail"}>View Project</a>
                    </div>

                </div>
            </div>
        )
    }

    const TestimonialCard = ({ index, testimonial, author, link }) => {
        return (
            <div className="testimonial-card" key={`testimonial-${index}`}>
                <p className = "testimonial-text">"{testimonial}"</p>
                <cite className = "testimonial-author">- <a href={link} target="_blank" rel="noopener noreferrer">{author}</a></cite>
            </div>
        );
    };

    const contactCard = ({index, contact_type, contact_display, contact_icon, contact_value})=>{
        return(
            <div className = "contact-card" key = {`contact-${index}`}>
                <a href = {contact_value} >
                    <img src = {home_image_maps[contact_icon]} alt = {contact_type} />
                    <span>{contact_display}</span>
                </a>
                
            </div>
        );
    }

    useEffect(() => {
        const autoScrollInterval = setInterval(() => {
            handleNext(); 
        }, 5000);

        return () => {
            clearInterval(autoScrollInterval);
        };

    }, [currentIndex, info.testimonials.length]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return(
        <main id ="home">
            <Navbar />
            {/* Hero Section */}
            <section className = "hero">
                <article className = "hero-content">
                    <img src = {home_image_maps[info.display_image]} alt = "Hero" id = "hero-image" />
                </article>
                <article className = "hero-content">
                    <div className = "hero-content-container"> 
                        <h5 className = "section-subheading">{info.full_name == null ? "FULL NAME" : info.full_name.toUpperCase() }</h5>
                        <h1 className = "section-heading">Welcome!</h1>
                        <h1 className = "section-heading">I'm <span>{info.display_name == null ? "DISPLAY NAME" : info.display_name }</span></h1>
                    </div>
                    <div className = "hero-button-container">
                        <button className = "hero-content-container-button" onClick = {() => {window.location.href = info.contacts[1].contact_value}}>
                            <span>Let's Connect</span>
                        </button>
                    </div>
                </article>
            </section>

            <hr />

            {/* Resume Summary */}
            <section className = "section-container">
                <h5 className = "section-subheading">ABOUT ME</h5>
                <h2 className = "section-heading">My Resume</h2>

                <article className = "resume-content">
                    <div className = "resume-content-container">
                        <ul className = "resume-content-options">
                            <li className = {toggle === 1 ? "option-list-active" : "option-list-inactive"} onClick={()=>updateToggle(1)}>Experience</li>
                            <li className = {toggle === 2 ? "option-list-active" : "option-list-inactive"} onClick={()=>updateToggle(2)}>Education</li>
                        </ul>

                        <div className = {toggle === 1 ? "resume-content-active" : "resume-content-inactive"}>
                            {
                                info.experiences.map((experience, index) => (
                                    experience_card(
                                        index,
                                        experience.job_title,
                                        experience.company_name,
                                        experience.company_logo,
                                        experience.start_date,
                                        experience.end_date,
                                        experience.description
                                    )
                                ))
                            }
                        </div>
                        <div className = {toggle === 2 ? "resume-content-active" : "resume-content-inactive"}>

                            {
                                info.educations.map((education, index) => (
                                    education_card(
                                        index,
                                        education.degree_name,
                                        education.university_name,
                                        education.university_logo,
                                        education.start_date,
                                        education.end_date,
                                        education.is_current,
                                        education.description
                                    )
                                ))
                            }
                        </div>
                    </div>
                </article>
            </section>

            <hr/>

            {/* Project */}
            <section className = 'section-container'>
                <h5 className = "section-subheading">CHECK OUT MY PROJECTS</h5>
                <h2 className = "section-heading">My Projects</h2>

                <article className = "project-content">
                    {
                        info.projects.slice(0,3).map((project, index) => (
                            project_card(
                                index,
                                project.project_name,
                                project.description,
                                project.project_type,
                                project.project_image,
                                project.repository_link,
                                project.product_link,
                                project.tags
                            )
                        ))
                    }
                </article>

                <div className = "project-load-more-container">
                    <button className = "project-load-more-button" onClick={()=>navigate("/projects")}>View More Projects</button>
                </div>

            </section>

            <hr />

            <section className="section-container">
                <h5 className="section-subheading">WHAT PEOPLE SAY</h5>
                <h2 className="section-heading">TESTIMONIALS</h2>

                <article id="testimonial-carousel" className="carousel-wrapper">
                    <div className="carousel-container">
                        <div className = "carousel-slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                            {
                                info.testimonials.map((testimonial, index) => (
                                    <div style={{ flex: '0 0 100%' }} key={index}>
                                        <TestimonialCard
                                            index={index}
                                            testimonial={testimonial.testimonial}
                                            author={testimonial.author}
                                            link={testimonial.link}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <button className="carousel-btn left" onClick={handlePrev}>
                        &#10094;
                    </button>
                    <button className="carousel-btn right" onClick={handleNext}>
                        &#10095;
                    </button>

                    <div className="dots-container">
                        {
                            info.testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    className={currentIndex === index ? "dot active" : "dot"}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                    onClick={() => setCurrentIndex(index)}
                                />
                            ))
                        }
                    </div>

                </article>

            </section>


            <section className = "section-container">
                <h1>{info.full_name === null ? "FULL NAME" : info.full_name}</h1>
                <h4>Let's Connect!</h4>

                 <div className = "contact-container">
                    {
                        info.contacts.slice(1, 3).map((contact, index) => (
                            contactCard({
                                index: index,
                                contact_type: contact.contact_type,
                                contact_display: contact.contact_display,
                                contact_icon: contact.contact_icon,
                                contact_value: contact.contact_value
                            })
                        ))
                    }
                </div>
                <footer>
                    <span>&copy; {new Date().getFullYear()} {info.full_name === null ? "" : `${info.full_name}.`} All rights reserved.</span>
                </footer>

            </section>

            
        </main>
    );
}

export default Home;