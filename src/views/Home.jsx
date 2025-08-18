import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

import Navbar from "../components/Navbar";

import display_image from "../media/home_pic.png"
import cogoport_logo from "../media/experience/cogoport_logo.jpg"
import pt__treessolutions_logo from "../media/experience/pt__trees_solutions_logo.jpeg"
import smu_logo from "../media/education/smu_logo.png"
import uow_logo from "../media/education/uow_logo.png"
import simge_logo from "../media/education/simge_logo.png"

import info from "../media/input.json"

import './styles/Home.css';

function Home(){
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(1);

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

    const home_image_maps = {
        "display_image":display_image,
        // experience logo
        "cogoport_logo":cogoport_logo,
        "pt__trees_solutions_logo":pt__treessolutions_logo,

        // education logo
        "smu_logo":smu_logo,
        "uow_logo":uow_logo,
        "simge_logo":simge_logo
    }

    const experience_card = (job_title, company_name, company_logo, start_date, end_date, description) =>{
        return(
            <div className = "experience-card-container">
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
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>
                </div>

            </div>

        )
    }

    const education_card = (degree_name, university_name, university_logo, start_date, end_date, is_current, description)=>{
        return(
            <div className = "education-card-container">
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
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>
                </div>

            </div>
        );
    }

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
                <h5 className = "section-subheading">ABOUT ME</h5>
                <h2 className = "section-heading">My Resume</h2>

            </section>
            
        </main>
    );
}

export default Home;