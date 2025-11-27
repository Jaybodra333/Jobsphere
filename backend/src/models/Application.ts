import { Schema, model, Document, Types } from 'mongoose';

export interface IApplication extends Document {
  job: Types.ObjectId;
  name: string;
  email: string;
  resumeUrl: string;
  coverLetter?: string;
  createdAt: Date;
}

const applicationSchema = new Schema<IApplication>(
  {
    job: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    resumeUrl: { type: String, required: true },
    coverLetter: { type: String },
  },
  { timestamps: true },
);

export const Application = model<IApplication>('Application', applicationSchema);

