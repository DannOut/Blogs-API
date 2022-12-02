const express = require('express');
const { PostController } = require('../controllers');
const { validateToken, validatePosts, validatePostsUpdate } = require('../middlewares');

const router = express.Router();

router.post('/', validateToken, validatePosts, PostController.createPost);
router.put('/:id', validateToken, validatePostsUpdate, PostController.updatePost);
router.delete('/:id', validateToken, PostController.deletePost);
router.get('/:id', validateToken, PostController.getById);
router.get('/', validateToken, PostController.getAll);

module.exports = router;