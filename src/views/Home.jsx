import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";

import Navbar from "../components/Navbar";

import info from "../media/input.json"


import './styles/Home.css';

function Home(){
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return(
        <main id ="home">
            <Navbar />
            <section className = "hero">
                <article className = "hero-content">
                    <img src = {info.display_image} alt = "Hero" id = "hero-image" />
                </article>
                <article className = "hero-content">
                    <div className = "hero-content-container"> 
                        <h5 className = "hero-content-container-top-text">{info.full_name == null ? "FULL NAME" : info.full_name.toUpperCase() }</h5>
                        <h1 className = "hero-content-container-title">Welcome!</h1>
                        <h1 className = "hero-content-container-title">I'm <span>{info.display_name == null ? "DISPLAY NAME" : info.display_name }</span></h1>
                    </div>
                    <div className = "hero-button-container">
                        <button className = "hero-content-container-button" onClick = {() => navigate('/projects')}>
                            <span>Let's Connect</span>
                        </button>
                    </div>
                </article>

            </section>
        </main>
    );
}

export default Home;