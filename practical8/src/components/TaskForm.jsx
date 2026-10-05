import { useState } from "react";

function TaskForm({ onAddTask, loading }) {

    const [title, setTitle] = useState("");
    const [description, setDescription] =
        useState("");

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!title.trim()) {
            return;
        }

        await onAddTask({
            title: title.trim(),
            description: description.trim()
        });

        setTitle("");
        setDescription("");
    };

    return (
        <form
            className="task-form"
            onSubmit={handleSubmit}
        >

            <input
                type="text"
                placeholder="Enter task title"
                value={title}
                onChange={(event) =>
                    setTitle(event.target.value)
                }
            />

            <textarea
                placeholder="Enter task description"
                value={description}
                onChange={(event) =>
                    setDescription(event.target.value)
                }
            />

            <button
                type="submit"
                disabled={loading}
            >
                {loading
                    ? "Adding..."
                    : "Add Task"}
            </button>

        </form>
    );
}

export default TaskForm;