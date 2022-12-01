const express = require('express');
const { CategoryController } = require('../controllers');
const { validateToken, validateCategory } = require('../middlewares');

const router = express.Router();

router.post('/', validateToken, validateCategory, CategoryController.createCategory);

module.exports = router;