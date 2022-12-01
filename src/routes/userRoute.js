const express = require('express');
const { userController } = require('../controllers');
const { validateUser, validateToken } = require('../middlewares');

const router = express.Router();

router.post('/', validateUser, userController.createUser);
router.get('/', validateToken, userController.getAll);
module.exports = router;