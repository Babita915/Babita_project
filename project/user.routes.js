// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/user.controller');
// const auth = require('../middleware/auth.middleware');
// const admin = require('../middleware/admin.middleware');

// router.get('/', userController.list);
// router.get('/:id', auth, admin, userController.get);
// router.put('/:id', auth, admin, userController.update);
// router.delete('/:id', userController.remove);

// module.exports = router;


const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');
const admin = require('../middleware/admin.middleware');

// List all users
router.get('/', userController.list);

// Get a single user (protected)
router.get('/:id', auth, admin, userController.get);

// Create a new user (protected)
router.post('/', userController.create); // <-- added route

// Update a user (protected)
router.put('/:id', auth, admin, userController.update);

// Delete a user (protected)
router.delete('/:id', userController.remove);

module.exports = router;
