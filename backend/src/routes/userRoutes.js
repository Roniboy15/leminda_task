const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const { authAdmin, auth } = require('../middleware/auth.js');

// Protected route: Get all users (only accessible to admin)
router.get('/', authAdmin, userController.getAllUsers);

// Protected route: Get user by ID (only accessible to logged-in users)
router.get('/:id', auth, userController.getUserById);

// Public route: Create a new user
router.post('/signup', userController.createUser);

// Public route: Login
router.post('/login', userController.loginUser);

// Protected route: Update a user (only accessible to logged-in users)
router.put('/:id', auth, userController.updateUser);

// Protected route: Delete a user (only accessible to admin)
router.delete('/:id', authAdmin, userController.deleteUser);


module.exports = router;
