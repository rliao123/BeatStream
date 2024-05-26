import {
  TextField,
  InputAdornment,
  Icon,
  IconButton,
  Snackbar,
  Button,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./Header.css";
import Cookies from "js-cookie";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const isSignedIn = localStorage.getItem("isSignedIn");
  console.log("hi: ", isSignedIn);
  //const isLoggedIn = true;
  // const isMerchant = localStorage.getItem("isOwner");

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

      // if (isMerchant === 'false') {
      //   localStorage.removeItem("username");
      // } else {
      //   localStorage.removeItem("restaurant_id");
      //   localStorage.removeItem("email");
      // }
      localStorage.removeItem("email");
      localStorage.removeItem("isSignedIn");

      Cookies.remove("jwt"); // Remove jwt cookie
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

  // const [searchInput, setSearchInput] = useState("");
  // const handleSearch = async () => {
  //   navigate(`/searched-results?query=${encodeURIComponent(searchInput)}`);
  // };

  // const handleKeyPress = (event) => {
  //   if (event.key === "Enter") {
  //     handleSearch();
  //   }
  // };

  return (
    <header className="header-wrapper">
      <div className="header">
        {/* <img className="logo-icon" loading="lazy" alt="" src="/logo@2x.png" /> */}
        <img
          className="logo-image-icon"
          alt=""
          src="/logo.png"
          onClick={onLogoContainerClick}
        />
        <div className="header-frame">
          <TextField
            className="search-frame-inner"
            placeholder="Enter song, artist, or album you are looking for"
            // onChange={(e) => setSearchInput(e.target.value)} // Add an onChange handler to update searchInput
            // onKeyUp={handleKeyPress} // Add onKeyPress event handler
            variant="outlined"
            InputProps={{
              endAdornment: (
                <img width="19px" height="19px" src="/search-icon.png" />
              ),
            }}
            sx={{
              "& fieldset": { borderColor: "#808080" },
              "& .MuiInputBase-root": {
                height: "49px",
                width: "420px",
                backgroundColor: "#fff",
                paddingRight: "25px",
                borderRadius: "10px",
              },
              "& .MuiInputBase-input": { color: "#808080" },
            }}
          />

          <div className="header-container">
            {isSignedIn && ( // Conditional rendering based on isLoggedIn state
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
            {isSignedIn && ( // Conditional rendering based on isLoggedIn state
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
            {isSignedIn ? ( // Conditional rendering based on isLoggedIn state
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
                onClick={onSignOutClick} // Call onLogoutClick function for logout
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
