function TaskList({
    tasks,
    loading,
    onUpdate,
    onDelete
}) {

    if (loading) {

        return (
            <div className="loading">
                Loading tasks...
            </div>
        );

    }


    if (tasks.length === 0) {

        return (
            <div className="empty">
                No tasks available.
            </div>
        );

    }


    return (

        <div className="task-list">

            {tasks.map((task) => (

                <div
                    className="task-card"
                    key={task._id}
                >

                    <div className="task-info">

                        <h3>
                            {task.title}
                        </h3>


                        <p>
                            {task.description}
                        </p>


                        <span>

                            Status:

                            {" "}

                            <strong>

                                {task.completed
                                    ? "Completed"
                                    : "Pending"
                                }

                            </strong>

                        </span>

                    </div>


                    <div className="task-actions">

                        <button
                            onClick={() =>
                                onUpdate(task)
                            }
                        >

                            {task.completed
                                ? "Mark Pending"
                                : "Complete"
                            }

                        </button>


                        <button
                            onClick={() =>
                                onDelete(task._id)
                            }
                        >

                            Delete

                        </button>

                    </div>

                </div>

            ))}

        </div>

    );

}

export default TaskList;