require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes =
    require("./routes/authRoutes");

const taskRoutes =
    require("./routes/taskRoutes");


const app = express();

const PORT =
    process.env.PORT || 5000;


// ===============================
// MIDDLEWARE
// ===============================

app.use(cors());

app.use(express.json());


// ===============================
// HOME ROUTE
// ===============================

app.get("/", (req, res) => {

    res.json({
        message:
            "Practical 7 Authentication API is running"
    });
});


// ===============================
// AUTH ROUTES
// ===============================

app.use(
    "/auth",
    authRoutes
);


// ===============================
// TASK ROUTES
// ===============================

app.use(
    "/tasks",
    taskRoutes
);


// ===============================
// ERROR HANDLER
// ===============================

app.use(
    (error, req, res, next) => {

        console.error(error);

        res.status(
            error.status || 500
        ).json({

            message:
                error.message ||
                "Internal Server Error"
        });
    }
);


// ===============================
// MONGODB CONNECTION
// ===============================

mongoose
    .connect(
        process.env.MONGO_URI
    )

    .then(() => {

        console.log(
            "MongoDB Connected Successfully"
        );


        app.listen(
            PORT,
            () => {

                console.log(
                    `Server running at http://localhost:${PORT}`
                );
            }
        );
    })

    .catch((error) => {

        console.error(
            "MongoDB Connection Failed:"
        );

        console.error(
            error.message
        );
    });