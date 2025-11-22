const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const auth = require('../middleware/auth.middleware');
const admin = require('../middleware/admin.middleware');

router.get('/', categoryController.list);
router.post('/', auth, admin, categoryController.create);
router.delete('/:id', auth, admin, categoryController.remove);

module.exports = router;
