
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { toast, ToastContainer, Slide} from 'react-toastify';
import Home from './views/Home';
import Projects from './views/Projects';
import Contact from './views/Contact';
import Chat from './views/Chat'

import './App.css'; 
import 'react-toastify/dist/ReactToastify.css';

function App(){


  return(
    <div className='container'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/projects' element={<Projects />} />
        <Route path ='/chat' element={<Chat/>}/>
        <Route path='/contact' element={<Contact />} />
      </Routes>
      <ToastContainer />
      {/* <ToastContainer 
        position="bottom-center"
        transition={Slide}
        autoClose={false}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        className="toast-container"
      /> */}
    </div>
  )
}

export default App;