const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const connectToMongo = require("./db");
const authRoutes = require("./Routes/auth");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(cors({
  origin: "https://project-beyond.vercel.app",  // Corrected URL without trailing slash
  methods: ["POST", "GET"],
  credentials: true
}));

// Connect to MongoDB
connectToMongo();

// Middleware
app.use(bodyParser.json());
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the backend API!");
});

// Authentication routes
app.use("/api/auth", authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
