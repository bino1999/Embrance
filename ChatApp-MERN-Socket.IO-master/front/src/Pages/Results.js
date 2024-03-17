import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const containerStyle = {
  fontFamily: 'Arial, sans-serif',
  maxWidth: '800px',
  margin: '0 auto',
  backgroundColor: '#f0f0f0',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
  backgroundColor: '#fff',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  overflow: 'hidden',
};

const headingStyle = {
  backgroundColor: '#25d366',
  color: '#fff',
  padding: '15px',
  textAlign: 'left',
  fontSize: '18px',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  borderBottom: '1px solid #ddd',
};

const rowStyle = {
  borderBottom: '1px solid #ddd',
  padding: '15px',
  fontSize: '14px',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
};

const userNameColumnStyle = {
  ...rowStyle,
  marginRight: '20px', // Adjust this value to increase or decrease the margin
};

export default function Results() {
  const [diaryEntries, setDiaryEntries] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    const fetchDiaryEntries = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/diary/entrys/${userId}`);
        setDiaryEntries(response.data);
      } catch (error) {
        console.error('Error fetching diary entries:', error);
      }
    };

    fetchDiaryEntries();
  }, [userId]);

  return (
    <div style={containerStyle}>
      <h2>Diary Entries</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headingStyle}>User Name</th>
            <th style={headingStyle}>Entry</th>
            <th style={headingStyle}>Sentiment</th>
            <th style={headingStyle}>Created At</th>
          </tr>
        </thead>
        <tbody>
          {diaryEntries.map(entry => (
            <tr key={entry._id}>
              <td style={userNameColumnStyle}>{entry.user.name}</td>
              <td style={rowStyle}>{entry.entry}</td>
              <td style={rowStyle}>{entry.sentiment}</td>
              <td style={rowStyle}>{moment(entry.createdAt).format('MMMM D, YYYY, h:mm A')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}