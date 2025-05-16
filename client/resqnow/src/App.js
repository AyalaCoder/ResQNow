import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import EmergencyForm from './components/EmergencyForm';
import UserManagement from './components/admin/UserManagement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/emergency" element={<EmergencyForm />} />
        <Route path="/admin/UserManagement" element={<UserManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
