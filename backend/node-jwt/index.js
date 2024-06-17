const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const swaggerUI = require("swagger-ui-express"); // Import Swagger UI
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerSpec = require("./swagger.yaml");



const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "My API",
    version: "1.0.0",
    description: "My API Description",
  },
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // Path to the API routes in your Node.js application
};

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use((req,res,next) => {
  res.append("Access-Control-Allow-Origin", "*");
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
})

const authRoute = require("./Routes/auth.route");
const jwtSecret = process.env.JWT_SECRET;

app.use(express.json());
app.use(cors({
  origin: "*"
}));
app.use("/api", authRoute);
// Serve Swagger documentation
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.listen(port, (err) => {
  if (err) {
    process.exit();
  }
  console.log(`Server is running on port ${port}`);
});
