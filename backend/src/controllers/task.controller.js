import Task from "../models/Task.js";

// Create task
export const createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
};

// Get all tasks
export const getTasks = async (req, res) => {
  const tasks = await Task.find()
    .populate("lead", "name")
    .populate("assignedTo", "name")
    .sort({ createdAt: -1 });

  res.json(tasks);
};

// Update task status (ONLY assigned user)
export const updateTaskStatus = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  // AUTHORIZATION CHECK
  if (task.assignedTo.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      message: "You are not allowed to update this task"
    });
  }

  task.status = req.body.status || task.status;
  await task.save();

  res.json(task);
};
