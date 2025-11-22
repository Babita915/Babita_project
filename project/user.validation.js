const Joi = require('joi');

const updateUser = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  email: Joi.string().email().optional(),
  role: Joi.string().valid('user','admin').optional(),
});

module.exports = { updateUser };
