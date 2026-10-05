require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./authRoutes");
const taskRoutes = require("./taskRoutes");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Practical 9 API is running"
    });
});


// Routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);


// Global error handler
app.use((err, req, res, next) => {

    console.error(err);

    res.status(500).json({
        message: "Internal server error"
    });
});


// Database connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {

        console.log("MongoDB connected successfully");

        app.listen(
            process.env.PORT,
            () => {
                console.log(
                    `Server running on port ${process.env.PORT}`
                );
            }
        );
    })
    .catch((error) => {

        console.error(
            "MongoDB connection failed:",
            error.message
        );
    });