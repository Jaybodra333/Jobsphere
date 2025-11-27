import React from 'react';
import JobForm from '../JobForm';

const JobFormModal = ({ show, currentJob, onSave, onCancel, saving }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <JobForm
          initialData={currentJob || undefined}
          onSubmit={onSave}
          onCancel={onCancel}
          submitting={saving}
        />
      </div>
    </div>
  );
};

export default JobFormModal;

