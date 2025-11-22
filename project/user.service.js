const User = require('../models/User.model');

const getUsers = async () => User.find();
const getUserById = async (id) => User.findById(id);
const updateUser = async (id, payload) => User.findByIdAndUpdate(id, payload);
const addUser = async (data) => User.create(data);
const deleteUser = async (id) => User.findByIdAndDelete(id);

module.exports = { getUsers, getUserById, updateUser, addUser, deleteUser };


