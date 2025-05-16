import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function VolunteerHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get('/api/emergency/history')
      .then(response => {
        setHistory(response.data);
      })
      .catch(error => {
        console.error('שגיאה בהבאת ההיסטוריה:', error);
      });
  }, []);

  return (
    <div>
      <h2>היסטוריית הקריאות שלי</h2>
      {history.length === 0 ? (
        <p>אין היסטוריה כרגע.</p>
      ) : (
        <ul>
          {history.map(item => (
            <li key={item.id}>
              <p>{item.title}</p>
              <p>{item.description}</p>
              <p>סטטוס: {item.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
