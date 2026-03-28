import React, { useState, useEffect } from 'react';
import { fetchFromApi } from '../api';

// API Endpoint: https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/users/

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        console.log('Users component: Fetching users from API');
        const data = await fetchFromApi('users');
        console.log('Users component: Successfully fetched users', data);
        setUsers(data);
        setError(null);
      } catch (err) {
        console.error('Users component: Error fetching users', err);
        setError(err.message);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Error loading users: {error}
      </div>
    );
  }

  return (
    <div className="py-4">
      <h1 className="section-title mb-4">👥 Users</h1>
      {users && users.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th className="fw-600">ID</th>
                <th className="fw-600">Username</th>
                <th className="fw-600">First Name</th>
                <th className="fw-600">Last Name</th>
                <th className="fw-600">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td><span className="badge bg-primary">{user.id}</span></td>
                  <td className="fw-500">{user.username || 'N/A'}</td>
                  <td>{user.first_name || 'N/A'}</td>
                  <td>{user.last_name || 'N/A'}</td>
                  <td><a href={`mailto:${user.email}`} className="link-primary text-decoration-none">{user.email || 'N/A'}</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-info alert-dismissible fade show" role="alert">
          <strong>ℹ️ Info:</strong> No users found.
        </div>
      )}
    </div>
  );
};

export default Users;
