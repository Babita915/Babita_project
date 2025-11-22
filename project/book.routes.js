const router = require('express').Router();
const Book = require('../models/book.model');

// CREATE
router.post('/', async (req, res, next) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) { next(err); }
});

// READ ALL
router.get('/', async (req, res, next) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const books = await Book.findById(req.params.id);
    res.json(books);
  } catch (err) { next(err); }
});

// UPDATE
router.put('/:id', async (req, res, next) => {
  try {
const updateBook = (id, payload) => {
  return Book.findByIdAndUpdate(
    id,
    { $set: payload, updatedAt: new Date() },
    { new: true, runValidators: true }
  );
};
     const updated = await updateBook(req.params.id, req.body);
    res.json(updated);
  } catch (err) { next(err); }
});

// DELETE
router.delete('/:id', async (req, res, next) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted' });
  } catch (err) { next(err); }
});

module.exports = router;


