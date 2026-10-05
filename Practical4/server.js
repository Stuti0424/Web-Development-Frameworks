/* PR4*/ const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [];

app.use((req, res, next) => {
    console.log(
        `${new Date().toLocaleString()} | ${req.method} | ${req.url}`
    );
    next();
});

app.get("/tasks", (req, res) => {
    res.status(200).json(tasks);
});

app.post("/tasks", (req, res) => {

    const task = {
        id: Date.now(),
        title: req.body.title,
        completed: false
    };

    tasks.push(task);

    res.status(201).json(task);

});

app.put("/tasks/:id", (req, res, next) => {

    const id = Number(req.params.id);

    const task = tasks.find(t => t.id === id);

    if (!task) {

        const err = new Error("Task Not Found");
        err.status = 404;
        return next(err);

    }

    task.title = req.body.title || task.title;

    if (req.body.completed !== undefined)

        task.completed = req.body.completed;

    res.status(200).json(task);

});

app.delete("/tasks/:id", (req, res, next) => {

    const id = Number(req.params.id);

    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {

        const err = new Error("Task Not Found");
        err.status = 404;
        return next(err);

    }

    tasks.splice(index, 1);

    res.status(200).json({
        message: "Task Deleted"
    });

});

app.use((err, req, res, next) => {

    res.status(err.status || 500).json({

        error: err.message || "Internal Server Error"

    });
});

app.listen(PORT, () => {

    console.log(`Server running at http://localhost:${PORT}`);

});

/* PR5 const express = require("express");
const mongoose = require("mongoose");

const Task = require("./Task");

const app = express();

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/taskdb")
.then(()=>{

    console.log("MongoDB Connected");

})
.catch((err)=>{

    console.log(err);

});


// GET

app.get("/tasks",async(req,res)=>{

    try{

        const tasks=await Task.find();

        res.status(200).json(tasks);

    }

    catch(error){

        res.status(500).json({message:error.message});

    }

});


// POST

app.post("/tasks",async(req,res)=>{

    try{

        const task=new Task(req.body);

        const savedTask=await task.save();

        res.status(201).json(savedTask);

    }

    catch(error){

        res.status(400).json({

            error:error.message

        });

    }

});


// PUT

app.put("/tasks/:id",async(req,res)=>{

    try{

        const updatedTask=await Task.findByIdAndUpdate(

            req.params.id,

            req.body,

            {new:true,runValidators:true}

        );

        if(!updatedTask)

        {

            return res.status(404).json({

                message:"Task Not Found"

            });

        }

        res.json(updatedTask);

    }

    catch(error){

        res.status(400).json({

            error:error.message

        });

    }

});


// DELETE

app.delete("/tasks/:id",async(req,res)=>{

    try{

        const task=await Task.findByIdAndDelete(req.params.id);

        if(!task){

            return res.status(404).json({

                message:"Task Not Found"

            });

        }

        res.json({

            message:"Task Deleted"

        });

    }

    catch(error){

        res.status(500).json({

            error:error.message

        });

    }

});


app.listen(3000,()=>{

    console.log("Server running on Port 3000");
    console.log("\n24DIT020-Stuti Gondha");

});*/