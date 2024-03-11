import React from 'react'
import '../assets/index.css'
import landing1 from '../images/landing2.jpeg'
import Aboutus from '../images/aboutus1.jpeg'
import Aboutus1 from '../images/aboutus2.jpeg'
import Card from '../images/card1.jpeg'
import Price from '../images/prise_bg.png.webp'

export default function Landingpage() {
  return (
    <div>
      <header className='landing1'>
        <div className="nav_bar">
          <nav>
            <h2 className="logo">PHS</h2>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#aboutus">About us</a></li>
              <li><a href="#service">Service</a></li>
              <li><a href="#price">Prices</a></li>
              <li> <a href="/signup" class="boxed-btn3">Book an Appointment</a></li>

            </ul>
          </nav>
        </div>
        <div className="lan_context">
          <div className="content">
            <h1>Perfect<br /><br /><span >Hair</span><br /><br /><span style={{ marginLeft: '250px' }}>Saloon</span></h1>
          </div>
          <div className="image_slider">
            <img src={landing1} alt="" />
          </div>
        </div>
      </header>
      <header className="aboutus" id="aboutus">
        <div className="about_us_content">
          <div className="about_images">
            <div className="about1">
              <img src={Aboutus} alt="" />
            </div>
            <div className="aboutus2">
              <img src={Aboutus1} alt="" />
            </div>
          </div>
          <div className="about_text">
            <h3>About us</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing eliteiusmod tempor incididunt ut labore et dolore magna aliqua. Qpsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Quis ipsum suspendisse ultr.
            </p>
            <p class="opening_hour">
              Opening Hour
              <span>10:00 am - 10:00 pm</span>
            </p>
            <a href="/signup" class="boxed-btn3">Book an Appointment</a>
          </div>
        </div>
      </header>
      <header className="services" id="service">
        <div className="service_content">
          <h3>Our Services</h3>
        </div>
        <div className="service_card">
          <div className="card">
            <img src={Card} alt="" />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing eliteiusmod tempor incididunt ut labore et dolore magna aliqua. Qpsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Quis ipsum suspendisse ultr.</p>
          </div>
          <div className="card">
            <img src={Card} alt="" />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing eliteiusmod tempor incididunt ut labore et dolore magna aliqua. Qpsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Quis ipsum suspendisse ultr.</p>
          </div>
          <div className="card">
            <img src={Card} alt="" />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing eliteiusmod tempor incididunt ut labore et dolore magna aliqua. Qpsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Quis ipsum suspendisse ultr.</p>
          </div>
          <div className="card">
            <img src={Card} alt="" />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing eliteiusmod tempor incididunt ut labore et dolore magna aliqua. Qpsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Quis ipsum suspendisse ultr.</p>
          </div>
        </div>
      </header>
      <header className="pricing" id="price">
        <div className="price_content">
          <div className="price_title">
            <h3>Our Prices</h3>
          </div>
          <div className="price_details">
            <div className="details">
              <div className="price_prc">
                <h2>Hair Style</h2>
                <span>Hair cut -------- $8</span>
                <p>khfkjahBNDvgiusKJHcxbvhukjH</p>
              </div>
              <div className="price_prc">
                <h2>Hair Style</h2>
                <span>Hair cut -------- $8</span>
                <p>khfkjahBNDvgiusKJHcxbvhukjH</p>
              </div>
              <div className="price_prc">
                <h2>Hair Style</h2>
                <span>Hair cut -------- $8</span>
                <p>khfkjahBNDvgiusKJHcxbvhukjH</p>
              </div>

            </div>
            <div className="details" style={{ marginLeft: '250px' }}>
              <div className="price_prc">
                <h2>Hair Style</h2>
                <span>Hair cut -------- $8</span>
                <p>khfkjahBNDvgiusKJHcxbvhukjH</p>
              </div>
              <div className="price_prc">
                <h2>Hair Style</h2>
                <span>Hair cut -------- $8</span>
                <p>khfkjahBNDvgiusKJHcxbvhukjH</p>
              </div>
              <div className="price_prc">
                <h2>Hair Style</h2>
                <span>Hair cut -------- $8</span>
                <p>khfkjahBNDvgiusKJHcxbvhukjH</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <footer class="footer">
        <div class="icons">
          <a href="#"><i class="fab fa-facebook"></i></a>
          <a href="#"><i class="fab fa-linkedin"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
          <a href="#"><i class="fab fa-twitter"></i></a>
          <p class="company-name">
            Perfect Hair Saloon &copy; 2024, ALL Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  )
}
