# Library Management API

A simple Node.js + Express library management system with file-based storage.

## Setup

1. Copy `.env.example` to `.env` and configure values:
   ```bash
   cp .env.example .env
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   Or start production server:
   ```bash
   npm start
   ```

The server will listen on `http://localhost:8000` (default) and create a `src/data` folder with JSON files for persistence.

---

## API Endpoints & Payloads

### Authentication

#### Register User
**POST** `/api/auth/register`

Request:
```json
{
  "name": "Alice Reader",
  "email": "alice@example.com",
  "password": "strongpassword123"
}
```

Response (201 Created):
```json
{
  "user": {
    "_id": "k1x3q-abc123",
    "name": "Alice Reader",
    "email": "alice@example.com",
    "role": "user",
    "createdAt": "2025-11-16T10:00:00.000Z",
    "updatedAt": "2025-11-16T10:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Imsx..."
}
```

Curl:
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Reader",
    "email": "alice@example.com",
    "password": "strongpassword123"
  }'
```

---

#### Login User
**POST** `/api/auth/login`

Request:
```json
{
  "email": "alice@example.com",
  "password": "strongpassword123"
}
```

Response (200 OK):
```json
{
  "user": {
    "_id": "k1x3q-abc123",
    "name": "Alice Reader",
    "email": "alice@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Imsx..."
}
```

Curl:
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@example.com",
    "password": "strongpassword123"
  }'
```

---

### Books

#### List All Books
**GET** `/api/books`

Response (200 OK):
```json
[
  {
    "_id": "bkt-01",
    "title": "Practical Node.js",
    "author": "Author Name",
    "description": "A comprehensive guide to Node.js",
    "category": "cat-01",
    "copies": 5,
    "createdBy": "admin-01",
    "createdAt": "2025-11-16T10:05:00.000Z",
    "updatedAt": "2025-11-16T10:05:00.000Z"
  },
  {
    "_id": "bkt-02",
    "title": "JavaScript Essentials",
    "author": "Another Author",
    "description": "Core JavaScript concepts",
    "category": "cat-01",
    "copies": 3,
    "createdBy": "admin-01",
    "createdAt": "2025-11-16T10:06:00.000Z",
    "updatedAt": "2025-11-16T10:06:00.000Z"
  }
]
```

Curl:
```bash
curl http://localhost:8000/api/books
```

---

#### Get Single Book
**GET** `/api/books/:id`

Response (200 OK):
```json
{
  "_id": "bkt-01",
  "title": "Practical Node.js",
  "author": "Author Name",
  "description": "A comprehensive guide to Node.js",
  "category": "cat-01",
  "copies": 5,
  "createdBy": "admin-01",
  "createdAt": "2025-11-16T10:05:00.000Z",
  "updatedAt": "2025-11-16T10:05:00.000Z"
}
```

Curl:
```bash
curl http://localhost:8000/api/books/bkt-01
```

---

#### Create Book (Admin Only)
**POST** `/api/books`

Headers:
- `Authorization: Bearer <admin-token>`

Request:
```json
{
  "title": "Practical Node.js",
  "author": "Author Name",
  "description": "A comprehensive guide to Node.js",
  "category": "cat-01",
  "copies": 5
}
```

Response (201 Created):
```json
{
  "_id": "bkt-01",
  "title": "Practical Node.js",
  "author": "Author Name",
  "description": "A comprehensive guide to Node.js",
  "category": "cat-01",
  "copies": 5,
  "createdBy": "admin-01",
  "createdAt": "2025-11-16T10:05:00.000Z",
  "updatedAt": "2025-11-16T10:05:00.000Z"
}
```

Curl:
```bash
curl -X POST http://localhost:8000/api/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin-token>" \
  -d '{
    "title": "Practical Node.js",
    "author": "Author Name",
    "description": "A comprehensive guide to Node.js",
    "category": "cat-01",
    "copies": 5
  }'
```

---

#### Update Book (Admin Only)
**PUT** `/api/books/:id`

Headers:
- `Authorization: Bearer <admin-token>`

Request:
```json
{
  "copies": 10,
  "description": "Updated description"
}
```

Response (200 OK):
```json
{
  "_id": "bkt-01",
  "title": "Practical Node.js",
  "author": "Author Name",
  "description": "Updated description",
  "category": "cat-01",
  "copies": 10,
  "createdBy": "admin-01",
  "updatedAt": "2025-11-16T10:15:00.000Z"
}
```

Curl:
```bash
curl -X PUT http://localhost:8000/api/books/bkt-01 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin-token>" \
  -d '{
    "copies": 10,
    "description": "Updated description"
  }'
```

---

#### Delete Book (Admin Only)
**DELETE** `/api/books/:id`

Headers:
- `Authorization: Bearer <admin-token>`

Response: (204 No Content)

Curl:
```bash
curl -X DELETE http://localhost:8000/api/books/bkt-01 \
  -H "Authorization: Bearer <admin-token>"
```

---

### Categories

#### List All Categories
**GET** `/api/categories`

Response (200 OK):
```json
[
  {
    "_id": "cat-01",
    "name": "Programming",
    "description": "Books about programming languages and concepts",
    "createdAt": "2025-11-16T10:01:00.000Z",
    "updatedAt": "2025-11-16T10:01:00.000Z"
  },
  {
    "_id": "cat-02",
    "name": "Fiction",
    "description": "Fiction novels and stories",
    "createdAt": "2025-11-16T10:02:00.000Z",
    "updatedAt": "2025-11-16T10:02:00.000Z"
  }
]
```

Curl:
```bash
curl http://localhost:8000/api/categories
```

---

#### Create Category (Admin Only)
**POST** `/api/categories`

Headers:
- `Authorization: Bearer <admin-token>`

Request:
```json
{
  "name": "Programming",
  "description": "Books about programming languages and concepts"
}
```

Response (201 Created):
```json
{
  "_id": "cat-01",
  "name": "Programming",
  "description": "Books about programming languages and concepts",
  "createdAt": "2025-11-16T10:01:00.000Z",
  "updatedAt": "2025-11-16T10:01:00.000Z"
}
```

Curl:
```bash
curl -X POST http://localhost:8000/api/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin-token>" \
  -d '{
    "name": "Programming",
    "description": "Books about programming languages and concepts"
  }'
```

---

#### Delete Category (Admin Only)
**DELETE** `/api/categories/:id`

Headers:
- `Authorization: Bearer <admin-token>`

Response: (204 No Content)

Curl:
```bash
curl -X DELETE http://localhost:8000/api/categories/cat-01 \
  -H "Authorization: Bearer <admin-token>"
```

---

### Users

#### List All Users (Admin Only)
**GET** `/api/users`

Headers:
- `Authorization: Bearer <admin-token>`

Response (200 OK):
```json
[
  {
    "_id": "k1x3q-abc123",
    "name": "Alice Reader",
    "email": "alice@example.com",
    "role": "user",
    "createdAt": "2025-11-16T10:00:00.000Z",
    "updatedAt": "2025-11-16T10:00:00.000Z"
  },
  {
    "_id": "admin-01",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "admin",
    "createdAt": "2025-11-16T09:00:00.000Z",
    "updatedAt": "2025-11-16T09:00:00.000Z"
  }
]
```

Curl:
```bash
curl http://localhost:8000/api/users \
  -H "Authorization: Bearer <admin-token>"
```

---

#### Get Single User (Admin Only)
**GET** `/api/users/:id`

Headers:
- `Authorization: Bearer <admin-token>`

Response (200 OK):
```json
{
  "_id": "k1x3q-abc123",
  "name": "Alice Reader",
  "email": "alice@example.com",
  "role": "user",
  "createdAt": "2025-11-16T10:00:00.000Z",
  "updatedAt": "2025-11-16T10:00:00.000Z"
}
```

Curl:
```bash
curl http://localhost:8000/api/users/k1x3q-abc123 \
  -H "Authorization: Bearer <admin-token>"
```

---

#### Update User (Admin Only)
**PUT** `/api/users/:id`

Headers:
- `Authorization: Bearer <admin-token>`

Request:
```json
{
  "role": "admin",
  "name": "Alice Admin"
}
```

Response (200 OK):
```json
{
  "_id": "k1x3q-abc123",
  "name": "Alice Admin",
  "email": "alice@example.com",
  "role": "admin",
  "createdAt": "2025-11-16T10:00:00.000Z",
  "updatedAt": "2025-11-16T10:15:00.000Z"
}
```

Curl:
```bash
curl -X PUT http://localhost:8000/api/users/k1x3q-abc123 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin-token>" \
  -d '{
    "role": "admin",
    "name": "Alice Admin"
  }'
```

---

#### Delete User (Admin Only)
**DELETE** `/api/users/:id`

Headers:
- `Authorization: Bearer <admin-token>`

Response: (204 No Content)

Curl:
```bash
curl -X DELETE http://localhost:8000/api/users/k1x3q-abc123 \
  -H "Authorization: Bearer <admin-token>"
```

---

## Authentication & Authorization

- **JWT Token**: All protected endpoints require an `Authorization` header with a valid JWT token.
  ```
  Authorization: Bearer <token>
  ```
- **Admin Routes**: Endpoints marked "(Admin Only)" require a user with `role: "admin"`.
- **Token Expiry**: Tokens expire in 7 days by default.
- **JWT Secret**: Set `JWT_SECRET` in `.env` file (default: `'secret'`).

---

## Notes

- **File-Based Storage**: Data is stored in JSON files under `src/data/` (not suitable for production).
- **Password Security**: Passwords are hashed using bcrypt; never exposed in responses.
- **IDs**: All resources use string-based `_id` fields (auto-generated).
- **Timestamps**: All resources include `createdAt` and `updatedAt` fields.

---

## Project Structure

```
/library-management-system
├── server.js                # Entry point
├── package.json
├── .env                     # Environment variables
├── .env.example             # Example environment file
├── src/
│   ├── config/
│   │   ├── db.js            # File DB initializer
│   │   └── logger.js        # Winston logger
│   ├── controllers/         # Request handlers
│   ├── models/              # Data models
│   ├── services/            # Business logic
│   ├── middleware/          # Express middleware
│   ├── routes/              # API routes
│   ├── validation/          # Joi validation schemas
│   ├── lib/
│   │   └── fileDb.js        # File-based DB utility
│   └── data/                # JSON data files (created at runtime)
```
