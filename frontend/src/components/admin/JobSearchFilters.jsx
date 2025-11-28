import React from 'react';

const JobSearchFilters = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
  onClearFilters,
}) => {
  const hasActiveFilters = searchQuery !== '' || statusFilter !== 'all' || typeFilter !== 'all';

  return (
    <div className="admin-search-section">
      <div className="admin-search-row">
        <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search jobs by title, location, or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        {searchQuery && (
          <button
            className="clear-search"
            onClick={() => setSearchQuery('')}
            title="Clear search"
          >
            ✕
          </button>
        )}
        </div>

        <div className="filter-group">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Status</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
          <option value="draft">Draft</option>
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Types</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="contract">Contract</option>
          <option value="internship">Internship</option>
          <option value="temporary">Temporary</option>
        </select>

        {hasActiveFilters && (
          <button className="btn btn-secondary" onClick={onClearFilters}>
            <span>🔄</span>
            <span>Clear Filters</span>
          </button>
        )}
        </div>
      </div>

      {hasActiveFilters && (
        <div className="filter-badges">
          {searchQuery && (
            <span className="filter-badge">
              Search: "{searchQuery}"
              <button onClick={() => setSearchQuery('')}>×</button>
            </span>
          )}
          {statusFilter !== 'all' && (
            <span className="filter-badge">
              Status: {statusFilter}
              <button onClick={() => setStatusFilter('all')}>×</button>
            </span>
          )}
          {typeFilter !== 'all' && (
            <span className="filter-badge">
              Type: {typeFilter}
              <button onClick={() => setTypeFilter('all')}>×</button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default JobSearchFilters;

