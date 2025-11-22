const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const generateToken = (user) => {
  const payload = { id: user._id, role: user.role };
  return jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
};

const registerService = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) throw Object.assign(new Error('Email already in use'), { status: 400 });
  const user = await User.create({ name, email, password });
  const token = generateToken(user);
  // Do not return password to caller
  const safeUser = Object.assign({}, user);
  if (safeUser.password) delete safeUser.password;
  return { user: safeUser, token };
};

const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw Object.assign(new Error('Invalid credentials'), { status: 401 });
  const match = await user.comparePassword(password);
  if (!match) throw Object.assign(new Error('Invalid credentials'), { status: 401 });
  const safeUser = Object.assign({}, user);
  if (safeUser.password) delete safeUser.password;
  const token = generateToken(user);
  return { user: safeUser, token };
};

module.exports = { registerService, loginService };
