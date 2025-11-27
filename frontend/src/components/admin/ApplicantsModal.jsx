import React from 'react';
import ApplicantsPanel from './ApplicantsPanel';

const ApplicantsModal = ({ show, job, applicants, loading, onClose }) => {
  if (!show || !job) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content applicants-modal" onClick={(e) => e.stopPropagation()}>
        <ApplicantsPanel
          job={job}
          applicants={applicants}
          loading={loading}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default ApplicantsModal;

