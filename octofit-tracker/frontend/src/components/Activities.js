import React, { useState, useEffect } from 'react';
import { fetchFromApi } from '../api';

// API Endpoint: https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/activities/

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        console.log('Activities component: Fetching activities from API');
        const data = await fetchFromApi('activities');
        console.log('Activities component: Successfully fetched activities', data);
        setActivities(data);
        setError(null);
      } catch (err) {
        console.error('Activities component: Error fetching activities', err);
        setError(err.message);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
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
        Error loading activities: {error}
      </div>
    );
  }

  return (
    <div className="py-4">
      <h1 className="section-title mb-4">🏃 Activities</h1>
      {activities && activities.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th className="fw-600">ID</th>
                <th className="fw-600">User ID</th>
                <th className="fw-600">Type</th>
                <th className="fw-600">Duration</th>
                <th className="fw-600">Calories</th>
                <th className="fw-600">Date</th>
                <th className="fw-600">Team ID</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity.id}>
                  <td><span className="badge bg-info">{activity.id}</span></td>
                  <td className="fw-500">{activity.user ? activity.user.username : 'N/A'}</td>
                  <td><span className="badge bg-success">{activity.type || 'N/A'}</span></td>
                  <td>{activity.duration || 'N/A'} min</td>
                  <td><strong>{activity.calories || 'N/A'}</strong> kcal</td>
                  <td><small className="text-muted">{activity.date ? new Date(activity.date).toLocaleDateString() : 'N/A'}</small></td>
                  <td><span className="badge bg-warning">{activity.team ? activity.team.name : 'N/A'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-info alert-dismissible fade show" role="alert">
          <strong>ℹ️ Info:</strong> No activities found.
        </div>
      )}
    </div>
  );
};

export default Activities;
