import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SignIn.css";

const SignIn = () => {
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
        <h2>Sign In</h2>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit" className="signin-button">
            Sign In
          </button>
        </form>
      </div>
      <p>
        Don't have an account?{" "}
        <Link to="/sign-up" className="signup-link">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
