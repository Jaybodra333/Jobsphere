import React from 'react';

const JobRow = ({ job, onViewApplicants, onEdit, onDelete }) => {
  return (
    <div className="table-row">
      <span style={{ fontWeight: '600' }}>{job.title}</span>
      <span className={`status ${job.status}`}>{job.status}</span>
      <span style={{ textTransform: 'capitalize' }}>{job.jobType}</span>
      <span>{job.location}</span>
      <span className="table-actions">
        <button onClick={() => onViewApplicants(job)} className="btn btn-link">
          👥 Applicants
        </button>
        <button onClick={() => onEdit(job)} className="btn btn-link">
          ✏️ Edit
        </button>
        <button onClick={() => onDelete(job._id)} className="btn btn-link danger">
          🗑️ Delete
        </button>
      </span>
    </div>
  );
};

export default JobRow;

