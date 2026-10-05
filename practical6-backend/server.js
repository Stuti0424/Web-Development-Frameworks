const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Task = require("./models/Task");

const app = express();

const PORT = 5000;


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());

app.use(express.json());


// ==========================================
// MONGODB CONNECTION
// ==========================================

mongoose
    .connect("mongodb://127.0.0.1:27017/taskdb")
    .then(() => {
        console.log("MongoDB Connected Successfully");
    })
    .catch((error) => {
        console.log("MongoDB Connection Error:");
        console.log(error.message);
    });


// ==========================================
// HOME ROUTE
// ==========================================

app.get("/", (req, res) => {

    res.json({
        message: "Task Management API is running"
    });

});


// ==========================================
// GET ALL TASKS
// ==========================================

app.get("/tasks", async (req, res) => {

    try {

        const tasks = await Task.find()
            .sort({ createdAt: -1 });

        res.status(200).json(tasks);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch tasks",
            error: error.message
        });

    }

});


// ==========================================
// CREATE TASK
// ==========================================

app.post("/tasks", async (req, res) => {

    try {

        const { title, description } = req.body;

        const task = new Task({
            title: title,
            description: description
        });

        const savedTask = await task.save();

        res.status(201).json(savedTask);

    } catch (error) {

        res.status(400).json({
            message: "Failed to create task",
            error: error.message
        });

    }

});


// ==========================================
// UPDATE TASK
// ==========================================

app.put("/tasks/:id", async (req, res) => {

    try {

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedTask) {

            return res.status(404).json({
                message: "Task not found"
            });

        }

        res.status(200).json(updatedTask);

    } catch (error) {

        res.status(400).json({
            message: "Failed to update task",
            error: error.message
        });

    }

});


// ==========================================
// DELETE TASK
// ==========================================

app.delete("/tasks/:id", async (req, res) => {

    try {

        const deletedTask = await Task.findByIdAndDelete(
            req.params.id
        );

        if (!deletedTask) {

            return res.status(404).json({
                message: "Task not found"
            });

        }

        res.status(200).json({
            message: "Task deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to delete task",
            error: error.message
        });

    }

});


// ==========================================
// GLOBAL ERROR HANDLER
// ==========================================

app.use((error, req, res, next) => {

    console.log(error);

    res.status(error.status || 500).json({

        message: error.message || "Internal Server Error"

    });

});


// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});