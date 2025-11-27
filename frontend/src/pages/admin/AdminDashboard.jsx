import { useEffect, useState, useMemo } from 'react';
import api from '../../api/client';
import StatsCards from '../../components/admin/StatsCards';
import DashboardHeader from '../../components/admin/DashboardHeader';
import JobSearchFilters from '../../components/admin/JobSearchFilters';
import JobListTable from '../../components/admin/JobListTable';
import JobFormModal from '../../components/admin/JobFormModal';
import ApplicantsModal from '../../components/admin/ApplicantsModal';

const AdminDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const [saving, setSaving] = useState(false);
  const [applicantsJob, setApplicantsJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [applicantsLoading, setApplicantsLoading] = useState(false);
  
  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const fetchJobs = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get('/jobs/admin');
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

  const handleCreate = () => {
    setCurrentJob(null);
    setShowForm(true);
  };

  const handleEdit = (job) => {
    setCurrentJob(job);
    setShowForm(true);
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm('Delete this job posting?')) return;
    try {
      await api.delete(`/jobs/${jobId}`);
      fetchJobs();
    } catch (err) {
      alert('Unable to delete job');
    }
  };

  const handleSave = async (payload) => {
    setSaving(true);
    try {
      if (currentJob?._id) {
        await api.put(`/jobs/${currentJob._id}`, payload);
      } else {
        await api.post('/jobs', payload);
      }
      setShowForm(false);
      setCurrentJob(null);
      fetchJobs();
    } catch (err) {
      alert(err.response?.data?.message || 'Unable to save job');
    } finally {
      setSaving(false);
    }
  };

  const fetchApplicants = async (job) => {
    setApplicantsJob(job);
    setApplicants([]);
    setApplicantsLoading(true);
    try {
      const { data } = await api.get(`/applications/job/${job._id}`);
      setApplicants(data);
    } catch (err) {
      alert('Unable to load applicants');
    } finally {
      setApplicantsLoading(false);
    }
  };

  // Filter jobs based on search and filters
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = 
        searchQuery === '' ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (job.description && job.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
      const matchesType = typeFilter === 'all' || job.jobType === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [jobs, searchQuery, statusFilter, typeFilter]);

  // Calculate stats
  const stats = useMemo(() => {
    return {
      total: jobs.length,
      open: jobs.filter(j => j.status === 'open').length,
      closed: jobs.filter(j => j.status === 'closed').length,
      draft: jobs.filter(j => j.status === 'draft').length,
    };
  }, [jobs]);

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setTypeFilter('all');
  };

  return (
    <section className="page admin-dashboard">
      <StatsCards stats={stats} />

      <div className="panel">
        <DashboardHeader onCreateJob={handleCreate} />

        <JobSearchFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          onClearFilters={clearFilters}
        />

        {error && <p className="alert error">{error}</p>}

        <JobListTable
          jobs={jobs}
          filteredJobs={filteredJobs}
          loading={loading}
          onViewApplicants={fetchApplicants}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <JobFormModal
        show={showForm}
        currentJob={currentJob}
        onSave={handleSave}
        onCancel={() => {
          setShowForm(false);
          setCurrentJob(null);
        }}
        saving={saving}
      />

      <ApplicantsModal
        show={!!applicantsJob}
        job={applicantsJob}
        applicants={applicants}
        loading={applicantsLoading}
        onClose={() => {
          setApplicantsJob(null);
          setApplicants([]);
        }}
      />
    </section>
  );
};

export default AdminDashboard;

