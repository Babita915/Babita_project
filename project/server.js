const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs-extra');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 8000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

app.use(cors());
app.use(bodyParser.json());

// Paths to JSON assets in the Angular app
const booksPath = path.join(__dirname, '..', 'src', 'assets', 'books.json');
const categoriesPath = path.join(__dirname, '..', 'src', 'assets', 'categories.json');
const usersPath = path.join(__dirname, '..', 'src', 'assets', 'users.json');

// Utility functions
async function readJson(file) {
  try {
    const exists = await fs.pathExists(file);
    if (!exists) {
      return [];
    }
    return await fs.readJson(file);
  } catch (err) {
    console.error('Read JSON error', err);
    return [];
  }
}

async function writeJson(file, data) {
  try {
    await fs.writeJson(file, data, { spaces: 2 });
  } catch (err) {
    console.error('Write JSON error', err);
  }
}

// Simple auth: checks username/password against users.json and returns a JWT
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Missing credentials' });

  const users = await readJson(usersPath);
  const user = users.find(u => (u.username === username || u.email === username) && u.password === password);

  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, username: user.username || user.email }, JWT_SECRET, { expiresIn: '8h' });
  return res.json({ token });
});

// Middleware to protect routes
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Missing Authorization header' });
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ message: 'Invalid Authorization header' });
  const token = parts[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

// BOOKS endpoints (protected)
app.get('/api/books', authMiddleware, async (req, res) => {
  const books = await readJson(booksPath);
  res.json(books);
});

app.get('/api/books/:id', authMiddleware, async (req, res) => {
  const id = Number(req.params.id);
  const books = await readJson(booksPath);
  const book = books.find(b => Number(b.id) === id || b.id === id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
});

app.post('/api/books', authMiddleware, async (req, res) => {
  const books = await readJson(booksPath);
  const payload = req.body;
  // auto id
  const maxId = books.reduce((m, b) => Math.max(m, Number(b.id) || 0), 0);
  const id = maxId + 1;
  const newBook = { id, ...payload };
  books.push(newBook);
  await writeJson(booksPath, books);
  res.status(201).json(newBook);
});

app.put('/api/books/:id', authMiddleware, async (req, res) => {
  const id = Number(req.params.id);
  const books = await readJson(booksPath);
  const idx = books.findIndex(b => Number(b.id) === id || b.id === id);
  if (idx === -1) return res.status(404).json({ message: 'Book not found' });
  books[idx] = { ...books[idx], ...req.body, id };
  await writeJson(booksPath, books);
  res.json(books[idx]);
});

app.delete('/api/books/:id', authMiddleware, async (req, res) => {
  const id = Number(req.params.id);
  let books = await readJson(booksPath);
  const idx = books.findIndex(b => Number(b.id) === id || b.id === id);
  if (idx === -1) return res.status(404).json({ message: 'Book not found' });
  const removed = books.splice(idx, 1)[0];
  await writeJson(booksPath, books);
  res.json(removed);
});

// CATEGORIES (public read)
app.get('/api/categories', async (req, res) => {
  const categories = await readJson(categoriesPath);
  res.json(categories);
});

// USERS (public read)
app.get('/api/users', async (req, res) => {
  const users = await readJson(usersPath);
  // for security send only non-sensitive info
  const safe = users.map(u => ({ id: u.id, name: u.name, email: u.email, username: u.username }));
  res.json(safe);
});

app.listen(PORT, () => {
  console.log(`Mock backend listening on http://localhost:${PORT}`);
});
