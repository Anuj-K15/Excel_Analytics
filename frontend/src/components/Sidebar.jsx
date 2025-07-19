import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div style={{ width: "200px", backgroundColor: "#333", color: "white", height: "100vh", padding: "20px" }}>
      <h2>My Dashboard</h2>
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><Link to="/" style={{ color: "white" }}>Dashboard</Link></li>
          <li><Link to="/reports" style={{ color: "white" }}>Reports</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
