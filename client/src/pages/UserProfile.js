import Header from "../components/Header";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserProfile.css";

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userEmail = localStorage.getItem("email");

        const response = await axios.get(`http://localhost:8080/${userEmail}`);

        const { firstname, lastname, email } = response.data;

        setUserDetails({
          firstName: firstname,
          lastName: lastname,
          userEmail: email,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div className="user-profile">
      <Header />
      <div className="user-profile-parent">
        <header className="user-profile-wrapper">
          <h3 className="user-profile1">User Profile</h3>
        </header>
        <div className="user-profile-container">
          <h2>First Name: {userDetails.firstName}</h2>
          <h2>Last Name: {userDetails.lastName}</h2>
          <h2>Email: {userDetails.userEmail}</h2>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
