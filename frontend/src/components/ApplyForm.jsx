import { useState } from 'react';
import api from '../api/client';

const defaultForm = {
  name: '',
  email: '',
  resumeUrl: '',
  coverLetter: '',
};

const ApplyForm = ({ jobId }) => {
  const [form, setForm] = useState(defaultForm);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage('');
    setError('');
    try {
      await api.post('/applications', { ...form, jobId });
      setMessage('Application sent! Check your inbox for confirmation.');
      setForm(defaultForm);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to submit application');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="panel" onSubmit={handleSubmit}>
      <h3>Apply for this role</h3>
      <label>
        Full name
        <input name="name" value={form.name} onChange={handleChange} required />
      </label>
      <label>
        Email
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        CV/Resume URL
        <input
          name="resumeUrl"
          value={form.resumeUrl}
          onChange={handleChange}
          placeholder="https://..."
          required
        />
      </label>
      <label>
        Cover letter
        <textarea
          name="coverLetter"
          value={form.coverLetter}
          onChange={handleChange}
          rows={4}
          placeholder="Tell us why you're a great fit"
        />
      </label>
      {message && <p className="alert success">{message}</p>}
      {error && <p className="alert error">{error}</p>}
      <button className="btn btn-primary" type="submit" disabled={submitting}>
        {submitting ? (
          <>
            <div className="loading-spinner"></div>
            <span>Submitting...</span>
          </>
        ) : (
          <>
            <span>🚀</span>
            <span>Submit application</span>
          </>
        )}
      </button>
    </form>
  );
};

export default ApplyForm;

