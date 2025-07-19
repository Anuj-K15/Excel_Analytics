import React from 'react';
import LineChartComp from '../components/LineChartComp';
import BarChartComp from '../components/BarChartComp';
import PieChartComp from '../components/PieChartComp';
import DataTable from '../components/DataTable';         // ✅ Correct import
import UploadTable from '../components/UploadTable';     // ✅ Correct import

const Dashboard = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>📊 Dashboard</h1>
      <p>Welcome to the analytics dashboard!</p>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        marginTop: '30px',
      }}>
        {/* Card 1: Line Chart */}
        <div style={{
          flex: '1 1 45%',
          padding: '20px',
          backgroundColor: '#f8f8f8',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}>
          <LineChartComp />
        </div>

        {/* Card 2: Bar Chart */}
        <div style={{
          flex: '1 1 45%',
          padding: '20px',
          backgroundColor: '#f8f8f8',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}>
          <BarChartComp />
        </div>

        {/* Card 3: Pie Chart */}
        <div style={{
          flex: '1 1 100%',
          padding: '20px',
          backgroundColor: '#f8f8f8',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}>
          <PieChartComp />
        </div>

        {/* ✅ Card 4: Data Table */}
        <div style={{
          flex: '1 1 100%',
          padding: '20px',
          backgroundColor: '#f8f8f8',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}>
          <DataTable />
        </div>

        {/* ✅ Card 5: Upload Table */}
        <div style={{
          flex: '1 1 100%',
          padding: '20px',
          backgroundColor: '#f8f8f8',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}>
          <UploadTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
