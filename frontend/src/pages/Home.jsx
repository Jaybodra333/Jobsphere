import { useEffect, useState, useCallback } from 'react';
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
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);

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

  // Debounced search - only trigger if filters have changed from initial state
  useEffect(() => {
    const hasFilters = filters.q || filters.location || filters.jobType;
    if (!hasFilters) {
      // If no filters, fetch all jobs
      fetchJobs();
      return;
    }

    const timer = setTimeout(() => {
      fetchJobs(filters);
    }, 500);

    return () => clearTimeout(timer);
  }, [filters.q, filters.location, filters.jobType]);

  // Update active filters display
  useEffect(() => {
    const active = [];
    if (filters.q) active.push({ key: 'q', label: `Keyword: ${filters.q}`, value: filters.q });
    if (filters.location) active.push({ key: 'location', label: `Location: ${filters.location}`, value: filters.location });
    if (filters.jobType) active.push({ key: 'jobType', label: `Type: ${filters.jobType}`, value: filters.jobType });
    setActiveFilters(active);
  }, [filters]);

  // Scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  const removeFilter = (key) => {
    setFilters((prev) => ({ ...prev, [key]: '' }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Intersection Observer for section animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('.spa-section');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <section className="page" >
      <section className="spa-hero" id="home" >
        <div className="spa-hero-content">
          <p className="spa-hero-kicker">Your Gateway to a Premier Spa Career in India</p>
          <h1 className="spa-hero-title">
            Connecting Thailand&apos;s finest spa talent with India&apos;s luxury wellness retreats.
          </h1>
          <p className="spa-hero-subtitle">
            Paprangkorn Spa Recruitment is your dedicated career partner&mdash;from guaranteed Indian work
            permits to best-in-industry salaries at 5-star hotels and world-class wellness centers.
          </p>
          <div className="spa-hero-actions">
            <a
              href="#openings"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('openings');
                if (element) {
                  const headerOffset = 100;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth',
                  });
                }
              }}
            >
              View Open Positions
            </a>
            <a href="mailto:paprangkornpvtltd@gmail.com" className="btn btn-secondary">
              Email Your CV
            </a>
          </div>
          <div className="spa-hero-pill-row">
            <span className="spa-hero-pill">Guaranteed Work Permit</span>
            <span className="spa-hero-pill">Best-in-Industry Salaries</span>
            <span className="spa-hero-pill">#1 Spa Staff Recruiter for India</span>
          </div>
        </div>
        <div className="spa-hero-highlight">
          <div className="spa-hero-badge">Trusted Career Partner</div>
          <h2>Work where your Thai spa skills are truly valued.</h2>
          <ul>
            <li>Exclusive roles at 5-star hotels and luxury wellness retreats</li>
            <li>End-to-end Indian Work Permit and visa assistance</li>
            <li>Safe, respectful, and enriching work environments</li>
          </ul>
          <p className="spa-hero-note">
            Focus on delivering world-class wellness experiences&mdash;we handle the paperwork, relocation,
            and negotiations for you.
          </p>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="spa-section" id="why-us">
        <div className="spa-section-header">
          <div className="spa-section-top">
            <div className="spa-section-icon">💆‍♀️</div>
            <h2>Why Thousands of Therapists Trust Us</h2>
          </div>
          <p>
            We are more than a recruitment agency&mdash;we are your long-term career partner in India&apos;s
            luxury spa industry.
          </p>
        </div>
        <div className="spa-section-grid spa-section-grid-3">
          <div className="spa-icon-card">
            <div className="spa-card-icon">🏆</div>
            <h3>#1 Spa Staff Recruiter</h3>
            <p>
              As India&apos;s leading specialist for Thai spa professionals, we have an unparalleled track
              record of successful placements at world-class hotels and wellness centers.
            </p>
          </div>
          <div className="spa-icon-card">
            <div className="spa-card-icon">📋</div>
            <h3>Guaranteed Work Permit</h3>
            <p>
              Our immigration team handles every step of your Indian Work Permit and visa documentation, so
              your relocation is smooth, legal, and stress-free.
            </p>
          </div>
          <div className="spa-icon-card">
            <div className="spa-card-icon">💰</div>
            <h3>Best-in-Industry Salaries</h3>
            <p>
              We negotiate on your behalf to secure excellent base pay plus incentives that truly reflect
              your skills, experience, and dedication.
            </p>
          </div>
        </div>
      </section>

      <div className="panel" id="openings">
        <div className="panel-header spa-panel-header">
          <div>
            <h2>Explore Spa Openings</h2>
            <p className="spa-panel-subtitle">
              Search live roles that match your experience&mdash;from Thai Massage Specialists to Spa &amp;
              Wellness Managers.
            </p>
          </div>
        </div>

        <form className="filter-form" onSubmit={handleSubmit}>
          <div>
            <label>
              Keyword
              <input
                name="q"
                value={filters.q}
                onChange={handleChange}
                placeholder="e.g. Thai massage, spa therapist, spa manager"
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
                placeholder="City in India (e.g. Mumbai, Udaipur, Rishikesh)"
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
          {/* Buttons intentionally removed to streamline filtering UI */}
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
        <>
          {activeFilters.length > 0 && (
            <div className="filter-chips">
              <span className="filter-chips-label">Active filters:</span>
              {activeFilters.map((filter) => (
                <span key={filter.key} className="filter-chip">
                  {filter.label}
                  <button
                    type="button"
                    onClick={() => removeFilter(filter.key)}
                    className="filter-chip-remove"
                    aria-label={`Remove ${filter.label}`}
                  >
                    ×
                  </button>
                </span>
              ))}
              <button type="button" onClick={handleClear} className="filter-chip-clear">
                Clear all
              </button>
            </div>
          )}
          <div className="job-grid">
            {jobs.map((job, index) => (
              <JobCard key={job._id} job={job} index={index} />
            ))}
          </div>
        </>
      )}

      {loading && (
        <div className="job-grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="job-card-skeleton">
              <div className="skeleton-header">
                <div className="skeleton-line skeleton-title"></div>
                <div className="skeleton-badge"></div>
              </div>
              <div className="skeleton-line skeleton-location"></div>
              <div className="skeleton-line skeleton-salary"></div>
              <div className="skeleton-line skeleton-description"></div>
              <div className="skeleton-line skeleton-description short"></div>
              <div className="skeleton-button"></div>
            </div>
          ))}
        </div>
      )}

      {/* How to Apply Section */}
      <section className="spa-section" id="how-to-apply">
        <div className="spa-section-header">
          <div className="spa-section-icon">✨</div>
          <h2>How to Apply – Your Journey Starts Here</h2>
          <p>Follow our simple three-step process to move closer to your dream spa job in India.</p>
        </div>
        <div className="spa-steps">
          <div className="spa-step">
            <div className="spa-step-number">1</div>
            <div className="spa-step-body">
              <h3>Explore Openings</h3>
              <p>
                Browse our live spa jobs above and choose the role that best matches your skills and
                aspirations&mdash;from Senior Spa Therapist to Spa &amp; Wellness Manager.
              </p>
            </div>
          </div>
          <div className="spa-step">
            <div className="spa-step-number">2</div>
            <div className="spa-step-body">
              <h3>Prepare Your CV</h3>
              <p>
                Update your CV to highlight your experience, certifications, languages, and any special
                techniques such as traditional Thai massage, aromatherapy, or body wraps.
              </p>
            </div>
          </div>
          <div className="spa-step">
            <div className="spa-step-number">3</div>
            <div className="spa-step-body">
              <h3>Email Us</h3>
              <p>
                Send your CV directly to{' '}
                <a href="mailto:paprangkornpvtltd@gmail.com">paprangkornpvtltd@gmail.com</a> and mention the
                job title you are applying for. Our team will review your profile and contact you with the
                next steps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / CTA Section */}
      <section className="spa-section spa-section-cta">
        <div className="spa-section-header">
          <h2>Ready to Begin Your Spa Career in India?</h2>
          <p>
            Whether you are a seasoned therapist or an experienced spa manager, Paprangkorn Spa Recruitment
            is here to guide every step of your journey.
          </p>
        </div>
        <div className="spa-cta-actions">
          <a href="#openings" className="btn btn-primary">
            View Open Positions
          </a>
          <a href="mailto:paprangkornpvtltd@gmail.com" className="btn btn-secondary">
            Send Your CV
          </a>
        </div>
      </section>

      {/* About Us Section */}
      <section className="spa-section spa-section-about" id="about">
        <div className="spa-section-header">
          <div className="spa-section-icon">🌿</div>
          <h2>About Paprangkorn Spa Recruitment</h2>
          <p>
            Paprangkorn Pvt Ltd was founded with a single vision: to connect talented Thai spa professionals
            with India&apos;s rapidly growing luxury wellness market.
          </p>
        </div>
        
        <div className="spa-about-content">
          <div className="spa-about-main">
            <div className="spa-about-text">
              <p>
                We deeply understand the unique skills, dedication, and cultural richness Thai therapists bring
                to every treatment. That&apos;s why we work only with carefully vetted 5-star hotels and
                premium wellness retreats&mdash;so your next job is not just about salary, but also safety,
                respect, and growth.
              </p>
              <p>
                From iconic city hotels in Mumbai to serene retreats in Rishikesh and heritage palaces in
                Udaipur, our partners trust us to bring them the very best spa talent from Thailand.
              </p>
            </div>
          </div>
          
          <div className="spa-commitment-card">
            <div className="spa-commitment-header">
              <span className="spa-commitment-icon">✨</span>
              <h3>Your Career, Our Commitment</h3>
            </div>
            <ul className="spa-feature-list">
              <li>
                <span className="spa-feature-icon">🧘‍♀️</span>
                <span>Specialized only in spa and wellness roles</span>
              </li>
              <li>
                <span className="spa-feature-icon">🤝</span>
                <span>Personal guidance before, during, and after relocation</span>
              </li>
              <li>
                <span className="spa-feature-icon">💎</span>
                <span>Transparent process and honest communication</span>
              </li>
              <li>
                <span className="spa-feature-icon">🌏</span>
                <span>Support in adapting to work culture and life in India</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          className="scroll-to-top"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <span>↑</span>
        </button>
      )}
    </section>
  );
};

export default Home;

