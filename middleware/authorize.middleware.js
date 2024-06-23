const jwt = require('jsonwebtoken');
const { verifyToken } = require('../services/auth.services');

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];

    // If token cookie is not present, user is not authenticated
    if (!tokenCookieValue) {
      return res.status(401).send('Unauthorized: No token provided');
    }

    try {
      // Verify the token
      const payload = verifyToken(tokenCookieValue);

      // Attach the payload to the request object
      req.user = payload;

      // Proceed to the next middleware
      return next();
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Token verification failed:', error);

      // Respond with an unauthorized status
      return res.status(401).send('Unauthorized: Invalid token');
    }
  };
}

module.exports = {
  checkForAuthenticationCookie
};
