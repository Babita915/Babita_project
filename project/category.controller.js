const Category = require('../models/Category.model');

const create = async (req, res) => {
  const cat = await Category.create(req.body);
  res.status(201).json(cat);
};

const list = async (req, res) => {
  const cats = await Category.find();
  res.json(cats);
};

const remove = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.status(204).send();
};

module.exports = { create, list, remove };
