const jwt = require('jsonwebtoken');
const secretKey = 'yourSecretKey';  // כאן תשתמש במפתח הסודי שלך

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // מניח שאתה שולח את הטוקן בהדר (Authorization Header)

  if (!token) {
    return res.status(403).json({ message: 'Access Denied' });
  }

  try {
    // מאמת את הטוקן
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;  // שומר את המידע של המשתמש ב-request, כדי שנוכל להשתמש בו אחר כך
    next();  // ממשיך לעיבוד הבא
  } catch (error) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
};

module.exports = authenticateToken;