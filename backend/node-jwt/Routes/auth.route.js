const express = require("express");
const { registerUser, signInUser } = require("../Controllers/auth.controller");
const {
  createEmployee,
  getAllEmployees,
} = require("../Controllers/employee.controller");
const authMiddleware = require("../Middleware/authMiddleware");
const router = express.Router();

// Registration route
router.post("/sign-up", registerUser);

// Signin route
router.post("/sign-in", signInUser);

// register employee
router.post("/employees", authMiddleware, createEmployee);

//Retrieve all employees
router.get("/employees", getAllEmployees);

module.exports = router;
