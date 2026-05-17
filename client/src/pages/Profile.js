import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1>My Profile</h1>
        <div className="profile-card">
          <div className="profile-header">
            <div className="avatar">👤</div>
            <div className="user-info">
              <h2>{user.username}</h2>
              <p>{user.email}</p>
            </div>
          </div>
          <div className="profile-details">
            <div className="detail-item">
              <label>Username</label>
              <p>{user.username}</p>
            </div>
            <div className="detail-item">
              <label>Email</label>
              <p>{user.email}</p>
            </div>
            <div className="detail-item">
              <label>Account Created</label>
              <p>Member since 2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
