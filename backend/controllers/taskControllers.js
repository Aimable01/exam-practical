const Task = require("../models/schema");

const addTask = async (req, res) => {
  const taskData = req.body;
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    console.error("An error in creating task: ", error);
    res.status(500).json({ message: "Failed to add task" });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (error) {
    console.error("An error in getting tasks: ", error);
    res.status(404).json({ message: error.message });
  }
};

const getSingleTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.status(200).json(task);
  } catch (error) {
    console.error("An error in getting task: ", error);
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body);

    if (!task) console.log(`Task with id ${id} not found`);

    const updatedTask = await Task.findById(id);
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("An error in updating task: ", error);
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) console.log(`Task with id ${id} not found`);
    res.status(200).json({ message: "task deleted" });
  } catch (error) {
    console.error("An error in deleting task: ", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
};
