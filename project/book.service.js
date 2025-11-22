// const Book = require('../models/Book.model');

// const createBook = async (payload) => {
//   const book = await Book.create(payload);
//   return book;
// };

// const getBooks = async (query = {}) => {
//   return Book.find(query);
// };

// const getBookById = async (id) => {
//   return Book.findById(id);
// };

// const updateBook = async (id, payload) => {
//   return Book.findByIdAndUpdate(id, payload);
// };

// const deleteBook = async (id) => {
//   return Book.findByIdAndDelete(id);
// };

// module.exports = { createBook, getBooks, getBookById, updateBook, deleteBook };


const { readCollection, writeCollection } = require("../utils/db");
const { findByIdAndUpdate } = require("./json-db");
const { v4: uuid } = require("uuid");

const COLLECTION = "books";

const createBook = async (payload) => {
  const all = await readCollection(COLLECTION);
  const book = { id: uuid(), ...payload, createdAt: new Date().toISOString() };
  all.push(book);
  await writeCollection(COLLECTION, all);
  return book;
};

const getBooks = async () => {
  return readCollection(COLLECTION);
};

const getBookById = async (id) => {
  const all = await readCollection(COLLECTION);
  return all.find((b) => String(b.id) === String(id));
};

const updateBook = async (id, payload) => {
  return await findByIdAndUpdate(COLLECTION, id, payload);
};

const deleteBook = async (id) => {
  const all = await readCollection(COLLECTION);
  const filtered = all.filter((b) => String(b.id) !== String(id));
  await writeCollection(COLLECTION, filtered);
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
};
