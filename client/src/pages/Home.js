import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>TheTracer</h1>
          <h2>Global People Search Application</h2>
          <p>Search for people worldwide by name, date of birth, and location</p>
          <div className="cta-buttons">
            <Link to="/search" className="btn btn-primary btn-large">
              Start Searching
            </Link>
            <Link to="/register" className="btn btn-secondary btn-large">
              Create Account
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="icon">🔍</div>
          <h3>Advanced Search</h3>
          <p>Search by name, date of birth, country, city, and occupation</p>
        </div>
        <div className="feature-card">
          <div className="icon">🌍</div>
          <h3>Global Database</h3>
          <p>Access a comprehensive global database of people from around the world</p>
        </div>
        <div className="feature-card">
          <div className="icon">🔐</div>
          <h3>Secure & Private</h3>
          <p>Your data is protected with industry-standard security measures</p>
        </div>
        <div className="feature-card">
          <div className="icon">⚡</div>
          <h3>Fast Results</h3>
          <p>Get instant search results with optimized database queries</p>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Find Someone?</h2>
        <p>Join thousands of users searching our global database</p>
        <Link to="/search" className="btn btn-primary btn-large">
          Search Now
        </Link>
      </section>
    </div>
  );
}

export default Home;
