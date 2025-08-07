
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './views/Home';
import Projects from './views/Projects';

import './App.css'; 

function App(){
  return(
    <div className='container'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/projects' element={<Projects />} />
      </Routes>
    </div>
  )
}

// function App() {

//   return (

//     <>

//       <Router>

//         <div className='container'>

//           <Routes>

//             <Route path='/PetHeaven' element={<GuestPage />} />

//             <Route path='/PetHeaven/login' element={<Login />} /> 

//             <Route path='/PetHeaven/register' element={<Register />} />

//             <Route path='/PetHeaven/reset-password' element={<ResetPassword />} />

//             <Route path='/PetHeaven/about-us' element={<AboutUs />} />

//             <Route path='/PetHeaven/adoption' element={<Adoption />} />

//             <Route path = '/PetHeaven/pet-info' element={<PetInfo />} />

//             <Route path='/PetHeaven/donate' element={<Donate />} />

//             <Route path='/PetHeaven/volunteer' element={<Volunteer />} />

//             <Route path='/PetHeaven/contact-us' element={<ContactUs />} />



//             <Route path='/PetHeaven/member/profile' element={<Profile />} />

//             <Route path='/PetHeaven/member/adopt' element={<Adopt />} />

//             <Route path='/PetHeaven/member/release-pet' element={<ReleasePet />} />

//             <Route path='/PetHeaven/member/volunteer' element={<VolunteerMember />} />

//           </Routes>

//           <ToastContainer />

//         </div>

//       </Router>

//     </>

//   );

// }

export default App;