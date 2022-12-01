const express = require('express');
const { PostController } = require('../controllers');
const { validateToken, validatePosts } = require('../middlewares');

const router = express.Router();

router.post('/', validateToken, validatePosts, PostController.createPost);
router.get('/', validateToken, PostController.getAll);

module.exports = router;