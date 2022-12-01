const express = require('express');
const { CategoryController } = require('../controllers');
const { validateToken, validateCategory } = require('../middlewares');

const router = express.Router();

router.post('/', validateToken, validateCategory, CategoryController.createCategory);
router.get('/', validateToken, CategoryController.getAllCategories);

module.exports = router;