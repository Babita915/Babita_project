const bookService = require('../services/book.service');
const { createBook } = require('../validation/book.validation');

const validate = (schema, obj) => {
  const { error } = schema.validate(obj);
  if (error) throw Object.assign(new Error(error.details[0].message), { status: 400 });
};

const create = async (req, res) => {
  validate(createBook, req.body);
  const payload = Object.assign({}, req.body, { createdBy: req.user && req.user.id });
  const book = await bookService.createBook(payload);
  res.status(201).json(book);
};

const list = async (req, res) => {
  const books = await bookService.getBooks();
  res.json(books);
};

const get = async (req, res) => {
  const book = await bookService.getBookById(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
};

const update = async (req, res) => {
  const book = await bookService.updateBook(req.params.id, req.body);
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
};


const remove = async (req, res) => {
  await bookService.deleteBook(req.params.id);
  res.status(204).send();
};

module.exports = { create, list, get, update, remove };

