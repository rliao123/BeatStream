import handleLogin from "../pages/SignIn";
import handleLogout from "../pages/SignIn";
import Button from "@mui/material/Button";

const IsSignedIn = ({ IsSignedIn }) => {
  return IsSignedIn ? (
    <Button
      className="sign-in-button"
      onClick={handleLogout}
      disableElevation={true}
      variant="contained"
      sx={{
        textTransform: "none",
        color: "#fdfbfa",
        fontSize: "14",
        background: "#202020",
        borderRadius: "10px",
        "&:hover": { background: "#202020" },
        width: 96,
        height: 49,
      }}
    >
      Logout
    </Button>
  ) : (
    <Button
      className="sign-in-button"
      onClick={handleLogin}
      disableElevation={true}
      variant="contained"
      sx={{
        textTransform: "none",
        color: "#fdfbfa",
        fontSize: "14",
        background: "#202020",
        borderRadius: "10px",
        "&:hover": { background: "#202020" },
        width: 96,
        height: 49,
      }}
    >
      Sign In
    </Button>
  );
};

export default IsSignedIn;
