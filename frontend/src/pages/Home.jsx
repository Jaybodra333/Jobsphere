import { useEffect, useState } from 'react';
import api from '../api/client';
import JobCard from '../components/JobCard';

const defaultFilters = {
  q: '',
  location: '',
  jobType: '',
};

const Home = () => {
  const [filters, setFilters] = useState(defaultFilters);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchJobs = async (params = {}) => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get('/jobs', {
        params: {
          status: 'open',
          ...params,
        },
      });
      setJobs(data);
    } catch (err) {
      setError('Unable to load jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchJobs(filters);
  };

  const handleClear = () => {
    setFilters(defaultFilters);
    fetchJobs();
  };

  return (
    <section className="page">
      <div className="panel">
        <form className="filter-form" onSubmit={handleSubmit}>
          <div>
            <label>
              Keyword
              <input
                name="q"
                value={filters.q}
                onChange={handleChange}
                placeholder="e.g. frontend"
              />
            </label>
          </div>
          <div>
            <label>
              Location
              <input
                name="location"
                value={filters.location}
                onChange={handleChange}
                placeholder="City or remote"
              />
            </label>
          </div>
          <div>
            <label>
              Job type
              <select name="jobType" value={filters.jobType} onChange={handleChange}>
                <option value="">Any</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
                <option value="temporary">Temporary</option>
              </select>
            </label>
          </div>
          <div className="filter-actions">
            {/* <label className="filter-actions-label">Actions</label> */}
            <div className="filter-buttons" style={{ justifyContent: 'flex-end' , padding: 22 }  }>
              <button className="btn btn-secondary" type="button" onClick={handleClear}>
                Reset
              </button>
              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <div className="loading-spinner"></div>
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <span>🔍</span>
                    <span>Search</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {error && <p className="alert error">{error}</p>}

      {loading && (
        <div className="loading-text">
          <div className="loading-spinner"></div>
          <span>Loading jobs...</span>
        </div>
      )}

      {!loading && jobs.length === 0 && (
        <div className="empty-state">
          <p>No jobs found. Try adjusting your filters.</p>
        </div>
      )}

      {!loading && jobs.length > 0 && (
        <div className="job-grid">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Home;

