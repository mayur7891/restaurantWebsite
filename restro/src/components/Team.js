import React from 'react';
import { Link } from 'react-router-dom';

const Team = () => {
  const teamMembers = [
    { name: "Vivek Gotecha", designation: "Chef" },
    { name: "Sahil Sharma", designation: "Sous Chef" },
    { name: "Vedant Rawat", designation: "Pastry Chef" },
    { name: "Sushil Karpe", designation: "Head Chef" },
  ];

  return (
    <div className="container-xxl pt-5 pb-3">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h5 className="section-title ff-secondary text-center text-primary fw-normal">Team Members</h5>
          <h1 className="mb-5">Our Master Chefs</h1>
        </div>
        <div className="row g-4">
          {teamMembers.map((teamMember, index) => (
            <div
              key={index}
              className={`col-lg-3 col-md-6 wow fadeInUp`}
              data-wow-delay={`${(index % 4 + 1) * 0.2}s`}
            >
              <div className="team-item text-center rounded overflow-hidden">
                <div className="rounded-circle overflow-hidden m-4">
                  <img
                    className="img-fluid"
                    src={`restoran/img/team-${index + 1}.jpg`}
                    alt={`Team Member ${index + 1}`}
                  />
                </div>
                <h5 className="mb-0">{teamMember.name}</h5>
                <small>{teamMember.designation}</small>
                <div className="d-flex justify-content-center mt-3">
                  <Link className="btn btn-square btn-primary mx-1" to="">
                    <i className="fab fa-facebook-f"></i>
                  </Link>
                  <Link className="btn btn-square btn-primary mx-1" to="">
                    <i className="fab fa-twitter"></i>
                  </Link>
                  <Link className="btn btn-square btn-primary mx-1" to="">
                    <i className="fab fa-instagram"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
