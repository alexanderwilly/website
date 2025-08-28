import React, {useEffect, useState, useRef} from "react";
import {Link, useNavigate} from "react-router-dom";


import Navbar from "../components/Navbar";

import info from "../media/input.json"
import tagsData from "../media/tagsData.json";

// project
import beat_churn_with_ml from "../media/projects/beat_churn_with_ml.jpg"
import portfolio_2 from "../media/projects/portfolio_2.jpg"
import petheaven from "../media/projects/petheaven.jpg"
import activeaxis from "../media/projects/activeaxis.jpg"
import portfolio from "../media/projects/portfolio.jpg"
import cafe from "../media/projects/cafe.jpg"

// contact
import github_icon from "../media/social_media/github_icon.png"
import linkedin_icon from "../media/social_media/linkedin_icon.png"
import mail_icon from "../media/social_media/mail_icon.png"


import './styles/Projects.css';


function Projects(){
    const [selectedType, setSelectedType] = useState('All');
    const [selectedTags, setSelectedTags] = useState([]);
    const [availableTags, setAvailableTags] = useState([]);
    const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
    const [filteredProjects, setFilteredProjects] = useState(info.projects);
    

    const navigate = useNavigate();
    const tagDropdownRef = useRef(null);

    const home_image_maps = {
        // project images
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

    // --- Event Handlers ---
    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    const handleTagCheckboxChange = (tag) => {
        setSelectedTags(prevTags => 
            prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag]
        );
    };
    
    const removeSelectedTag = (tagToRemove) => {
        setSelectedTags(prevTags => prevTags.filter(tag => tag !== tagToRemove));
    };

    const ProjectCard = ({index, project_name, description, project_type, project_image, repository_link, product_link, tags}) =>{
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

    const ContactCard = ({index, contact_type, contact_display, contact_icon, contact_value})=>{
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
        window.scrollTo(0, 0);
    }, []);

    // Update available tags when the selected project type changes
    useEffect(() => {
        if (selectedType === 'All') {
            // combine all tags from all project types
            const allTags = tagsData.project_type.flatMap(type => type.tags);
            setAvailableTags([...new Set(allTags)]); // Use Set to remove duplicates
        } else {
            // Find the selected type object
            const typeObj = tagsData.project_type.find(p => p.type_name === selectedType);
            setAvailableTags(typeObj ? typeObj.tags : []);
        }
        // reset the selected tags
        setSelectedTags([]);
    }, [selectedType]);

    // handle clicks outside of the tag dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (tagDropdownRef.current && !tagDropdownRef.current.contains(event.target)) {
                setIsTagDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [tagDropdownRef]);

    // Filtering logic
    useEffect(() => {
        // show all projects.
        if (selectedTags.length === 0) {
            setFilteredProjects(info.projects);
            return;
        }

        // Filter by Tags
        const projects = info.projects.filter(project => 
            selectedTags.every(tag => project.tags.includes(tag))
        );

        setFilteredProjects(projects);
    }, [selectedTags]);

    return(
        <main id = "projects">
            <Navbar />
            <section className = "project-hero">
                <h1 className = "section-heading">Project Showcase</h1>
                <div className = "dropdown-container">
                    {/* Project Type Dropdown */}
                    <div className = "dropdown">
                        <label htmlFor="project-type" className = "dropdown-label">
                            Project Type
                        </label>
                        <select id = "project-type" value={selectedType} onChange = {handleTypeChange} className = "dropdown-select">
                            <option value = "All">All Project Types</option>
                            {
                                tagsData.project_type.map(type => (
                                    <option key={type.type_name} value = {type.type_name}>
                                        {type.type_name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    {/* Tags checkbox dropdown */}
                    <div className = "tag-dropdown-container" ref={tagDropdownRef}>
                        <label htmlFor = "tags" className = "dropdown-label">
                            Tags
                        </label>
                        <button type = "button" onClick = {()=> setIsTagDropdownOpen(!isTagDropdownOpen)} className = "dropdown-toggle">
                            <span>
                                {
                                    selectedTags.length > 0 ? `${selectedTags.length} selected` : 'Select Tags'
                                }
                            </span>
                        </button>
                        {
                            isTagDropdownOpen && (
                                <div className="dropdown-menu">
                                    <ul>
                                        {availableTags.map(tag => (
                                            <li key={tag} className="menu-item">
                                                <input
                                                    type="checkbox"
                                                    id={`tag-${tag}`}
                                                    checked={selectedTags.includes(tag)}
                                                    onChange={() => handleTagCheckboxChange(tag)}
                                                    className="menu-item-checkbox"
                                                />
                                                <label htmlFor={`tag-${tag}`} className="menu-item-label">
                                                    {tag}
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )
                        }
                    </div>
                </div>

                <div>
                    {/* --- Display Selected Tags --- */}
                    {
                        selectedTags.length > 0 && (
                            <div className = "active-filters-container">
                                <h3 className = "active-filters-title">Active Filters:</h3>
                                <div className = "tags-wrapper">
                                    {
                                        selectedTags.map(tag => (
                                            <div key={tag} className = "tag-pill">
                                                <span>{tag}</span>
                                                <button onClick={() => removeSelectedTag(tag)} className = "tag-remove-button">
                                                    X
                                                </button>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </section>


            {/* Project */}
            <section className = 'section-container'>
                <article className = "project-content">
                    {
                        filteredProjects.length > 0 ?
                        filteredProjects.map((project, index) => (
                            <ProjectCard
                                key={index}
                                index={index}
                                project_name={project.project_name}
                                description={project.description}
                                project_type={project.project_type}
                                project_image={project.project_image}
                                repository_link={project.repository_link}
                                product_link={project.product_link}
                                tags={project.tags}
                            />
                        ))

                        :

                        (
                            <p className = "no-results-text">No projects match the selected filters.</p>
                        )
                    }
                </article>

            </section>

            {/* Footer / Contact */}
            <section className = "section-container">
                <h1>{info.full_name === null ? "FULL NAME" : info.full_name}</h1>
                <h4>Let's Connect!</h4>

                 <div className = "contact-container">
                    {
                        info.contacts.slice(1, 3).map((contact, index) => (
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
                <footer>
                    <span>&copy; {new Date().getFullYear()} {info.full_name === null ? "" : `${info.full_name}.`} All rights reserved.</span>
                </footer>

            </section>
        </main>
    )
}

export default Projects;