import React from 'react';
import '../styles/SearchResults.css';

function SearchResults({ results, loading }) {
  if (loading) {
    return (
      <div className="results-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="results-container">
        <div className="no-results">No results found. Try adjusting your search criteria.</div>
      </div>
    );
  }

  return (
    <div className="results-container">
      <div className="results-count">Found {results.length} result(s)</div>
      <div className="results-grid">
        {results.map((person) => (
          <div key={person._id} className="result-card">
            <div className="card-header">
              <div className="avatar">👤</div>
              <div className="name-info">
                <h3>{person.firstName} {person.lastName}</h3>
                <p className="location">📍 {person.city}, {person.country}</p>
              </div>
            </div>
            <div className="card-body">
              {person.dateOfBirth && (
                <div className="info-row">
                  <label>Date of Birth:</label>
                  <span>{new Date(person.dateOfBirth).toLocaleDateString()}</span>
                </div>
              )}
              {person.email && (
                <div className="info-row">
                  <label>Email:</label>
                  <span>{person.email}</span>
                </div>
              )}
              {person.phone && (
                <div className="info-row">
                  <label>Phone:</label>
                  <span>{person.phone}</span>
                </div>
              )}
              {person.occupation && (
                <div className="info-row">
                  <label>Occupation:</label>
                  <span>{person.occupation}</span>
                </div>
              )}
              {person.address && (
                <div className="info-row">
                  <label>Address:</label>
                  <span>{person.address}</span>
                </div>
              )}
              {person.bio && (
                <div className="info-row">
                  <label>Bio:</label>
                  <span>{person.bio}</span>
                </div>
              )}
            </div>
            <div className="card-footer">
              {person.isVerified && <span className="verified-badge">✓ Verified</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
