const express = require("express");
const {
  addTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskControllers");

const Router = express.Router();

Router.post("/tasks", addTask);
Router.get("/tasks", getAllTasks);
Router.get("/tasks/:id", getSingleTask);
Router.put("/tasks/:id", updateTask);
Router.delete("/tasks/:id", deleteTask);

module.exports = Router;
