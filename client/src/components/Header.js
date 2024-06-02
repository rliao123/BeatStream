import { IconButton, Snackbar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./Header.css";
import Cookies from "js-cookie";
import axios from "axios";

/**
 * Header bar with user dashboard hamburger button, user profile button, sign in/out button
 */
const Header = () => {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const isSignedIn = localStorage.getItem("isSignedIn");

  const onSignInClick = () => {
    navigate("/sign-in");
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const onSignOutClick = async () => {
    try {
      const response = await axios.get("http://localhost:8080/sign-out");
      console.log("Login Successful:", response.data);
      setOpenSnackbar(true);

      localStorage.removeItem("email");
      localStorage.removeItem("isSignedIn");
      localStorage.removeItem("playlistId");

      Cookies.remove("jwt");
      setTimeout(() => {
        navigate("/sign-in");
      }, 2000);
    } catch (error) {
      console.error("Sign Out Failed:", error);
    }
  };

  const onLogoContainerClick = () => {
    navigate("/");
  };

  return (
    <header className="header-wrapper">
      <div className="header">
        <img
          className="logo-image-icon"
          alt=""
          src="/logo.png"
          onClick={onLogoContainerClick}
        />
        <div className="header-frame">
          <div className="header-container">
            {isSignedIn && (
              <Button
                onClick={() => {
                  navigate("/user-dashboard");
                }}
                sx={{ "&:hover": { background: "#fff" } }}
              >
                <img
                  alt=""
                  src="/user-dash.png"
                  style={{
                    width: "30px",
                    height: "30px",
                  }}
                />
              </Button>
            )}
            {isSignedIn && (
              <Button
                onClick={() => {
                  navigate("/user-profile");
                }}
                sx={{ "&:hover": { background: "#fff" } }}
              >
                <img
                  alt=""
                  src="/user-profile.png"
                  style={{
                    width: "40px",
                    height: "40px",
                    marginLeft: "-15px",
                  }}
                />
              </Button>
            )}
            {isSignedIn ? (
              <Button
                className="sign-out-button"
                disableElevation={true}
                variant="contained"
                sx={{
                  textTransform: "none",
                  color: "#fdfbfa",
                  fontSize: "14",
                  background: "#3BA1B5",
                  borderRadius: "20px",
                  "&:hover": { background: "#3BA1B5" },
                  width: 88,
                  height: 42,
                }}
                onClick={onSignOutClick}
              >
                Sign Out
              </Button>
            ) : (
              <Button
                className="homepage-sign-in-button"
                disableElevation={true}
                variant="contained"
                sx={{
                  textTransform: "none",
                  color: "#fdfbfa",
                  fontSize: "14",
                  background: "#3BA1B5",
                  borderRadius: "20px",
                  "&:hover": { background: "#3BA1B5" },
                  width: 80,
                  height: 42,
                }}
                onClick={onSignInClick}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={isSignedIn ? "Sign in successful." : "Sign out successful"}
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
    </header>
  );
};

export default Header;
