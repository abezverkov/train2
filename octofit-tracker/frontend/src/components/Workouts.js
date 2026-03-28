import React, { useState, useEffect } from 'react';
import { fetchFromApi } from '../api';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        console.log('Workouts component: Fetching workouts from API');
        const data = await fetchFromApi('workouts');
        console.log('Workouts component: Successfully fetched workouts', data);
        setWorkouts(data);
        setError(null);
      } catch (err) {
        console.error('Workouts component: Error fetching workouts', err);
        setError(err.message);
        setWorkouts([]);
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
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
        Error loading workouts: {error}
      </div>
    );
  }

  return (
    <div className="py-4">
      <h1 className="section-title mb-4">💪 Workouts</h1>
      {workouts && workouts.length > 0 ? (
        <div className="row g-4">
          {workouts.map((workout) => (
            <div key={workout.id} className="col-lg-6 col-xl-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-header bg-gradient bg-primary text-white">
                  <h5 className="card-title mb-0 fw-bold">💪 {workout.name || 'N/A'}</h5>
                </div>
                <div className="card-body d-flex flex-column">
                  <p className="card-text text-muted flex-grow-1">{workout.description || 'No description available'}</p>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <small className="text-muted">📊 Suggested for:</small>
                    <span className="badge bg-success">{workout.suggested_for ? workout.suggested_for.length : 0} users</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info alert-dismissible fade show" role="alert">
          <strong>ℹ️ Info:</strong> No workouts found.
        </div>
      )}
    </div>
  );
};

export default Workouts;
