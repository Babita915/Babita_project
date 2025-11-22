const Joi = require('joi');

const createBook = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  description: Joi.string().allow(''),
  category: Joi.string().optional(),
  copies: Joi.number().integer().min(0).optional(),
});

module.exports = { createBook };
