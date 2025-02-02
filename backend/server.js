const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const connectToMongo = require("./db");
const authRoutes = require("./Routes/auth");
const cors = require("cors");

const app = express();

// CORS configuration
app.use(cors({
  origin: "https://deploy-mern-1whq.vercel.app",  
  methods: ["POST", "GET"],                    
  credentials: true                           
}));

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectToMongo();

// Middleware
app.use(bodyParser.json());
app.use(express.json());

// Authentication routes
app.use("/api/auth", authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

