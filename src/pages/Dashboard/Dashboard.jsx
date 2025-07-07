// src/screens/DashboardScreen.js
import React from 'react';
import { useAuth } from '../../context/AuthContext'; // To display user info

function Dashboard() {
  const { user } = useAuth(); // Access user from context

  return (
    <div>
      <h1>User Dashboard</h1>
      {user ? (
        <>
          <p>Welcome, {user.name}!</p>
          <p>Email: {user.email}</p>
          <p>Admin Status: {user.isAdmin ? 'Yes' : 'No'}</p>
          {/* You can display more user-specific info here */}
        </>
      ) : (
        <p>Please log in to view your dashboard.</p>
      )}
    </div>
  );
}

export default Dashboard;