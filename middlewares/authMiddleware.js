const jwt = require('jsonwebtoken');

// middleware to verify the incoming token in header
module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(401);
    }
    req.userId = decoded.userId;
    next();
  });
};
