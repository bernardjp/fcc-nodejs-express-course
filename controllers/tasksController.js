
const getAllTasks = (req, res) => {
  res.send('Getting all tasks');
}

const createTask = (req, res) => {
  const task = req.body;
  console.log('New Task:', task);

  res.send(req.body);
}

const getTask = (req, res) => {
  const taskID = req.params.id;
  res.send(`Getting single task with ID ${taskID}`);
}

const updateTask = (req, res) => {
  const taskID = req.params.id;
  const task = req.body;
  console.log(`Updated task with ID ${taskID}:`, task);

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