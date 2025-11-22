const fileDb = require('../lib/fileDb');
const bcrypt = require('bcryptjs');

const collection = 'users';

const attachHelpers = (user) => {
  if (!user) return user;
  user.comparePassword = (candidate) => bcrypt.compare(candidate, user.password);
  return user;
};


const findOne = async (query) => {
  const user = await fileDb.findOne(collection, query);
  return attachHelpers(user);
};

const find = async (query = {}) => {
  const users = await fileDb.find(collection, query);
  return users.map((u) => {
    const copy = Object.assign({}, u);
    delete copy.password;
    return copy;
  });
};

const findById = async (id) => {
  const user = await fileDb.findById(collection, id);
  if (!user) return null;
  const copy = Object.assign({}, user);
  delete copy.password;
  return copy;
};

const findByIdAndUpdate = async (id, payload) => {
  if (payload.password) {
    payload.password = await bcrypt.hash(payload.password, 10);
  }
  const user = await fileDb.findByIdAndUpdate(collection, id, payload);
  if (!user) return null;
  const copy = Object.assign({}, user);
  delete copy.password;
  return copy;
};

const findByIdAndDelete = async (id) => {
  return fileDb.findByIdAndDelete(collection, id);
};

const create = async (payload) => {
  if (payload.password) {
    payload.password = await bcrypt.hash(payload.password, 10);
  }
  const user = await fileDb.insert(collection, payload); // assuming fileDb.insert inserts a new record
  const copy = Object.assign({}, user);
  delete copy.password;
  return copy;
};

module.exports = { create, findOne, find, findById, findByIdAndUpdate, findByIdAndDelete };
