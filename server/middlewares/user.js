import { body, validationResult } from "express-validator";

const userRegisterValidator = [
  // Validate firstName
  body("firstname")
    .notEmpty()
    .withMessage("First Name is required")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("First Name can only contain letters (a-z A-Z)"),

  // Validate lastName
  body("lastname")
    .notEmpty()
    .withMessage("Last Name is required")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Last Name can only contain letters (a-z A-Z)"),

  // Validate email
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .matches(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
    .withMessage("Invalid email address"),

  // Validate password
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one digit")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Password must contain at least one special character"),

  // Custom middleware to handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array()[0].msg;
      return res.status(400).json({ error: firstError });
    }
    next();
  },
];

export { userRegisterValidator };
