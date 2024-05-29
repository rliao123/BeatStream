import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  // check if email already exists
  const emailExists = await User.findOne({
    email: req.body.email,
  });
  if (emailExists)
    return res.status(403).json({
      error: "Email already exists",
    });

  // create new user if username and email are unique
  console.log(req.body);
  const user = new User(req.body);
  await user.save();
  res.status(201).json({
    message: "Sign up successful. Please login to continue.",
    redirect: "/",
  });
};

const homepage = async (req, res) => {
  res.status(200).json({
    message: "Successful!",
  });
};

const login = async (req, res) => {
  // find the user based on email
  console.log("Received req:", req.body);
  const { email, password } = req.body;
  console.log("Received email:", email);
  console.log("Received password:", password);

  try {
    const user = await User.findOne({ email: req.body.email });

    // if no user found
    if (!user) {
      return res.status(400).json({
        error: "Invalid Credentials",
      });
    }

    // if user is found, authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Invalid email or password",
      });
    }

    // generate a token with user id and jwt secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.cookie("jwt", token, {
      expire: new Date() + 9999,
      httpOnly: true,
      sameSite: "None",
    });

    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    // return the response with user
    const { email } = user;
    console.log("EMAIL: ", user);
    return res.json({
      message: "Login Successful",
      email,
      jwt: token,
    });
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const logout = async (req, res) => {
  // clear the cookie
  res.clearCookie("jwt");

  return res.status(200).json({
    message: "Logout Successful",
  });
};

const validate = async (req, res) => {
  try {
    // Check if the JWT token is present
    if (!req.body.jwt) {
      return res
        .status(401)
        .json({ error: "Unauthorized: JWT token is missing" });
    }

    const jwtToken = req.body.jwt;
    // Verify the JWT token
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

    // If decoding is successful, return a success response
    console.log("Decoded JWT:", decoded);
    return res.status(200).json({ message: "JWT Valid" });
  } catch (err) {
    // Handle errors, such as token expiration or invalid signature
    console.error("JWT Validation Error:", err.message);
    return res
      .status(401)
      .json({ error: "Unauthorized: JWT token is invalid" });
  }
};

const getUserDetails = async (req, res) => {
  const { userEmail } = req.params;
  console.log(userEmail);

  try {
    const user = await User.findOne({ email: userEmail });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { firstname, lastname, email } = user;

    res.json({
      firstname,
      lastname,
      email,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { register };
export { homepage };
export { login };
export { logout };
export { validate };
export { getUserDetails };
