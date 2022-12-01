const express = require('express');
const { UserController } = require('../controllers');
const { validateUser, validateToken } = require('../middlewares');

const router = express.Router();

router.post('/', validateUser, UserController.createUser);
router.get('/:id', validateToken, UserController.getUser);
router.get('/', validateToken, UserController.getAll);
module.exports = router;