import { useEffect, useState } from 'react';

const defaultJob = {
  title: '',
  description: '',
  location: '',
  salaryRange: '',
  jobType: 'full-time',
  status: 'open',
};

const JobForm = ({ initialData = defaultJob, onSubmit, onCancel, submitting }) => {
  const [form, setForm] = useState(defaultJob);

  useEffect(() => {
    setForm({ ...defaultJob, ...initialData });
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="panel" onSubmit={handleSubmit}>
      <h3>{initialData?._id ? 'Edit Job' : 'Create Job'}</h3>
      <label>
        Title
        <input name="title" value={form.title} onChange={handleChange} required />
      </label>
      <label>
        Location
        <input name="location" value={form.location} onChange={handleChange} required />
      </label>
      <label>
        Salary Range
        <input
          name="salaryRange"
          value={form.salaryRange}
          onChange={handleChange}
          placeholder="e.g. $70k - $90k"
        />
      </label>
      <label>
        Job Type
        <select name="jobType" value={form.jobType} onChange={handleChange}>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="contract">Contract</option>
          <option value="internship">Internship</option>
          <option value="temporary">Temporary</option>
        </select>
      </label>
      <label>
        Status
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="draft">Draft</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
      </label>
      <label>
        Description
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          required
        />
      </label>
      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? (
            <>
              <div className="loading-spinner"></div>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <span>💾</span>
              <span>Save Job</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default JobForm;

