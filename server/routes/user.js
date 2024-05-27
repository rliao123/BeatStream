import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

const router = express.Router();

// import controller
import {
  register,
  homepage,
  login,
  logout,
  validate,
  getUserDetails,
} from "../controllers/user.js";

import { userRegisterValidator } from "../middlewares/user.js";

// import middlewares
//import { userRegisterValidator } from "../middlewares/user.js";

// api routes
router.get("/", homepage);

// route for getting credentials from client
router.post("/googleSuccessfulSignIn", (req, res) => {
  console.log(req.body);
  // decode id token and get user info
  const idToken = req.body.credential;
  const decoded = jwt.decode(idToken);
  console.log(decoded);
  // call register sending components from decoded token
  const googleUser = {
    firstname: decoded.given_name,
    lastname: decoded.family_name,
    username: decoded.email,
    email: decoded.email,
    password: "googlepassword",
  };
  // if user already exists, log in
  const user = User.findOne({ email: googleUser.email });
  if (!user) {
    console.log(googleUser);
    const newGoogleUser = new User(googleUser);
    console.log(newGoogleUser);
    newGoogleUser
      .save()
      .then(() => {
        console.log("User saved successfully");
        user = newGoogleUser;
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  }

  if (user) {
    // generate a token with user id and jwt secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // persist the token as 'jwt' in cookie with an expiry date
    res.cookie("jwt", token, { expire: new Date() + 9999, httpOnly: true });

    console.log("User saved successfully: ", token);
    // return the response with user
    const { email } = user;
    return res.json({
      message: "Sign In Successful",
      email,
      jwt: token,
    });
  } else {
    console.log("User was not saved");
    return res.sendStatus(400);
  }
});

router.post("/sign-up", userRegisterValidator, register);
router.post("/sign-in", login);
router.get("/sign-out", logout);
router.post("/validate", validate);
router.get("/:userEmail", getUserDetails);

export default router;
