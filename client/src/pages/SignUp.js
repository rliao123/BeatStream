import { TextField, Button, Snackbar, IconButton } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./SignIn.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = useState(false); // State for Snackbars
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message
  const [isSignedIn, setIsSignedIn] = useState(!!Cookies.get("jwt"));
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validatePassword = (field) => {
    let hasSixChar = field.length >= 6;
    let hasLowerChar = /(.*[a-z].*)/.test(field);
    let hasUpperChar = /(.*[A-Z].*)/.test(field);
    let hasNumber = /(.*[0-9].*)/.test(field);
    let hasSpecialChar = /[^A-Za-z0-9]/.test(field);
    if (
      !hasSixChar ||
      !hasLowerChar ||
      !hasUpperChar ||
      !hasNumber ||
      !hasSpecialChar
    ) {
      return "The password must have: at least 6 characters and include at least one each: a-z, A-Z, 0-9, and special characters.";
    } else return "";
  };

  const validateEmail = (field) => {
    // email validation
    let emailValid = field.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    if (!emailValid) {
      return "Invalid email address!";
    } else {
      return "";
    }
  };

  const validateFirstName = (field) => {
    if (/[^a-zA-Z\s]+/.test(field))
      return "First Name can only contain letters (a-z A-Z) only!";
    else return "";
  };

  const validateLastName = (field) => {
    if (/[^a-zA-Z\s]+/.test(field))
      return "Last Name can only contain letters (a-z A-Z) only!";
    else return "";
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSignInSuccess = (response) => {
    axios
      .post("http://localhost:8080/googleSuccessfullSignIn", response)
      .then((responseFromBackend) => {
        console.log("Login Successful:", responseFromBackend);
        // Set the JWT token in the browser's cookies
        document.cookie = Cookies.set("jwt", responseFromBackend.data.jwt);
        setOpenSnackbar(true); // Open Snackbar on successful registration
        setIsSignedIn(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        console.error("Signup Failed:", error);
        if (error.response) {
          console.error("Response Data:", error.response.data);
        }
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onLogoContainerClick = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (
      validateEmail(formData.email) !== "" ||
      validatePassword(formData.password) !== "" ||
      validateFirstName(formData.firstname) !== "" ||
      validateLastName(formData.lastname) !== ""
    ) {
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/sign-up",
        formData
      );
      console.log("Sign up Successful:", response.data);
      setOpenSnackbar(true); // Open Snackbar on successful registration
      setTimeout(() => {
        navigate("/sign-in"); // Redirect to login page after a delay
      }, 2000);
    } catch (error) {
      console.error("Signup Failed:", error);

      if (error.response) {
        console.error("Response Data:", error.response.data);
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
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <TextField
              className="form-group"
              name="firstname"
              value={formData.firstname}
              placeholder="First Name"
              required
              error={
                formSubmitted && validateFirstName(formData.firstname) != ""
              }
              helperText={
                formSubmitted ? validateFirstName(formData.firstname) : ""
              }
              onChange={handleChange}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor:
                    formSubmitted && validateFirstName(formData.firstname) != ""
                      ? "red"
                      : "#3ba1b5",
                },
              }}
            />
          </div>
          <div className="form-group">
            <TextField
              className="form-group"
              name="lastname"
              value={formData.lastname}
              required
              placeholder="Last Name"
              error={formSubmitted && validateLastName(formData.lastname) != ""}
              helperText={
                formSubmitted ? validateLastName(formData.lastname) : ""
              }
              onChange={handleChange}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor:
                    formSubmitted && validateFirstName(formData.firstname) != ""
                      ? "red"
                      : "#3ba1b5",
                },
              }}
            />
          </div>
          <div className="form-group">
            <TextField
              className="form-group"
              name="email"
              value={formData.email}
              required
              placeholder="Email"
              error={formSubmitted && validateEmail(formData.email) != ""}
              helperText={formSubmitted ? validateEmail(formData.email) : ""}
              onChange={handleChange}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor:
                    formSubmitted && validateFirstName(formData.firstname) != ""
                      ? "red"
                      : "#3ba1b5",
                },
              }}
            />
          </div>

          <div className="form-group">
            <TextField
              className="form-group"
              name="password"
              value={formData.password}
              placeholder="Password"
              type="password"
              onChange={handleChange}
              error={formSubmitted && validatePassword(formData.password) != ""}
              helperText={
                formSubmitted ? validatePassword(formData.password) : ""
              }
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor:
                    formSubmitted && validateFirstName(formData.firstname) != ""
                      ? "red"
                      : "#3ba1b5",
                },
              }}
            />
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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Sign up successful!"
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

export default SignUp;
