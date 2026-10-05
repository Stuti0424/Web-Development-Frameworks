function TaskList({
    tasks,
    onToggleTask,
    onDeleteTask,
    updatingId,
    deletingId
}) {

    if (tasks.length === 0) {

        return (
            <div className="empty-state">
                <h3>No tasks yet</h3>
                <p>
                    Add your first task using the
                    form above.
                </p>
            </div>
        );
    }

    return (
        <div className="task-list">

            {tasks.map((task) => (

                <div
                    className={`task-card ${
                        task.completed
                            ? "completed"
                            : ""
                    }`}
                    key={task._id}
                >

                    <div className="task-content">

                        <h3>{task.title}</h3>

                        <p>
                            {task.description ||
                                "No description"}
                        </p>

                        <span
                            className={
                                task.completed
                                    ? "status completed-status"
                                    : "status pending-status"
                            }
                        >
                            {task.completed
                                ? "Completed"
                                : "Pending"}
                        </span>

                    </div>


                    <div className="task-actions">

                        <button
                            onClick={() =>
                                onToggleTask(task)
                            }
                            disabled={
                                updatingId === task._id
                            }
                        >
                            {updatingId === task._id
                                ? "Updating..."
                                : task.completed
                                    ? "Mark Pending"
                                    : "Complete"}
                        </button>


                        <button
                            className="delete-button"
                            onClick={() =>
                                onDeleteTask(task._id)
                            }
                            disabled={
                                deletingId === task._id
                            }
                        >
                            {deletingId === task._id
                                ? "Deleting..."
                                : "Delete"}
                        </button>

                    </div>

                </div>

            ))}

        </div>
    );
}

export default TaskList;