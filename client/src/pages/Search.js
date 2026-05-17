import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiFilter } from 'react-icons/fi';
import SearchResults from '../components/SearchResults';
import '../styles/Search.css';
import api from '../services/api';

function Search() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    country: '',
    city: '',
    occupation: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = async (e, pageNum = 1) => {
    e?.preventDefault();
    setLoading(true);
    setError('');
    setPage(pageNum);

    try {
      const params = {
        ...filters,
        page: pageNum,
        limit: 20,
      };

      const response = showAdvanced
        ? await api.post('/search/advanced', params)
        : await api.get('/search', { params });

      setResults(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError(err.response?.data?.error || 'Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFilters({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      country: '',
      city: '',
      occupation: '',
    });
    setResults([]);
    setPage(1);
  };

  return (
    <div className="search-page">
      <div className="search-container">
        <h1>🔍 Search for People</h1>

        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-grid">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={filters.firstName}
                onChange={handleFilterChange}
                placeholder="Enter first name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={filters.lastName}
                onChange={handleFilterChange}
                placeholder="Enter last name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={filters.dateOfBirth}
                onChange={handleFilterChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={filters.country}
                onChange={handleFilterChange}
                placeholder="Enter country"
              />
            </div>

            {showAdvanced && (
              <>
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={filters.city}
                    onChange={handleFilterChange}
                    placeholder="Enter city"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="occupation">Occupation</label>
                  <input
                    type="text"
                    id="occupation"
                    name="occupation"
                    value={filters.occupation}
                    onChange={handleFilterChange}
                    placeholder="Enter occupation"
                  />
                </div>
              </>
            )}
          </div>

          <div className="button-group">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              <FiSearch /> {loading ? 'Searching...' : 'Search'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleReset}>
              Reset
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <FiFilter /> {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
            </button>
          </div>
        </form>

        {error && <div className="error-message">{error}</div>}

        <SearchResults results={results} loading={loading} />

        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={(e) => handleSearch(e, page - 1)}
              disabled={page === 1}
              className="btn btn-small"
            >
              Previous
            </button>
            <span className="page-info">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={(e) => handleSearch(e, page + 1)}
              disabled={page === totalPages}
              className="btn btn-small"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
