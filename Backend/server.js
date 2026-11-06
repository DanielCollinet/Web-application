
// Load environment variables from the .env file
require("dotenv").config();

// Import required packages
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Import authentication routes
const authRoutes = require("./routes/authRoutes");

// Create Express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route to verify that the server is running
app.get("/", (req, res) => {
    res.status(200).send("User Profile Management API is running!");
});

// Register authentication routes
app.use("/api", authRoutes);

// Use the port supplied by Render, or 3000 locally
const PORT = process.env.PORT || 3000;

// Connect to MongoDB and start the server
async function startServer() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected Successfully");

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
}

// Start the application
startServer();
