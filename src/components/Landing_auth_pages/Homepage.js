import React, { useState, useEffect } from 'react';
import Navbar from '../Landing_auth_pages/Homenavbar';
import '../assets/homepage.css';
import landing1 from '../images/landing2.jpeg'

function Homepage() {
  return (
    <>
    <Navbar/>
    <div className="homepage">
      <div className="titl">
    <h1>Perfect<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hair<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;saloon</h1>

      </div>
      <div className="im">
    <img src={landing1} alt="" />
      </div>
    </div>
    </>
  );
}

export default Homepage;
