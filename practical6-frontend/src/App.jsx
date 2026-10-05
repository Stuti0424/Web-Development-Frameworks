import { useEffect, useState } from "react";

import {
    getTasks,
    createTask,
    updateTask,
    deleteTask
} from "./api";

import TaskForm from "./components/TaskForm";

import TaskList from "./components/TaskList";

import Toast from "./components/Toast";

import "./App.css";


function App() {

    const [tasks, setTasks] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [toast, setToast] = useState({
        message: "",
        type: ""
    });


    // ==========================================
    // TOAST
    // ==========================================

    const showToast = (message, type) => {

        setToast({
            message: message,
            type: type
        });


        setTimeout(() => {

            setToast({
                message: "",
                type: ""
            });

        }, 3000);

    };


    // ==========================================
    // GET TASKS
    // ==========================================

    const loadTasks = async () => {

        setLoading(true);

        setError("");


        try {

            const data = await getTasks();

            setTasks(data);

        } catch (error) {

            setError(error.message);

            showToast(
                "Failed to load tasks",
                "error"
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadTasks();

    }, []);


    // ==========================================
    // CREATE TASK
    // ==========================================

    const handleCreateTask = async (taskData) => {

        // Temporary task for optimistic UI

        const temporaryTask = {

            _id: "temporary-" + Date.now(),

            title: taskData.title,

            description: taskData.description,

            completed: false,

            createdAt: new Date().toISOString()

        };


        // Immediately show task

        setTasks((previousTasks) => [

            temporaryTask,

            ...previousTasks

        ]);


        try {

            // Send task to backend

            const savedTask = await createTask(
                taskData
            );


            // Replace temporary task
            // with MongoDB task

            setTasks((previousTasks) =>

                previousTasks.map((task) =>

                    task._id === temporaryTask._id
                        ? savedTask
                        : task

                )

            );


            showToast(
                "Task created successfully",
                "success"
            );


        } catch (error) {

            // Remove temporary task
            // if server fails

            setTasks((previousTasks) =>

                previousTasks.filter(
                    (task) =>
                        task._id !== temporaryTask._id
                )

            );


            showToast(
                error.message,
                "error"
            );


            throw error;

        }

    };


    // ==========================================
    // UPDATE TASK
    // ==========================================

    const handleUpdateTask = async (task) => {

        try {

            const updatedTask = await updateTask(

                task._id,

                {
                    title: task.title,

                    description: task.description,

                    completed: !task.completed
                }

            );


            setTasks((previousTasks) =>

                previousTasks.map((item) =>

                    item._id === updatedTask._id
                        ? updatedTask
                        : item

                )

            );


            showToast(
                "Task updated successfully",
                "success"
            );


        } catch (error) {

            showToast(
                error.message,
                "error"
            );

        }

    };


    // ==========================================
    // DELETE TASK
    // ==========================================

    const handleDeleteTask = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this task?"
        );


        if (!confirmed) {

            return;

        }


        try {

            await deleteTask(id);


            setTasks((previousTasks) =>

                previousTasks.filter(
                    (task) => task._id !== id
                )

            );


            showToast(
                "Task deleted successfully",
                "success"
            );


        } catch (error) {

            showToast(
                error.message,
                "error"
            );

        }

    };


    return (

        <div className="app">

            <Toast
                message={toast.message}
                type={toast.type}
            />


            <header>

                <h1>
                    Task Management System
                </h1>

                

            </header>


            <main>

                <TaskForm
                    onTaskCreated={handleCreateTask}
                />


                {error && (

                    <div className="error-box">

                        <p>{error}</p>

                        <button
                            onClick={loadTasks}
                        >
                            Retry
                        </button>

                    </div>

                )}


                <section>

                    <h2>
                        All Tasks
                    </h2>


                    <TaskList
                        tasks={tasks}
                        loading={loading}
                        onUpdate={handleUpdateTask}
                        onDelete={handleDeleteTask}
                    />

                </section>

            </main>

        </div>

    );

}

export default App;