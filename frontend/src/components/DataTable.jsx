import React from 'react';

const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Pending' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'Inactive' },
  { id: 4, name: 'Emily Davis', email: 'emily@example.com', status: 'Active' },
];

function DataTable() {
  return (
    <div>
      <h3>User List</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id} style={{ textAlign: 'center', borderBottom: '1px solid #ddd' }}>
              <td style={tdStyle}>{user.id}</td>
              <td style={tdStyle}>{user.name}</td>
              <td style={tdStyle}>{user.email}</td>
              <td style={tdStyle}>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  padding: '12px',
  textAlign: 'center',
  fontWeight: 'bold',
  borderBottom: '1px solid #ccc',
};

const tdStyle = {
  padding: '10px',
};

export default DataTable;
