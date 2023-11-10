import React from 'react'
import Intro from './Intro'
import Sample from './Sample'
import Team from './Team'
import Testimonial from './Testimonial'

const About = () => {
  return (
    <>
    <div className="container-xxl py-5" style={{marginTop:'1.7rem'}}>
        <Intro buttonText="Book A Table" buttonLink="/Booking"></Intro>
        <Team></Team>
        <Testimonial></Testimonial>
    </div>
  
    </>
  )
}

export default About
