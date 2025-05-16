import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminEmergencyRequests() {
  const [emergencyRequests, setEmergencyRequests] = useState([]);

  useEffect(() => {
    axios.get('/api/emergency/requests')
      .then(response => {
        setEmergencyRequests(response.data);
      })
      .catch(error => {
        console.error('שגיאה בהבאת הקריאות:', error);
      });
  }, []);

  return (
    <div>
      <h2>קריאות חירום</h2>
      {emergencyRequests.length === 0 ? (
        <p>אין קריאות חירום כרגע.</p>
      ) : (
        <ul>
          {emergencyRequests.map(request => (
            <li key={request.id}>
              <p>{request.title}</p>
              <p>{request.description}</p>
              <p>סטטוס: {request.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
