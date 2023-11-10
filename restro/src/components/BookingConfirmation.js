import React from 'react';
import { useLocation } from 'react-router-dom';
import './confirmation.css'
const BookingConfirmation = () => {
  // Generate a random booking number
  const location = useLocation();
  const { name, visitingDate, numPeople, tableID } = location.state
  const bookingNumber = Math.floor(100000 + Math.random() * 900000);
  const formattedVisitingDate = visitingDate.toLocaleString();
  // Get today's date as the booking date
  const today = new Date();
  const bookingDate = today.toLocaleDateString();

  // Calculate subtotal, tax, and total
  const subtotal = numPeople * 10;
  const tax = (subtotal * 0.18).toFixed(2);
  const total = (subtotal + parseFloat(tax)).toFixed(2);

 


  return (
    <div className="container  mb-5" style={{border:'0.1px solid black', marginTop:'5.8rem'}}>
      <div className="d-flex justify-content-center row">
        <div className="col-md-10">
          <div className="receipt bg-white p-3 rounded">
            <img src="images/YummyTown.png" width="120" alt="Icon" />
            <h4 className="mt-2 mb-3">Your booking is confirmed!</h4>
            <h6 className="name">Hello {name},</h6>
            <span className="fs-12 text-black-50">
              Your booking has been confirmed and you are all set to visit us.
            </span>
            <hr />
            <div className="d-flex flex-column order-details">
              <div className="booking-info">
                <span className="fs-12">Booking date</span>
                <span className="font-weight-bold">{bookingDate}</span>
              </div>
              <div className="booking-info">
                <span className="fs-12">Booking number</span>
                <span className="font-weight-bold">BK{bookingNumber}</span>
              </div>
              <div className="booking-info">
                <span className="fs-12">Payment method</span>
                <span className="font-weight-bold">Credit card</span>
                <img className="ml-1 mb-1" src="https://i.imgur.com/ZZr3Yqj.png" width="20" alt="Credit card" />
              </div>
              <div className="booking-info">
                <span className="fs-12">Visiting Date</span>
                <span className="font-weight-bold text-success">{formattedVisitingDate}</span>
              </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center product-details" style={{marginBottom:'1.0rem'}}>
              <div className="d-flex flex-row product-name-image">
                <img className="rounded" src="images/restro_icon.webp" width="80" alt="Product" />
                <div className="d-flex flex-column justify-content-between ml-2">
                  <div>
                  
            
                  </div>
                  <span className="d-block font-weight-bold p-name" style={{paddingBottom:'1.7rem'}}>Table Allocated</span>
                </div>
              </div>
              <div className="product-price">
                <h5>{tableID}</h5>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center product-details">
              <div className="d-flex flex-row product-name-image">
                <img className="rounded" src="images/users_crowd.webp" width="80" alt="Product" />
                <div className="d-flex flex-column justify-content-between ml-2">
                  <div>
               
                 
                  </div>
                  <span className="d-block font-weight-bold p-name" style={{paddingBottom:'1.7rem'}}>Number of People</span>
                </div>
              </div>
              <div className="product-price">
                <h5>{numPeople}</h5>
              </div>
            </div>
            <div className="mt-5 amount row">
              <div className="d-flex justify-content-center col-md-6">
                <img src="https://i.imgur.com/AXdWCWr.gif" width="250" height="100" alt="QR Code" />
              </div>
              <div className="col-md-6">
                <div className="billing">
                  <div className="d-flex justify-content-between">
                    <span>Subtotal</span>
                    <span className="font-weight-bold">${subtotal}</span>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <span>Tax </span>
                    <span className="font-weight-bold">${tax}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mt-1">
                    <span className="font-weight-bold">Total</span>
                    <span className="font-weight-bold text-success">${total}</span>
                  </div>
                </div>
              </div>
            </div>
            <span className="d-block">Thank you for choosing us!</span>
            <span className="font-weight-bold text-success">We are looking forward to serving you.</span>
            <hr />
            <div className="d-flex justify-content-between align-items-center footer">
              <div className="thanks">
                <span className="d-block font-weight-bold">Thanks for choosing us</span>
                <span>YummyTown Team</span>
              </div>
              <div className="d-flex flex-column justify-content-end align-items-end">
                <span className="d-block font-weight-bold">Need Help?</span>
                <span>Call - 974493933</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default BookingConfirmation
