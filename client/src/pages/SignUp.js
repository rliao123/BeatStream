import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SignIn.css";

const SignUp = () => {
  const navigate = useNavigate();
  const onLogoContainerClick = () => {
    navigate("/");
  };
  return (
    <div className="signin-page">
      <img
        className="logo-image-icon-sign-in"
        alt=""
        src="/logo.png"
        onClick={onLogoContainerClick}
      />
      <div className="signin-container">
        <h2>Sign Up</h2>
        <form>
          <div className="form-group">
            <label htmlFor="first-name">First Name:</label>
            <input
              type="first-name"
              id="first-name"
              name="first-name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last Name:</label>
            <input type="last-name" id="last-name" name="last-name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit" className="signin-button">
            Sign Up
          </button>
        </form>
      </div>
      <p>
        Already have an account?{" "}
        <Link to="/sign-in" className="signup-link">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
