const fileDb = require('../lib/fileDb');

const collection = 'reviews';

const create = async (payload) => fileDb.create(collection, payload);
const find = async (query = {}) => fileDb.find(collection, query);
const findById = async (id) => fileDb.findById(collection, id);
const findByIdAndDelete = async (id) => fileDb.findByIdAndDelete(collection, id);

module.exports = { create, find, findById, findByIdAndDelete };
