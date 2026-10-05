import { useEffect, useState } from "react";

import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Toast from "../components/Toast";

import {
    getTasks,
    createTask,
    updateTask,
    deleteTask
} from "../api";


function Home() {

    const [tasks, setTasks] = useState([]);

    const [loading, setLoading] =
        useState(true);

    const [creating, setCreating] =
        useState(false);

    const [updatingId, setUpdatingId] =
        useState(null);

    const [deletingId, setDeletingId] =
        useState(null);

    const [error, setError] =
        useState("");

    const [toast, setToast] =
        useState("");


    // Fetch tasks
    useEffect(() => {

        const loadTasks = async () => {

            try {

                setLoading(true);
                setError("");

                const data =
                    await getTasks();

                setTasks(data);

            } catch (error) {

                setError(
                    error.message ||
                    "Failed to load tasks"
                );

            } finally {

                setLoading(false);
            }
        };

        loadTasks();

    }, []);


    // Add task
    const handleAddTask =
        async (task) => {

            try {

                setCreating(true);
                setError("");

                const newTask =
                    await createTask(task);

                setTasks((current) => [
                    newTask,
                    ...current
                ]);

                setToast(
                    "Task added successfully!"
                );

                setTimeout(
                    () => setToast(""),
                    2500
                );

            } catch (error) {

                setError(
                    error.message ||
                    "Failed to create task"
                );

            } finally {

                setCreating(false);
            }
        };


    // Toggle task
    const handleToggleTask =
        async (task) => {

            try {

                setUpdatingId(task._id);
                setError("");

                const updatedTask =
                    await updateTask(
                        task._id,
                        {
                            title: task.title,
                            description:
                                task.description,
                            completed:
                                !task.completed
                        }
                    );

                setTasks((current) =>
                    current.map((item) =>
                        item._id === task._id
                            ? updatedTask
                            : item
                    )
                );

                setToast(
                    "Task updated successfully!"
                );

                setTimeout(
                    () => setToast(""),
                    2500
                );

            } catch (error) {

                setError(
                    error.message ||
                    "Failed to update task"
                );

            } finally {

                setUpdatingId(null);
            }
        };


    // Delete task
    const handleDeleteTask =
        async (id) => {

            try {

                setDeletingId(id);
                setError("");

                await deleteTask(id);

                setTasks((current) =>
                    current.filter(
                        (task) =>
                            task._id !== id
                    )
                );

                setToast(
                    "Task deleted successfully!"
                );

                setTimeout(
                    () => setToast(""),
                    2500
                );

            } catch (error) {

                setError(
                    error.message ||
                    "Failed to delete task"
                );

            } finally {

                setDeletingId(null);
            }
        };


    return (
        <main className="page-container">

            <section className="hero-section">

                <div>
                    <p className="eyebrow">
                        TASK MANAGEMENT
                    </p>

                    <h1>
                        Manage your work
                        <span> efficiently.</span>
                    </h1>

                    <p className="hero-description">
                        A React task management
                        application with route-based
                        code splitting and lazy loading.
                    </p>
                </div>

            </section>


            <section className="optimization-card">

                <div>
                    <span className="optimization-icon">
                        ⚡
                    </span>

                    <div>
                        <h2>
                            Performance Optimized
                        </h2>

                        <p>
                            Projects and Contact pages
                            are loaded only when you
                            visit them using React.lazy().
                        </p>
                    </div>
                </div>

            </section>


            <section className="task-section">

                <div className="section-heading">

                    <div>
                        <p className="section-label">
                            YOUR WORKSPACE
                        </p>

                        <h2>
                            Task Management
                        </h2>
                    </div>

                    <div className="task-count">
                        {tasks.length} Tasks
                    </div>

                </div>


                <TaskForm
                    onAddTask={handleAddTask}
                    loading={creating}
                />


                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}


                {loading ? (

                    <div className="loading-page">

                        <div className="spinner"></div>

                        <p>
                            Loading tasks...
                        </p>

                    </div>

                ) : (

                    <TaskList
                        tasks={tasks}
                        onToggleTask={
                            handleToggleTask
                        }
                        onDeleteTask={
                            handleDeleteTask
                        }
                        updatingId={
                            updatingId
                        }
                        deletingId={
                            deletingId
                        }
                    />

                )}

            </section>


            <Toast message={toast} />

        </main>
    );
}

export default Home;