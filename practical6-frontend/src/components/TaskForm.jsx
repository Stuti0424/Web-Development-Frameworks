import { useState } from "react";

function TaskForm({ onTaskCreated }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (!title.trim()) {
            setError("Task title is required");
            return;
        }

        setLoading(true);

        try {
            await onTaskCreated({
                title: title,
                description: description
            });

            setTitle("");
            setDescription("");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <h2>Create New Task</h2>

            <input
                type="text"
                placeholder="Enter task title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
            />

            <textarea
                placeholder="Enter task description"
                value={description}
                onChange={(event) =>
                    setDescription(event.target.value)
                }
            ></textarea>

            <button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Add Task"}
            </button>

            {error && <p className="error">{error}</p>}
        </form>
    );
}

export default TaskForm;