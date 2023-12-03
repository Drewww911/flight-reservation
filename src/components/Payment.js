// Payment.js
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './auth/AuthContext';

const Payment = (props) => {
  const flightDetails = props.selectedFlight;
  const subtotal = ((Math.random() * (1000.00 - 500.00)) + 500.00);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handlePayment = () => {
    axios.put(`http://localhost:3001/api/flights/reserve`, {
      flightId: flightDetails.id,
      userEmail: user.email,
      seatId: props.selectedSeat,
      price: subtotal,
    })
    .then(() => 
    {alert("Booked successfully")
    navigate(`/modify-flights`);})
    
  };

  return (
    <div>
      <h2>Payment</h2>
      {flightDetails && (
        <div>
          <h3>Flight Details</h3>
          <p>Date: {new Date(flightDetails.flightDate).toLocaleDateString()}</p>
          <p>Departure: {flightDetails.departure}</p>
          <p>Destination: {flightDetails.arrival}</p>
        </div>
      )}

      <div>
        <h3>Payment Details</h3>
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
      </div>

      <form>
        {/* Add your credit card form fields here */}
        <label>Card Number:   </label>
        <input type="text" />
        <label>  Expiration Date: </label>
        <input type="text" />
        <label>   CVV:   </label>
        <input type="text" />
        <button type="button" onClick={handlePayment}>
          Submit Payment
        </button>
      </form>
    </div>
  );
};

export default Payment;
