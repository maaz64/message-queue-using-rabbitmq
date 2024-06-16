const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

// hasing the password and saving the user in database
// we can do this step in userModel file
exports.register = async ({ username, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();
};


//  comparing the hashed password with user input password if its match then generating the token for logged in user
exports.login = async ({ username, password }) => {
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');
  return token;
};
