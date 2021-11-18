
const getAllJobs = (req, res) => {
  res.send('Getting all jobs');
}

const getJob= (req, res) => {
  res.send('Getting a single job');
}

const createJob= (req, res) => {
  res.send('Creating a single job');
}

const updateJob= (req, res) => {
  res.send('Updating a single job');
}

const deleteJob= (req, res) => {
  res.send('Deleting a single job');
}

export {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob
}
