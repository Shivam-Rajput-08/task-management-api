const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  const { title, description, status, dueDate } = req.body;
  const task = new Task({
    title,
    description,
    status,
    dueDate,
    user: req.user._id,
  });

  await task.save();
  res.status(201).json(task);
};

exports.getTasks = async (req, res) => {
  const { status, sortBy, order } = req.query;

  let filter = { user: req.user._id };
  if (status) {
    filter.status = status;
  }

  let sortCriteria = {};
  if (sortBy) {
    sortCriteria[sortBy] = order === "desc" ? -1 : 1;
  } else {
    sortCriteria.dueDate = 1;
  }

  try {
    const tasks = await Task.find(filter).sort(sortCriteria).exec();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server Issue" });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);

  if (!task || task.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: "Task not found" });
  }

  Object.assign(task, req.body);
  await task.save();
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);

  if (!task || task.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: "Task not found" });
  }

  await task.remove();

  res.json({ message: "Task removed" });
};
