import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  try {
    console.log('=== AUTH MIDDLEWARE DEBUG ===');
    console.log('1. Headers received:', req.headers);
    
    const { token } = req.headers;
    console.log('2. Token extracted:', token);
    console.log('3. Token type:', typeof token);
    console.log('4. Token length:', token?.length);
    
    if (!token) {
      console.log(' No token provided');
      return res.status(401).json({ 
        success: false, 
        message: 'Not Authorized. Please log in again.' 
      });
    }

    console.log('5. JWT_SECRET exists:', !!process.env.JWT_SECRET);
    console.log('6. JWT_SECRET length:', process.env.JWT_SECRET?.length);
    
    if (!process.env.JWT_SECRET) {
      console.error(' JWT_SECRET is not defined');
      return res.status(500).json({ 
        success: false, 
        message: 'Server configuration error' 
      });
    }

    console.log('7. Attempting to verify token...');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('8.  Token verified successfully:', decoded);
    
    req.userId = decoded.id;
    console.log('9.  req.userId set to:', req.userId);
    console.log('=== END AUTH DEBUG ===');

    next();
    
  } catch (error) {
    console.log(' JWT Verification failed:');
    console.log('Error name:', error.name);
    console.log('Error message:', error.message);
    console.log('Full error:', error);
    
    res.status(401).json({ 
      success: false, 
      message: 'Invalid or expired token' 
    });
  }
};

export default authUser;
