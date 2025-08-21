
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { toast, ToastContainer, Slide} from 'react-toastify';
import Home from './views/Home';
import Projects from './views/Projects';

import './App.css'; 
import 'react-toastify/dist/ReactToastify.css';

function App(){

  useEffect(() => {
    toast.warning("Notice: Only the main page can be refreshed. Please use the navigation links to browse this site. Thank you!");
    toast.info("Notice: This site is best viewed on a desktop or laptop computer. Thank you for visiting!");
  }, []);

  return(
    <div className='container'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/projects' element={<Projects />} />
      </Routes>
      <ToastContainer 
        position="bottom-center"
        transition={Slide}
        autoClose={false}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        className="toast-container"
      />
    </div>
  )
}

export default App;