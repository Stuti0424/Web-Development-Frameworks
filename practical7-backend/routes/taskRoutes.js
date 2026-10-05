const express = require("express");

const Task = require("../models/Task");

const authMiddleware =
    require("../middleware/authMiddleware");

const validateTask =
    require("../middleware/validationMiddleware");

const router = express.Router();


// Protect all task routes
router.use(authMiddleware);


// ===============================
// GET ALL TASKS
// ===============================

router.get("/", async (req, res) => {

    try {

        const tasks =
            await Task.find({
                user: req.user.id
            }).sort({
                createdAt: -1
            });

        res.status(200).json(tasks);

    } catch (error) {

        res.status(500).json({
            message:
                "Failed to fetch tasks"
        });
    }
});


// ===============================
// CREATE TASK
// ===============================

router.post(
    "/",
    validateTask,
    async (req, res) => {

        try {

            const task =
                await Task.create({

                    title:
                        req.body.title,

                    description:
                        req.body.description || "",

                    completed:
                        false,

                    user:
                        req.user.id
                });


            res.status(201).json(task);

        } catch (error) {

            res.status(500).json({
                message:
                    "Failed to create task"
            });
        }
    }
);


// ===============================
// UPDATE TASK
// ===============================

router.put(
    "/:id",
    validateTask,
    async (req, res) => {

        try {

            const task =
                await Task.findOneAndUpdate(

                    {
                        _id:
                            req.params.id,

                        user:
                            req.user.id
                    },

                    {
                        title:
                            req.body.title,

                        description:
                            req.body.description,

                        completed:
                            req.body.completed
                    },

                    {
                        new: true,

                        runValidators: true
                    }
                );


            if (!task) {

                return res.status(404).json({
                    message:
                        "Task not found"
                });
            }


            res.status(200).json(task);

        } catch (error) {

            res.status(400).json({
                message:
                    "Failed to update task"
            });
        }
    }
);


// ===============================
// DELETE TASK
// ===============================

router.delete(
    "/:id",
    async (req, res) => {

        try {

            const task =
                await Task.findOneAndDelete({

                    _id:
                        req.params.id,

                    user:
                        req.user.id
                });


            if (!task) {

                return res.status(404).json({
                    message:
                        "Task not found"
                });
            }


            res.status(200).json({
                message:
                    "Task deleted successfully"
            });

        } catch (error) {

            res.status(400).json({
                message:
                    "Failed to delete task"
            });
        }
    }
);


module.exports = router;