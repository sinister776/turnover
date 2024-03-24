const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// User registration
router.post('/register', userController.registerUser);

// User login
router.post('/login', userController.loginUser);


router.post('/verify' ,userController.emailVerificationCheck)

router.delete('/:id', userController.deleteUserById);

// Get all users
router.get('/', userController.getAllUsers);

module.exports = router;
