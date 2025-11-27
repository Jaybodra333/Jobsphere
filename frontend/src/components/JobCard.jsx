import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  const summary =
    job.description && job.description.length > 140
      ? `${job.description.slice(0, 140)}...`
      : job.description;

  return (
    <article className="job-card">
      <header>
        <h3>{job.title}</h3>
        <span className={`status ${job.status}`}>{job.status}</span>
      </header>
      <p className="job-location">{job.location}</p>
      {job.salaryRange && <p className="job-salary">{job.salaryRange}</p>}
      <p className="job-type">{job.jobType}</p>
      {summary && <p className="job-description">{summary}</p>}
      <div className="job-card-actions">
        <Link to={`/jobs/${job._id}`} className="btn btn-primary">
          <span>View Details</span>
          <span>→</span>
        </Link>
      </div>
    </article>
  );
};

export default JobCard;

