const userService = require('../services/user.service');

const list = async (req, res) => {
  const users = await userService.getUsers();
  res.json(users);
};

const get = async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};
const create = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user); // 201 Created
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const update = async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  res.json(user);
};


const remove = async (req, res) => {
  await userService.deleteUser(req.params.id);
  res.status(204).send();
};

module.exports = { list, get, create,update, remove };
