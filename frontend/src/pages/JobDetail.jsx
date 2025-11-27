import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/client';
import ApplyForm from '../components/ApplyForm';

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await api.get(`/jobs/${id}`);
        setJob(data);
      } catch (err) {
        setError('Job not found');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <section className="page-center">
        <div className="loading-text">
          <div className="loading-spinner"></div>
          <span>Loading job details...</span>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="page-center">
        <div className="panel">
          <p className="alert error">{error}</p>
        </div>
      </section>
    );
  }

  if (!job) return null;

  return (
    <section className="page job-detail">
      <article className="panel">
        <header>
          <h2>{job.title}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
            <p className="job-location">{job.location}</p>
            {job.salaryRange && <p className="job-salary">{job.salaryRange}</p>}
            <p className="job-type">{job.jobType}</p>
          </div>
        </header>
        <div className="job-body" style={{ marginTop: '2rem' }}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Description</h4>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>{job.description}</p>
        </div>
      </article>
      <ApplyForm jobId={job._id} />
    </section>
  );
};

export default JobDetail;

