import Task from '../models/TaskModel.js';

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks }) 
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}

const createTask = async (req, res) => {  
  try {
    const task = req.body;
    const taskCreated = await Task.create(task);
    res.status(201).json({ taskCreated });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error })
  }

}

const getTask = async (req, res) => {
  try {
    const taskID = req.params.id;
    const task =  await Task.findOne({ _id: taskID });

    if (!task) {
      return res.status(404).json({ msg: `No task with ID: ${taskID} found` })
    }

    res.status(200).json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error })
  }
}

const updateTask = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error })
  }
}

const deleteTask = async (req, res) => {
  try {
    const taskID = req.params.id;
    const deletedTask = await Task.findOneAndDelete({ _id: taskID });

    if(!deletedTask) {
      return res.status(404).json({ msg: `No task with ID: ${taskID} found` });
    }

    res.status(200).json({ deletedTask });    
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error })
  }

}

export {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
}