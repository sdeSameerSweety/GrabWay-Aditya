// DriverDetails.js
import React from "react";
import "./DriverMoreDetails.css"; // Import the CSS file

const DriverDetails = () => {
  // Realistic driver and route data for a driver in Bhubaneswar, Odisha
  const driver = {
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    licenseNumber: "OD123456",
    vehicleNumber: "OD-02-AB-1234",
    carType: "Sedan",
    totalSeats: 3,
    totalFare: "₹500",
    profileImage: "driver-avatar.jpg",
    rating: 4.9,
  };

  const route = {
    from: "Bhubaneswar, Odisha",
    to: "Puri, Odisha",
    pickupTime: "Morning: 7:30 AM",
    dropTime: "Evening: 5:00 PM",
    passengers: [
      {
        id: 1,
        name: "Amit Patel",
        email: "amit@example.com",
        phone: "987-654-3210",
        from: "Bhubaneswar, Odisha",
        to: "Puri, Odisha",
        details: "Frequent traveler to Puri",
      },
      {
        id: 2,
        name: "Neha Singh",
        email: "neha@example.com",
        phone: "789-123-4567",
        from: "Bhubaneswar, Odisha",
        to: "Puri, Odisha",
        details: "Visiting Jagannath Temple",
      },
      {
        id: 3,
        name: "Rahul Sharma",
        email: "rahul@example.com",
        phone: "888-555-3333",
        from: "Bhubaneswar, Odisha",
        to: "Puri, Odisha",
        details: "Solo traveler for leisure",
      },
    ],
  };

  return (
    <div className="driver-details-container">
      <div className="profile-header">
        <img
          src={driver.profileImage}
          alt={`Profile of ${driver.name}`}
          className="profile-image"
        />
        <div className="driver-info">
          <h2>{driver.name}</h2>
          <p>Email: {driver.email}</p>
          <p>DL Number: {driver.licenseNumber}</p>
          <p>Vehicle Number: {driver.vehicleNumber}</p>
          <p>Car Type: {driver.carType}</p>
          <div className="driver-rating">
            <span className="badge">Top Rated</span>
            <p>Rating: {driver.rating}</p>
          </div>
        </div>
      </div>
      <div className="route-info">
        <h3>Route Information</h3>
        <p>From: {route.from}</p>
        <p>To: {route.to}</p>
        <p>Pickup Time: {route.pickupTime}</p>
        <p>Drop Time: {route.dropTime}</p>
        <p>Total Seats: {driver.totalSeats}</p>
        <p>Total Fare: {driver.totalFare}</p>
      </div>
      <div className="passenger-list">
        {route.passengers.map((passenger) => (
          <div key={passenger.id} className="customer-card">
            <h4>Customer Information</h4>
            <p>Name: {passenger.name}</p>
            <p>Email: {passenger.email}</p>
            <p>Phone: {passenger.phone}</p>
            <p>From: {passenger.from}</p>
            <p>To: {passenger.to}</p>
            <div className="details-divider"></div>
            <p>{passenger.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriverDetails;
