import React from 'react';

const ApplicantsPanel = ({ job, applicants, loading, onClose }) => {
  return (
    <div className="panel applicants-panel">
      <div className="panel-header">
        <div>
          <h3>Applicants for {job.title}</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            📍 {job.location} • {applicants.length} {applicants.length === 1 ? 'applicant' : 'applicants'}
          </p>
        </div>
        <button className="btn btn-secondary" onClick={onClose} type="button">
          <span>✕</span>
          <span>Close</span>
        </button>
      </div>
      {loading ? (
        <div className="loading-text">
          <div className="loading-spinner"></div>
          <span>Loading applicants...</span>
        </div>
      ) : applicants.length === 0 ? (
        <div className="empty-state">
          <p>No applicants yet.</p>
        </div>
      ) : (
        <ul className="applicant-list">
          {applicants.map((app) => (
            <li key={app._id}>
              <div style={{ marginBottom: '0.75rem' }}>
                <strong>{app.name}</strong> • <span style={{ color: 'var(--text-secondary)' }}>{app.email}</span>
              </div>
              <div style={{ marginBottom: '0.75rem' }}>
                <a href={app.resumeUrl} target="_blank" rel="noreferrer">
                  📄 View resume →
                </a>
              </div>
              {app.coverLetter && (
                <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border)' }}>
                  <strong style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Cover Letter:</strong>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{app.coverLetter}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ApplicantsPanel;

