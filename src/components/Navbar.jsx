import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../media/logo.png';
import cross_icon from '../media/cross_icon.png';
import bars_icon from '../media/bars_icon.png';

import './styles/Navbar.css';

function Navbar() {
    const navigate = useNavigate();
    
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <nav className="navbar">
            <img src={logo} alt="logo" className="logo" onClick={() => navigate('/')} />

            <ul className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
                <li id="close-icon" className="close-icon">
                    <span onClick={toggleSidebar}>
                        <img src={cross_icon} alt="close" />
                    </span>
                </li>
                <li className="sidebar-link"><Link to="/" onClick={toggleSidebar}>HOME</Link></li>
                <li className="sidebar-link"><Link to="/projects" onClick={toggleSidebar}>PROJECTS</Link></li>
                <li className="sidebar-link"><Link to="/chat" onClick={toggleSidebar}>CHATBOT</Link></li>
                <li className="sidebar-link"><Link to="/contact" onClick={toggleSidebar}>CONTACT</Link></li>
            </ul>

            <ul className="top-nav">
                <li className="top-nav-link"><Link to="/">HOME</Link></li>
                <li className="top-nav-link"><Link to="/projects">PROJECTS</Link></li>
                <li className="top-nav-link"><Link to="/chat">CHATBOT</Link></li>
                <li className="top-nav-link"><Link to="/contact">CONTACT</Link></li>

                <li id="bars-icon" className="bars-icon">
                    <span onClick={toggleSidebar}>
                        <img src={bars_icon} alt="bars_icon" />
                    </span>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;