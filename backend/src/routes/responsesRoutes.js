const express = require('express');
const router = express.Router();
const responsesController = require('../controllers/responsesController.js');
const { authAdmin, auth } = require('../middleware/auth.js');

// Protected route: Save a new response (only accessible to logged-in users)
router.post('/', auth, responsesController.saveResponse);

// Protected route: Delete a response (potentially only accessible to admin or the user who posted it)
router.delete('/:id', auth, responsesController.deleteResponse);

// Protected route: Get all responses of a specific user (only accessible to the user or admin)
router.get('/user/:userId', auth, responsesController.getResponsesByUser);

// Protected route: Get all responses (of all users) (only accessible to admin)
router.get('/', authAdmin, responsesController.getAllResponses);

// Protected route: Get all responses for a specific question 
router.get('/question/:questionId', authAdmin, responsesController.getResponsesByQuestion);

// Protected route: Get average rating for a specific question
router.get('/averageRating/:questionId', authAdmin, responsesController.getAverageRating);

// Protected route: Get responses within a date range (only accessible to admin)
router.get('/dateRange', authAdmin, responsesController.getResponsesByDateRange);


module.exports = router;
