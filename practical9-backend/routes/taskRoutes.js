const express = require("express");
const NodeCache = require("node-cache");

const Task = require("../models/Task");

const authMiddleware = require("../middleware/authMiddleware");
const { validateTask } = require("../middleware/validationMiddleware");

const router = express.Router();


// ==========================================
// CACHE CONFIGURATION
// ==========================================

// TTL = 60 seconds
const taskCache = new NodeCache({
    stdTTL: 60,
    checkperiod: 120
});


// Cache statistics
let cacheHits = 0;
let cacheMisses = 0;


// ==========================================
// GET ALL TASKS
// ==========================================

router.get("/", authMiddleware, async (req, res) => {

    try {

        // Allow ?cache=false for performance comparison
        const useCache = req.query.cache !== "false";

        const cacheKey = `tasks_${req.user.id}`;


        // ------------------------------------------
        // CACHE CHECK
        // ------------------------------------------

        if (useCache) {

            const cachedTasks = taskCache.get(cacheKey);

            if (cachedTasks) {

                cacheHits++;

                console.log(
                    `CACHE HIT: ${cacheKey}`
                );

                return res.json({
                    source: "cache",
                    tasks: cachedTasks
                });
            }

            cacheMisses++;

            console.log(
                `CACHE MISS: ${cacheKey}`
            );
        }


        // ------------------------------------------
        // DATABASE QUERY
        // ------------------------------------------

        const startTime = Date.now();

        const tasks = await Task.find({
            user: req.user.id
        })
            .sort({ createdAt: -1 })
            .lean();

        const dbTime = Date.now() - startTime;


        // ------------------------------------------
        // STORE RESULT IN CACHE
        // ------------------------------------------

        if (useCache) {

            taskCache.set(
                cacheKey,
                tasks
            );

            console.log(
                `Stored tasks in cache: ${cacheKey}`
            );
        }


        // ------------------------------------------
        // RESPONSE
        // ------------------------------------------

        res.json({
            source: useCache ? "database" : "database-uncached",
            dbTime: `${dbTime} ms`,
            tasks
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch tasks",
            error: error.message
        });
    }
});


// ==========================================
// GET SINGLE TASK
// ==========================================

router.get("/:id", authMiddleware, async (req, res) => {

    try {

        const cacheKey =
            `task_${req.user.id}_${req.params.id}`;


        // Check cache
        const cachedTask = taskCache.get(cacheKey);

        if (cachedTask) {

            cacheHits++;

            console.log(
                `CACHE HIT: ${cacheKey}`
            );

            return res.json({
                source: "cache",
                task: cachedTask
            });
        }


        cacheMisses++;

        console.log(
            `CACHE MISS: ${cacheKey}`
        );


        // Query database
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user.id
        }).lean();


        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }


        // Store in cache
        taskCache.set(
            cacheKey,
            task
        );


        res.json({
            source: "database",
            task
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch task",
            error: error.message
        });
    }
});


// ==========================================
// CREATE TASK
// ==========================================

router.post(
    "/",
    authMiddleware,
    validateTask,
    async (req, res) => {

        try {

            const task = await Task.create({
                title: req.body.title,
                description: req.body.description || "",
                completed: req.body.completed || false,
                user: req.user.id
            });


            // IMPORTANT:
            // Invalidate all-tasks cache
            const allTasksKey =
                `tasks_${req.user.id}`;

            taskCache.del(allTasksKey);


            res.status(201).json({
                message: "Task created successfully",
                task
            });

        } catch (error) {

            res.status(500).json({
                message: "Failed to create task",
                error: error.message
            });
        }
    }
);


// ==========================================
// UPDATE TASK
// ==========================================

router.put(
    "/:id",
    authMiddleware,
    validateTask,
    async (req, res) => {

        try {

            const task = await Task.findOneAndUpdate(
                {
                    _id: req.params.id,
                    user: req.user.id
                },
                {
                    title: req.body.title,
                    description: req.body.description || "",
                    completed:
                        req.body.completed || false
                },
                {
                    new: true,
                    runValidators: true
                }
            );


            if (!task) {
                return res.status(404).json({
                    message: "Task not found"
                });
            }


            // --------------------------------------
            // INVALIDATE CACHE
            // --------------------------------------

            const allTasksKey =
                `tasks_${req.user.id}`;

            const singleTaskKey =
                `task_${req.user.id}_${req.params.id}`;


            taskCache.del(allTasksKey);
            taskCache.del(singleTaskKey);


            res.json({
                message: "Task updated successfully",
                task
            });

        } catch (error) {

            res.status(500).json({
                message: "Failed to update task",
                error: error.message
            });
        }
    }
);


// ==========================================
// DELETE TASK
// ==========================================

router.delete(
    "/:id",
    authMiddleware,
    async (req, res) => {

        try {

            const task = await Task.findOneAndDelete({
                _id: req.params.id,
                user: req.user.id
            });


            if (!task) {
                return res.status(404).json({
                    message: "Task not found"
                });
            }


            // --------------------------------------
            // INVALIDATE CACHE
            // --------------------------------------

            const allTasksKey =
                `tasks_${req.user.id}`;

            const singleTaskKey =
                `task_${req.user.id}_${req.params.id}`;


            taskCache.del(allTasksKey);
            taskCache.del(singleTaskKey);


            res.json({
                message: "Task deleted successfully"
            });

        } catch (error) {

            res.status(500).json({
                message: "Failed to delete task",
                error: error.message
            });
        }
    }
);


// ==========================================
// CACHE DEBUG ENDPOINT
// ==========================================

router.get(
    "/debug/cache-stats",
    authMiddleware,
    (req, res) => {

        res.json({
            cacheHits,
            cacheMisses,
            totalRequests:
                cacheHits + cacheMisses,
            hitRate:
                cacheHits + cacheMisses === 0
                    ? "0%"
                    :
                    `${(
                        (cacheHits /
                            (cacheHits + cacheMisses)) *
                        100
                    ).toFixed(2)}%`,
            ttl: "60 seconds"
        });
    }
);


// ==========================================
// CLEAR CACHE
// ==========================================

router.delete(
    "/debug/clear-cache",
    authMiddleware,
    (req, res) => {

        taskCache.flushAll();

        cacheHits = 0;
        cacheMisses = 0;

        res.json({
            message: "Cache cleared successfully"
        });
    }
);


module.exports = router;