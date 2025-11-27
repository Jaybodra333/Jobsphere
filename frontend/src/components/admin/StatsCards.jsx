import React from 'react';

const StatsCards = ({ stats }) => {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon">📊</div>
        <div className="stat-content">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Jobs</div>
        </div>
      </div>
      <div className="stat-card stat-open">
        <div className="stat-icon">✅</div>
        <div className="stat-content">
          <div className="stat-value">{stats.open}</div>
          <div className="stat-label">Open</div>
        </div>
      </div>
      <div className="stat-card stat-closed">
        <div className="stat-icon">🔒</div>
        <div className="stat-content">
          <div className="stat-value">{stats.closed}</div>
          <div className="stat-label">Closed</div>
        </div>
      </div>
      <div className="stat-card stat-draft">
        <div className="stat-icon">📝</div>
        <div className="stat-content">
          <div className="stat-value">{stats.draft}</div>
          <div className="stat-label">Draft</div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;

