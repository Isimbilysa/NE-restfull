const db = require("../models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if the email already exists
    const userExists = await db.User.findOne({
      where: { email },
      attributes: ['id', 'firstName', 'lastName', 'email', 'password', 'updatedAt']
    });
    if (userExists) {
      return res
        .status(400)
        .json({ error: "Email is already associated with an account" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    await db.User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error in registering user:", error); // Log detailed error
    return res.status(500).json({ error: "Error in registering user", details: error.message });
  }}
const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await db.User.findOne({
      where: { email },
    });

    // If user does not exist
    if (!user) {
      return res.status(404).json({ error: "Email not found" });
    }

    // Compare passwords
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res
        .status(401)
        .json({ error: "Incorrect email and password combination" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });

    // Log token signing parameters
    // console.log("JWT Secret:", process.env.JWT_SECRET);
    // console.log("JWT Expiration:", process.env.JWT_EXPIRATION);
    console.log("Token:", token);

    // Send response with user data and token
    return res.status(200).json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      accessToken: token,
    });
  } catch (error) {
    // Log any sign-in error
    console.error("Sign-in error:", error);
    return res.status(500).json({ error: "Sign-in error" });
  }
};

module.exports = { registerUser, signInUser };
