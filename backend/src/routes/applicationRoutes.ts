import { Router } from 'express';
import {
  getApplicationsByJob,
  submitApplication,
} from '../controllers/applicationController';
import { authenticate, authorizeAdmin } from '../middleware/auth';

const router = Router();

router.post('/', submitApplication);
router.get('/job/:jobId', authenticate, authorizeAdmin, getApplicationsByJob);

export default router;

