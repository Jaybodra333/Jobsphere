import { Request, Response } from 'express';
import { Application } from '../models/Application';
import { Job } from '../models/Job';
import { sendEmail } from '../utils/email';
import { env } from '../config/env';

export const submitApplication = async (req: Request, res: Response) => {
  const { jobId, name, email, resumeUrl, coverLetter } = req.body;

  if (!jobId || !name || !email || !resumeUrl) {
    return res
      .status(400)
      .json({ message: 'Job, name, email, and resume are required' });
  }

  const job = await Job.findById(jobId);
  if (!job || job.status !== 'open') {
    return res.status(400).json({ message: 'Job is not accepting applications' });
  }

  const application = await Application.create({
    job: jobId,
    name,
    email,
    resumeUrl,
    coverLetter,
  });

  try {
    await sendEmail({
      to: email,
      subject: `Thanks for applying to ${job.title}`,
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for applying to <strong>${job.title}</strong> at ${job.location}.</p>
        <p>We received your resume (${resumeUrl}) and will follow up soon.</p>
        <p>- JobSphere Team</p>
        <p><a href="${env.clientUrl}">Back to jobs</a></p>
      `,
    });
  } catch (mailError) {
    console.warn('Could not send email', mailError);
  }

  res.status(201).json({
    message: 'Application submitted successfully',
    application,
  });
};

export const getApplicationsByJob = async (req: Request, res: Response) => {
  const jobId = req.params.jobId;

  if (!jobId) {
    return res.status(400).json({ message: 'jobId is required' });
  }

  const applications = await Application.find({ job: jobId }).sort({
    createdAt: -1,
  });

  res.json(applications);
};

