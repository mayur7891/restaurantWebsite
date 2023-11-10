import React from 'react'
import Navbar from './Navbar'
import Sample from './Sample'
import Services from './Services'
import Intro from './Intro'
import Footer from './Footer'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <>
    <div className="hero_area" style={{marginTop:'1.3rem'}}>
      <div className="bg-box">
        <img src="https://img.freepik.com/premium-photo/photo-closeup-shot-delicious-food_829042-89.jpg" alt="" />
      </div>
     {/* <Navbar></Navbar> */}
      <section className="slider_section">
        <div id="customCarousel1" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="container">
                <div className="row">
                  <div className="col-md-7 col-lg-6">
                    <div className="detail-box">
                      <h1 style={{color:'white'}}>Flavors of Elegance</h1>
                      <p>
                      Experience a delightful blend of ambiance and exquisite cuisine – the perfect recipe for unforgettable moments with your loved ones.
                      </p>
                      <div className="btn-box">
                        <Link to="/Booking" className="btn1">
                          Book A Table
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        
        </div>
      </section>
    </div>
    <Services></Services>
    <Intro buttonText="Read More" buttonLink="/About"></Intro>
   
  </>
  )
}

export default Home
