import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";

import Navbar from "../components/Navbar";

import heroImage from "../media/home_pic.png";

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
                <content className = "hero-content">
                    <img src = {heroImage} alt = "Hero" id = "hero-image" />
                </content>
                <content className = "hero-content">
                    <div className = "hero-content-container"> 
                        <h5 className = "hero-content-container-top-text">ALEXANDER WILLY JOHAN</h5>
                        <h1 className = "hero-content-container-title">Welcome!</h1>
                        <h1 className = "hero-content-container-title">I'm <span>Alexander Willy</span></h1>
                    </div>
                    <div className = "hero-button-container">
                        <button className = "hero-content-container-button" onClick = {() => navigate('/projects')}>
                            <span>Let's Connect</span>
                        </button>
                    </div>
                </content>

            </section>
        </main>
    );
}

export default Home;