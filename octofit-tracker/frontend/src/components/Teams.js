import React, { useState, useEffect } from 'react';
import { fetchFromApi } from '../api';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        console.log('Teams component: Fetching teams from API');
        const data = await fetchFromApi('teams');
        console.log('Teams component: Successfully fetched teams', data);
        setTeams(data);
        setError(null);
      } catch (err) {
        console.error('Teams component: Error fetching teams', err);
        setError(err.message);
        setTeams([]);
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
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
        Error loading teams: {error}
      </div>
    );
  }

  return (
    <div className="py-4">
      <h1 className="section-title mb-4">🤝 Teams</h1>
      {teams && teams.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th className="fw-600">ID</th>
                <th className="fw-600">Team Name</th>
                <th className="fw-600">Members</th>
                <th className="fw-600">Created At</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.id}>
                  <td><span className="badge bg-primary">{team.id}</span></td>
                  <td className="fw-500">{team.name || 'N/A'}</td>
                  <td><span className="badge bg-info">{team.members ? team.members.length : 0}</span></td>
                  <td><small className="text-muted">{team.created_at ? new Date(team.created_at).toLocaleDateString() : 'N/A'}</small></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-info alert-dismissible fade show" role="alert">
          <strong>ℹ️ Info:</strong> No teams found.
        </div>
      )}
    </div>
  );
};

export default Teams;
