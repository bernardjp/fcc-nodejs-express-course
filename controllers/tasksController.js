import Task from '../models/TaskModel.js';
import asyncWrapper from '../middlewares/async-wrapper.js';
import { createCustomAPIError } from '../errors/custom-error.js';

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks }) 
})

const createTask = asyncWrapper(async (req, res) => {  
  const task = req.body;
  const taskCreated = await Task.create(task);
  res.status(201).json({ taskCreated });
})

const getTask = asyncWrapper(async (req, res, next) => {
  const taskID = req.params.id;
  const task =  await Task.findOne({ _id: taskID });

  if (!task) {
    return next(createCustomAPIError(`No resource with ID: ${taskID} found`, 404));
  }

  res.status(200).json({ task });
})

const updateTask = asyncWrapper(async (req, res, next) => {
  const taskID = req.params.id;
  const taskData = req.body;

  const task = await Task.findOneAndUpdate({ _id: taskID }, taskData, {
    new: true,
    runValidators: true
  })

  if (!task) {
    return next(createCustomAPIError(`No resource with ID: ${taskID} found`, 404));
  }

  res.status(200).json({ task });
})

const deleteTask = asyncWrapper(async (req, res, next) => {
  const taskID = req.params.id;
  const deletedTask = await Task.findOneAndDelete({ _id: taskID });

  if(!deletedTask) {
    return next(createCustomAPIError(`No resource with ID: ${taskID} found`, 404));
  }

  res.status(200).json({ deletedTask });    
})

export {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
}