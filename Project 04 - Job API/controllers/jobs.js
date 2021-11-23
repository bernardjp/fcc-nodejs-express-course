import JobModel from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';

const getAllJobs = async (req, res) => {
  const jobList = await JobModel.find({ createdBy: req.user.userID }).sort('createdAt');
  res.status(StatusCodes.OK).json({ jobs: jobList, count: jobList.length });
}

const getJob= async (req, res) => {
  const { 
    user: { userID },
    params: { id: jobID }
  } = req;

  const job = await JobModel.findOne({ _id: jobID, createdBy: userID });
  if(!job) throw new NotFoundError(`Job with ID: ${jobID} not found`);

  res.status(StatusCodes.OK).json({ job });
}

const createJob= async (req, res) => {
  req.body.createdBy = req.user.userID;
  
  const newJob = await JobModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ job: newJob });
}

const updateJob= async (req, res) => {
  const { 
    user: { userID },
    params: { id: jobID },
    body: { company, position }
  } = req;

  if(!company || !position) throw new BadRequestError('Company and position must be provided');

  const updatedJob = await JobModel.findOneAndUpdate({ _id: jobID, createdBy: userID }, req.body, { new: true, runValidators: true });
  if(!updatedJob) throw new NotFoundError(`Job with ID: ${jobID} not found`);

  res.status(StatusCodes.OK).json({ job: updatedJob });
}

const deleteJob= async (req, res) => {
  const { 
    user: { userID },
    params: { id: jobID }
  } = req;

  const deletedJob = await JobModel.findOneAndDelete({ _id: jobID, createdBy: userID });
  if(!deletedJob) throw new NotFoundError(`Job with ID: ${jobID} not found`);

  res.status(StatusCodes.OK).json({ msg: 'Job deleted' });
}

export {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob
}
