import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    setRole(userRole);
  }, []);

  const goToUsers = () => {
    navigate('/admin/users');
  };

  const goToEmergencyRequests = () => {
    if (role === 'admin') {
      navigate('/admin/emergency-requests');
    } else {
      navigate('/volunteer/emergency-requests');
    }
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  const logout = () => {
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <h1>ברוך הבא, {role === 'admin' ? 'מנהל' : 'מתנדב'}</h1>
      <button onClick={goToProfile}>הפרופיל שלי</button>
      {role === 'admin' && (
        <>
          <button onClick={goToUsers}>צפה במשתמשים</button>
          <button onClick={goToEmergencyRequests}>צפה בקריאות חירום</button>
        </>
      )}
      {role === 'volunteer' && (
        <>
          <button onClick={goToEmergencyRequests}>צפה בקריאות חירום</button>
          <button onClick={() => navigate('/volunteer/history')}>צפה בהיסטוריית הקריאות שלי</button>
        </>
      )}
      <button onClick={logout}>התנתק</button>
    </div>
  );
}
