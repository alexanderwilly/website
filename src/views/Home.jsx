import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";

import Navbar from "../components/Navbar";

import './styles/Home.css';

function Home(){
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return(
        <main>
            <Navbar />
            <h1>Welcome to my website</h1>
            <p>This is a simple website built with React.</p>
            <p>Feel free to explore and learn more about my projects.</p>
            <p>Thank you for visiting!</p>
            <Link to="/projects">View My Projects</Link>
        </main>
    );
}

export default Home;