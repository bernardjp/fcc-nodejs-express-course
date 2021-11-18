import { getAllJobs, getJob, createJob, updateJob, deleteJob } from '../controllers/jobs.js';
import { Router } from 'express';

const router = Router();

router.route('/').get(getAllJobs).post(createJob);
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob);

export default router;
