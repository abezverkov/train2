import React, { useState, useEffect } from 'react';
import { fetchFromApi } from '../api';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        console.log('Leaderboard component: Fetching leaderboard data from API');
        const data = await fetchFromApi('leaderboard');
        console.log('Leaderboard component: Successfully fetched leaderboard', data);
        // Sort by rank
        const sortedData = Array.isArray(data) ? data.sort((a, b) => a.rank - b.rank) : [];
        setLeaderboard(sortedData);
        setError(null);
      } catch (err) {
        console.error('Leaderboard component: Error fetching leaderboard', err);
        setError(err.message);
        setLeaderboard([]);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
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
        Error loading leaderboard: {error}
      </div>
    );
  }

  return (
    <div className="py-4">
      <h1 className="section-title mb-4">🏆 Leaderboard</h1>
      {leaderboard && leaderboard.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th className="fw-600">Rank</th>
                <th className="fw-600">User ID</th>
                <th className="fw-600">Score</th>
                <th className="fw-600">Team ID</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry.id} className={entry.rank === 1 ? 'table-warning' : ''}>
                  <td>
                    <span className="fs-5 fw-bold">
                      {entry.rank === 1 && '🥇 1st'}
                      {entry.rank === 2 && '🥈 2nd'}
                      {entry.rank === 3 && '🥉 3rd'}
                      {entry.rank > 3 && `#${entry.rank}`}
                    </span>
                  </td>
                  <td className="fw-500">{entry.user ? entry.user.username : 'N/A'}</td>
                  <td><strong className="fs-5">{entry.score || 0}</strong></td>
                  <td><span className="badge bg-info">{entry.team ? entry.team.name : 'N/A'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-info alert-dismissible fade show" role="alert">
          <strong>ℹ️ Info:</strong> No leaderboard entries found.
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
