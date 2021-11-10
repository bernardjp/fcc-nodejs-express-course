import Task from '../models/TaskModel.js';
import asyncWrapper from '../middlewares/async-wrapper.js';

// const getAllTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find({});
//     res.status(200).json({ tasks }) 
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error)
//   }
// }

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks }) 
})

const createTask = asyncWrapper(async (req, res) => {  
  const task = req.body;
  const taskCreated = await Task.create(task);
  res.status(201).json({ taskCreated });
})

const getTask = asyncWrapper(async (req, res) => {
  const taskID = req.params.id;
  const task =  await Task.findOne({ _id: taskID });

  if (!task) {
    return res.status(404).json({ msg: `No task with ID: ${taskID} found` })
  }

  res.status(200).json({ task });
})

const updateTask = asyncWrapper(async (req, res) => {
  const taskID = req.params.id;
  const taskData = req.body;

  const task = await Task.findOneAndUpdate({ _id: taskID }, taskData, {
    new: true,
    runValidators: true
  })

  if (!task) {
    return res.status(404).json({ msg: `No task with ID: ${taskID} found` })
  }

  res.status(200).json({ task });
})

const deleteTask = asyncWrapper(async (req, res) => {
  const taskID = req.params.id;
  const deletedTask = await Task.findOneAndDelete({ _id: taskID });

  if(!deletedTask) {
    return res.status(404).json({ msg: `No task with ID: ${taskID} found` });
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