const fileDb = require('../lib/fileDb');

const collection = 'categories';

const create = async (payload) => fileDb.create(collection, payload);
const find = async (query = {}) => fileDb.find(collection, query);
const findByIdAndDelete = async (id) => fileDb.findByIdAndDelete(collection, id);

module.exports = { create, find, findByIdAndDelete };
