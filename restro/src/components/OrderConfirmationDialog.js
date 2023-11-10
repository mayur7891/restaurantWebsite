import React from 'react';
import './orderconfirmationdialog.css';

const OrderConfirmationDialog = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null; // Do not render the dialog if it's not open
  }

  return (
    <div className="order-confirmation-dialog">
      <div className="dialog-content">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <h2>Order Placed!</h2>
        <p>Your order has been successfully placed.</p>
      </div>
    </div>
  );
};

export default OrderConfirmationDialog;
