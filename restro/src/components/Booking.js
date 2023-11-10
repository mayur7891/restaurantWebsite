import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Booking = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dateTime, setDateTime] = useState(new Date()); // Initialize with the current date and time
  const [numPeople, setNumPeople] = useState(''); // Initialize with an empty string
  const [specialRequest, setSpecialRequest] = useState('');

  const navigate = useNavigate();

  const handleBooking = async () => {
    // Check if the user is logged in using localStorage
    const userData = localStorage.getItem('userData');
    if (!userData) {
      // User is not logged in, redirect to the login page
      navigate('/login');
      return;
    }
    
    // Parse the user data from localStorage
    const user = JSON.parse(userData);
  
    const formattedDateTime = dateTime.toISOString().slice(0, 19).replace('T', ' '); // Format the dateTime
  
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('DateTime:', formattedDateTime);
    console.log('Number of People:', numPeople);
    console.log('Special Request:', specialRequest);
    console.log('User ID:', user.userId); // Log the user ID to confirm it's obtained from localStorage
  
    const bookingData = {
      name,
      email,
      dateTime: formattedDateTime,
      numberOfPeople: numPeople, // Use the correct field name
      specialRequest,
      userId: user.userId, // Include the user ID
    };
  
    try {
      const response = await fetch('http://localhost:5000/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
  
      if (response.ok) {
        const result = await response.json();
        alert(`Table booked successfully. Table ID: ${result.tableID}`);
        navigate('/Confirmation', {
          state: {
            name,
            visitingDate: dateTime,
            numPeople,
            tableID: result.tableID, // You need to determine the table ID
          },
        });
      } else {
        alert('Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Error while booking:', error);
    }
  };
  
  

  return (
    <>
      <div className="container-xxl py-5 px-0 wow fadeInUp" data-wow-delay="0.1s" style={{ marginTop: '3.3rem' }}>
        <div className="row g-0">
          <div className="col-md-6">
            <div className="video"></div>
          </div>
          <div className="col-md-6 bg-dark d-flex align-items-center">
            <div className="p-5 wow fadeInUp" data-wow-delay="0.2s">
              <h5 className="section-title ff-secondary text-start text-primary fw-normal">Reservation</h5>
              <h1 className="text-white mb-4">Book A Table Online</h1>
              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input type="text" className="form-control" id="name" placeholder="Your Name" onChange={(e) => setName(e.target.value)} />
                      <label htmlFor="name">Your Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input type="email" className="form-control " id="email" placeholder="Your Email" onChange={(e) => setEmail(e.target.value)} />
                      <label htmlFor="email">Your Email</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating date" id="date3" data-target-input="nearest">
                      <DatePicker
                        selected={dateTime}
                        onChange={(date) => setDateTime(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="yyyy-MM-dd HH:mm"
                        placeholderText="Date & Time"
                        popperPlacement="bottom-start"
                        className="form-control custom-style"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input type="text" className="form-control" id="numPeople" placeholder="Number of People" onChange={(e) => setNumPeople(e.target.value)} />
                      <label htmlFor="numPeople">Number of People</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Special Request"
                        id="message"
                        style={{ height: '100px' }}
                        onChange={(e) => setSpecialRequest(e.target.value)}
                      ></textarea>
                      <label htmlFor="message">Special Request</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary w-100 py-3" type="button" onClick={handleBooking}>
                      Book Now
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-12"></div>
        </div>
      </div>
    </>
  );
};

export default Booking;
