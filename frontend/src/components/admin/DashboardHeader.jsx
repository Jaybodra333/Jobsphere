import React from 'react';

const DashboardHeader = ({ onCreateJob }) => {
  return (
    <div className="panel-header">
      <div>
        <h2>Job Postings</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
          Manage openings and review applicants
        </p>
      </div>
      <button className="btn btn-primary" onClick={onCreateJob}>
        <span>➕</span>
        <span>New Job</span>
      </button>
    </div>
  );
};

export default DashboardHeader;

