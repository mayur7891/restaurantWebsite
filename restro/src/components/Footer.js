import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer_section" style={{ padding: '20px 0' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-4 footer-col">
            <div className="footer_contact">
              <h4 style={{color:'white'}}>Contact Us</h4>
              <div className="contact_link_box">
                <Link to="">
                  <i className="fas fa-map-marker" aria-hidden="true"></i>
                  <span>Pune</span>
                </Link>
                <Link to="">
                  <i className="fas fa-phone" aria-hidden="true"></i>
                  <span>Call +91 1234567890</span>
                </Link>
                <Link to="">
                  <i className="fas fa-envelope" aria-hidden="true"></i>
                  <span>yummytown@gmail.com</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 footer-col">
            <div className="footer_detail">
              <Link to="" className="footer-logo">
                Yummy Town
              </Link>
              <p>Where Every Bite is a Delight</p>
              <div className="footer_social">
                <Link to="">
                  <i className="fab fa-facebook" aria-hidden="true"></i>
                </Link>
                <Link to="">
                  <i className="fab fa-twitter" aria-hidden="true"></i>
                </Link>
                <Link to="">
                  <i className="fab fa-linkedin" aria-hidden="true"></i>
                </Link>
                <Link to="">
                  <i className="fab fa-instagram" aria-hidden="true"></i>
                </Link>
                <Link to="">
                  <i className="fab fa-pinterest" aria-hidden="true"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 footer-col">
            <h4 style={{color:'white'}}>Opening Hours</h4>
            <p>Everyday</p>
            <p>10.00 AM - 10.00 PM</p>
          </div>
        </div>
        <div className="footer-info">
          <p>
            &copy; <span id="displayYear"></span> All Rights Reserved By <Link to="https://html.design/">Yummy Town</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
