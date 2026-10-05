const BASE_URL = "http://localhost:5000";


// GET ALL TASKS
export const getTasks = async () => {
    const response = await fetch(
        `${BASE_URL}/tasks`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch tasks");
    }

    return response.json();
};


// CREATE TASK
export const createTask = async (task) => {
    const response = await fetch(
        `${BASE_URL}/tasks`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(task)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error ||
            data.message ||
            "Failed to create task"
        );
    }

    return data;
};


// UPDATE TASK
export const updateTask = async (id, task) => {
    const response = await fetch(
        `${BASE_URL}/tasks/${id}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(task)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error ||
            data.message ||
            "Failed to update task"
        );
    }

    return data;
};


// DELETE TASK
export const deleteTask = async (id) => {
    const response = await fetch(
        `${BASE_URL}/tasks/${id}`,
        {
            method: "DELETE"
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error ||
            data.message ||
            "Failed to delete task"
        );
    }

    return data;
};