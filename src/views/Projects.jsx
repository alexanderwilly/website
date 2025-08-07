import React from "react";
import {Link, useNavigate} from "react-router-dom";


function Projects(){
    const navigate = useNavigate();

    return(
        <main>
            <h1>My Projects</h1>
            <p>Here you can find a list of my projects.</p>
            <p>Each project showcases different skills and technologies.</p>
            <p>Feel free to check them out and get inspired!</p>
            <Link to="/">Return to Home</Link>
            
        </main>
    )
}

export default Projects;