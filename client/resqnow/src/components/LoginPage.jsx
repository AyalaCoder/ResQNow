import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin 
  ? 'http://localhost:4444/auth/login' 
  : 'http://localhost:4444/auth/register';
    const dataToSend = isLogin
      ? { email: formData.email, password: formData.password }
      : { ...formData, role: 'volunteer' };

    try {
      const res = await axios.post(url, dataToSend);
      const { token, role } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      if (role === 'admin') navigate('/admin/UserManagement');
      else navigate('/volunteer/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'שגיאה בתהליך');
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          {isLogin ? 'התחברות' : 'הרשמה'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            {!isLogin && (
              <>
                <TextField
                  label="שם"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="טלפון"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </>
            )}
            <TextField
              label="אימייל"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="סיסמה"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {error && (
              <Typography color="error" align="center">
                {error}
              </Typography>
            )}
            <Button variant="contained" type="submit" fullWidth>
              {isLogin ? 'התחבר' : 'הרשם'}
            </Button>
          </Box>
        </form>
        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            {isLogin ? 'אין לך חשבון?' : 'כבר יש לך חשבון?'}{' '}
            <Link
              component="button"
              variant="body2"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'הרשמה' : 'התחברות'}
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
