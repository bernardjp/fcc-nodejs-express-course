
const getAllTasks = (req, res) => {
  res.send('Getting all tasks');
}

const createTask = (req, res) => {
  res.send('Task created');
}

const getTask = (req, res) => {
  const taskID = req.params.id;
  res.send(`Getting single task with ID ${taskID}`);
}

const updateTask = (req, res) => {
  const taskID = req.params.id;
  res.send(`Updating task with ID ${taskID}`);
}

const deleteTask = (req, res) => {
  const taskID = req.params.id;
  res.send(`Deleting task with ID ${taskID}`);
}

export {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
}