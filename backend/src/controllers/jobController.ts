import { Request, Response } from 'express';
import { Job, IJob } from '../models/Job';
import { AuthRequest } from '../middleware/auth';

type JobFilters = Record<string, unknown>;

const buildFilters = (query: Request['query']): JobFilters => {
  const filters: JobFilters = {};
  if (query.q) {
    filters.title = { $regex: query.q as string, $options: 'i' };
  }
  if (query.location) {
    filters.location = { $regex: query.location as string, $options: 'i' };
  }
  if (query.jobType) {
    filters.jobType = query.jobType as string;
  }
  if (query.status) {
    filters.status = query.status as string;
  }
  return filters;
};

export const getPublicJobs = async (req: Request, res: Response) => {
  const filters = buildFilters(req.query);
  filters.status = filters.status || 'open';

  const jobs = await Job.find(filters).sort({ createdAt: -1 });
  res.json(jobs);
};

export const getJobById = async (req: Request, res: Response) => {
  const job = await Job.findById(req.params.id);
  if (!job || job.status === 'closed') {
    return res.status(404).json({ message: 'Job not found' });
  }
  res.json(job);
};

export const getAdminJobs = async (req: Request, res: Response) => {
  const filters = buildFilters(req.query);
  const jobs = await Job.find(filters).sort({ createdAt: -1 });
  res.json(jobs);
};

export const createJob = async (req: AuthRequest, res: Response) => {
  const requiredFields: Array<'title' | 'description' | 'location'> = [
    'title',
    'description',
    'location',
  ];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).json({ message: `${field} is required` });
    }
  }

  const payload = {
    ...req.body,
    createdBy: req.user?.id,
  };

  const job = await Job.create(payload);
  res.status(201).json(job);
};

export const updateJob = async (req: Request, res: Response) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }

  res.json(job);
};

export const deleteJob = async (req: Request, res: Response) => {
  const job = await Job.findByIdAndDelete(req.params.id);

  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }

  res.status(204).send();
};

