import React from 'react';
import JobRow from './JobRow';

const JobListTable = ({ jobs, filteredJobs, loading, onViewApplicants, onEdit, onDelete }) => {
  if (loading) {
    return (
      <div className="loading-text">
        <div className="loading-spinner"></div>
        <span>Loading jobs...</span>
      </div>
    );
  }

  return (
    <>
      <div className="results-info">
        <span>
          Showing <strong>{filteredJobs.length}</strong> of <strong>{jobs.length}</strong> jobs
        </span>
      </div>
      <div className="table">
        <div className="table-row table-head">
          <span>Title</span>
          <span>Status</span>
          <span>Type</span>
          <span>Location</span>
          <span>Actions</span>
        </div>
        {filteredJobs.map((job) => (
          <JobRow
            key={job._id}
            job={job}
            onViewApplicants={onViewApplicants}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
        {filteredJobs.length === 0 && jobs.length > 0 && (
          <div className="empty-state">
            <p>No jobs match your filters. Try adjusting your search criteria.</p>
          </div>
        )}
        {jobs.length === 0 && (
          <div className="empty-state">
            <p>No jobs yet. Create one to get started!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default JobListTable;

