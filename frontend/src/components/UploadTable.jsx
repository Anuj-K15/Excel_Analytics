import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

const UploadTable = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [xKey, setXKey] = useState('');
  const [yKey, setYKey] = useState('');
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const savedCSV = localStorage.getItem('csvData');
    if (savedCSV) {
      Papa.parse(savedCSV, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const parsedData = results.data;
          if (parsedData.length > 0) {
            setData(parsedData);
            setHeaders(Object.keys(parsedData[0]));
          }
        }
      });
    }
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (fileExtension !== 'csv') {
      setError('Please upload a valid .csv file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileText = e.target.result;
      localStorage.setItem('csvData', fileText);
    };
    reader.readAsText(file);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedData = results.data;
        if (parsedData.length === 0 || Object.keys(parsedData[0]).length < 2) {
          setError('CSV must contain at least 2 columns with data.');
          return;
        }
        setError('');
        setData(parsedData);
        setHeaders(Object.keys(parsedData[0]));
        setXKey('');
        setYKey('');
      },
      error: (err) => {
        setError(`Failed to parse CSV: ${err.message}`);
      }
    });
  };

  const handleSort = (header) => {
    const direction = header === sortColumn && sortDirection === 'asc' ? 'desc' : 'asc';
    const sorted = [...data].sort((a, b) => {
      const aVal = a[header];
      const bVal = b[header];
      return direction === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    });
    setSortColumn(header);
    setSortDirection(direction);
    setData(sorted);
  };

  const exportCSV = () => {
    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'filtered_data.csv';
    link.click();
  };

  const filteredData = data.filter((row) =>
    headers.some((header) =>
      String(row[header]).toLowerCase().includes(search.toLowerCase())
    )
  );

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const isDark = theme === 'dark';

  return (
    <div style={{
      marginTop: '40px',
      backgroundColor: isDark ? '#1e1e2f' : '#fff',
      color: isDark ? '#eee' : '#333',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: isDark ? '0 0 10px rgba(255,255,255,0.1)' : '0 0 10px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>📄 Upload CSV to View Table + Chart</h3>
        <button onClick={toggleTheme} style={{ padding: '6px 12px', borderRadius: '6px', backgroundColor: isDark ? '#444' : '#ddd', color: isDark ? '#fff' : '#000', border: 'none', cursor: 'pointer' }}>
          {isDark ? '☀ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <input type="file" accept=".csv" onChange={handleFileUpload} style={{ marginBottom: '20px' }} />

      {error && <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}

      {headers.length > 0 && !error && (
        <div style={{
          marginBottom: '20px',
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <label style={{ display: 'flex', flexDirection: 'column' }}>
            📈 X-axis:
            <select value={xKey} onChange={(e) => setXKey(e.target.value)} style={{ padding: '6px', borderRadius: '4px', backgroundColor: '#e0d7ff', border: '1px solid #8884d8' }}>
              <option value="">Select</option>
              {headers.map((header) => (
                <option key={header} value={header}>{header}</option>
              ))}
            </select>
          </label>

          <label style={{ display: 'flex', flexDirection: 'column' }}>
            📉 Y-axis:
            <select value={yKey} onChange={(e) => setYKey(e.target.value)} style={{ padding: '6px', borderRadius: '4px', backgroundColor: '#e0d7ff', border: '1px solid #8884d8' }}>
              <option value="">Select</option>
              {headers.map((header) => (
                <option key={header} value={header}>{header}</option>
              ))}
            </select>
          </label>

          <label style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
            🔍 Search:
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: '8px', border: '1px solid #8884d8', borderRadius: '6px', marginTop: '4px', fontSize: '14px', backgroundColor: '#fafaff' }}
              placeholder="Search any value..."
            />
          </label>

          <button onClick={exportCSV} style={{ padding: '8px 16px', backgroundColor: '#6c63ff', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', marginTop: '24px' }}>
            ⬇ Export CSV
          </button>
        </div>
      )}

      {xKey && yKey && !error && (
        <div style={{ height: '300px', marginBottom: '30px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xKey} stroke={isDark ? '#fff' : '#000'} />
              <YAxis stroke={isDark ? '#fff' : '#000'} />
              <Tooltip />
              <Line type="monotone" dataKey={yKey} stroke="#6c63ff" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {filteredData.length > 0 && !error && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
            <thead>
              <tr style={{ backgroundColor: '#d7cbff', color: '#222' }}>
                {headers.map((header) => (
                  <th
                    key={header}
                    onClick={() => handleSort(header)}
                    style={{ border: '1px solid #ccc', padding: '10px', cursor: 'pointer' }}
                  >
                    {header} {sortColumn === header ? (sortDirection === 'asc' ? '🔼' : '🔽') : ''}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, i) => (
                <tr key={i} style={{ backgroundColor: i % 2 === 0 ? (isDark ? '#2e2e3e' : '#f6f4ff') : (isDark ? '#3a3a4a' : '#fff') }}>
                  {headers.map((header) => (
                    <td key={header} style={{ border: '1px solid #ccc', padding: '8px', color: isDark ? '#ddd' : '#000' }}>{row[header]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UploadTable;
