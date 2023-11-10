import React from 'react';
import Slider from "react-slick";

const Testimonial = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true, // Center the active slide
    focusOnSelect: true, // Focus on a slide when clicked
  };
  

  const testimonials = [
    {
      name: "Ankita ",
      profession: "Software Engineer",
      content: "What a delightful dining experience! The food was exquisite, and the service was impeccable. I can't wait to return to this restaurant",
      avatar: "restoran/img/testimonial-1.jpg",
    },
    {
      name: "Rahul ",
      profession: "Foodie",
      content: "I hosted a special dinner event at this restaurant, and it was a huge hit! The ambiance, the flavors, and the hospitality made it an unforgettable evening",
      avatar: "restoran/img/testimonial-2.jpg",
    },
    {
      name: "Shrihari",
      profession: "Youtuber",
      content: "As a regular customer, I can vouch for the consistency of this restaurant's quality. The menu is diverse, and the staff is always welcoming. It's my for great food.",
      avatar: "restoran/img/testimonial-3.jpg",
    },
    {
      name: "Misty",
      profession: "Gym Trainer",
      content: "The presentation of dishes at this restaurant is a work of art. Every plate feels like a masterpiece, and the taste matches the visual appeal. I'm a fan!",
      avatar: "restoran/img/testimonial-4.jpg",
    },
    {
      name: "Abhishek",
      profession: "Doctor",
      content: "I've had the pleasure of enjoying both lunch and dinner here. The variety of options make every visit a new culinary adventure. Highly recommended!",
      avatar: "restoran/img/testimonial-2.jpg",
    },
  ];

  return (
    <div className="container samplestyle" style={{ marginTop: '2.3rem' }}>
       <div class="text-center">
                    <h5 class="section-title ff-secondary text-center text-primary fw-normal">Testimonial</h5>
                    <h1 class="mb-5">Our Clients Say!!!</h1>
                </div>
    <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {testimonials.map((testimonial, index) => (
          <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
            <div className="testimonial-item d-flex flex-column align-items-center p-4 rounded m-auto" style={{ border: '1px solid transparent', boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.2)', transform: 'scale(0.95)', maxWidth: '60%', background:'#ffcd62' }}>
              <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
              <p style={{ textAlign: 'center' }}>{testimonial.content}</p>
              <div className="d-flex">
                <img
                  className="img-fluid rounded-circle"
                  src={testimonial.avatar}
                  style={{ width: '50px', height: '50px' }}
                  alt={`Client ${index + 1} Avatar`}
                />
                <div className="ps-3">
                  <h5 className="mb-1">{testimonial.name}</h5>
                  <small>{testimonial.profession}</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#testimonialCarousel"
        data-bs-slide="prev"
        style={{ background: 'black', width: '2%', height: '20%', top: '6rem' }}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#testimonialCarousel"
        data-bs-slide="next"
        style={{ background: 'black', width: '2%', height: '20%', top: '6rem' }}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  </div>
  );
};

export default Testimonial;
