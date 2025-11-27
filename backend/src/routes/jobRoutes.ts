import { Router } from 'express';
import {
  createJob,
  deleteJob,
  getAdminJobs,
  getJobById,
  getPublicJobs,
  updateJob,
} from '../controllers/jobController';
import { authenticate, authorizeAdmin } from '../middleware/auth';

const router = Router();

router.get('/', getPublicJobs);
router.get('/admin', authenticate, authorizeAdmin, getAdminJobs);
router.get('/:id', getJobById);
router.post('/', authenticate, authorizeAdmin, createJob);
router.put('/:id', authenticate, authorizeAdmin, updateJob);
router.delete('/:id', authenticate, authorizeAdmin, deleteJob);

export default router;

