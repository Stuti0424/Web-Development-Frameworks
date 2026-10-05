const validateTask = (req, res, next) => {

    const { title } = req.body;

    if (
        title === undefined ||
        title === null ||
        typeof title !== "string" ||
        title.trim() === ""
    ) {
        return res.status(400).json({
            message: "Task title is required"
        });
    }

    if (title.trim().length > 100) {
        return res.status(400).json({
            message:
                "Task title must not exceed 100 characters"
        });
    }

    req.body.title = title.trim();

    if (req.body.description !== undefined) {

        if (
            typeof req.body.description !== "string"
        ) {
            return res.status(400).json({
                message:
                    "Description must be a string"
            });
        }

        req.body.description =
            req.body.description.trim();
    }

    next();
};

module.exports = validateTask;