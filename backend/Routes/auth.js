const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../Models/User");
const { SendVerificationCode, WelcomeEmail } = require("../Middleware/email");

const router = express.Router();
const JWT_SECRET = "your_jwt_secret_key_here"; // Secure this with environment variables

// Function to simulate a delay before sending the verification code
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Route 1: Register a new user
router.post('/createuser',
  [
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Please type minimum 5 characters or string password').isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req); // Get validation errors

    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success, error: "Sorry, a user with this email already exists." });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
        verificationCode: Math.floor(1000000 + Math.random() * 900000).toString(),
      });

      // Delay verification code sending by 3 seconds
      await delay(3000); // Delay for 3 seconds

      // After delay, send the verification code
      await SendVerificationCode(user.email, user.verificationCode);

      const data = {
        user: { id: user.id },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occurred.");
    }
  });

// Route 2: Login a user
router.post('/login',
  [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ errors: "Please try logging in with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ success, error: "Incorrect credentials" });
      }

      // If the user is not verified, issue a new verification code
      if (!user.isVerified) {
        user.verificationCode = Math.floor(1000000 + Math.random() * 900000).toString();
        await user.save();
        
        // Delay verification code sending by 3 seconds
        await delay(3000); // Delay for 3 seconds

        // Send new code after delay
        await SendVerificationCode(user.email, user.verificationCode);

        return res.status(400).json({
          success: false,
          error: "Your email is not verified. Please check your inbox for the new verification code.",
        });
      }

      const data = {
        user: { id: user.id },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;

      res.json({ success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  });

// Route 3: Verify email with the code
router.post('/verifyemail',
  [
    body('verificationCode', 'Verification code is required').exists(),
  ],
  async (req, res) => {
    const { verificationCode } = req.body;

    try {
      const user = await User.findOne({ verificationCode });

      if (!user) {
        return res.status(400).json({ success: false, message: "Invalid or expired code" });
      }

      // Don't clear the verification code, it can be reused
      user.isVerified = true; // Mark user as verified
      await user.save();

      await WelcomeEmail(user.email, user.name);

      return res.status(200).json({ success: true, message: "Email verified successfully" });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

module.exports = router;
