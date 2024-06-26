import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Snackbar, IconButton } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import "./SignIn.css";

const SignIn = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const onLogoContainerClick = () => {
    navigate("/");
  };
  const onSignUpClick = () => {
    navigate("/sign-up");
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/sign-in",
        formData
      );

      document.cookie = Cookies.set("jwt", response.data.jwt);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("isSignedIn", true);

      setOpenSnackbar(true);
      setIsSignedIn(true);
      setTimeout(() => {
        navigate("/user-dashboard");
      }, 2000);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const { error: errorMessage } = error.response.data;
        setErrorMsg(errorMessage);
      } else {
        setErrorMsg("We encountered an unexpected error.");
      }
    }
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
            <TextField
              className="form-group"
              placeholder="Email"
              name="email"
              value={formData.email}
              error={errorMsg != "" ? errorMsg : ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <TextField
              className="form-group"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errorMsg != "" ? errorMsg : ""}
              helperText={errorMsg}
              type="password"
              required
              placeholder="Password"
            />
          </div>
          <button type="submit" className="signin-button" onClick={handleLogin}>
            Sign In
          </button>
        </form>
      </div>
      <p>
        Don't have an account?{" "}
        <span className="signup-link" onClick={onSignUpClick}>
          Sign Up
        </span>
      </p>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={isSignedIn ? "Sign in successful." : "Logout successful"}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            X
          </IconButton>
        }
      />
    </div>
  );
};

export default SignIn;
