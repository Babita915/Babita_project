const fileDb = require('../lib/fileDb');

const collection = 'books';

const create = async (payload) => fileDb.create(collection, payload);
const find = async (query = {}) => fileDb.find(collection, query);
const findById = async (id) => fileDb.findById(collection, id);
const findByIdAndUpdate = async (id, payload) => fileDb.findByIdAndUpdate(collection, id, payload);
const findByIdAndDelete = async (id) => fileDb.findByIdAndDelete(collection, id);

module.exports = { create, find, findById, findByIdAndUpdate, findByIdAndDelete };
