import { Schema, model, Document, Types } from 'mongoose';

export type JobStatus = 'draft' | 'open' | 'closed';
export type JobType = 'full-time' | 'part-time' | 'contract' | 'internship' | 'temporary';

export interface IJob extends Document {
  title: string;
  description: string;
  location: string;
  salaryRange?: string;
  jobType: JobType;
  status: JobStatus;
  createdBy: Types.ObjectId;
}

const jobSchema = new Schema<IJob>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    salaryRange: { type: String },
    jobType: {
      type: String,
      enum: ['full-time', 'part-time', 'contract', 'internship', 'temporary'],
      default: 'full-time',
    },
    status: {
      type: String,
      enum: ['draft', 'open', 'closed'],
      default: 'open',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

export const Job = model<IJob>('Job', jobSchema);

