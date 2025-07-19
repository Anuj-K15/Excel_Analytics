// src/components/DynamicChart.jsx
import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";

const DynamicChart = ({ csvData }) => {
  // Check if data is valid
  if (!csvData || csvData.length === 0) return null;

  // Example: Create a bar chart for "Name" vs "Status" count
  const statusCounts = {};

  csvData.forEach((row) => {
    const status = row.Status;
    if (status) {
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    }
  });

  const chartData = Object.keys(statusCounts).map((key) => ({
    status: key,
    count: statusCounts[key],
  }));

  return (
    <div>
      <h3>📊 Status Summary (Bar Chart)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="status" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DynamicChart;
