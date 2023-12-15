const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const { auth, authAdmin } = require('../middleware/auth'); // Assuming you have auth middleware

// Create a new feedback
router.post('/', auth, feedbackController.createFeedback);

// Get all feedbacks
router.get('/', authAdmin, feedbackController.getAllFeedbacks);

// Get feedback by ID
router.get('/:id', auth, feedbackController.getFeedbackById);

// Update feedback
router.put('/:id', auth, feedbackController.updateFeedback);

// Delete feedback
router.delete('/:id', auth, feedbackController.deleteFeedback);

// Get feedbacks for a specific user
router.get('/user/:userId', authAdmin, feedbackController.getFeedbackByUserId);

// Get feedbacks for a specific question
router.get('/question/:questionId', authAdmin, feedbackController.getFeedbackByQuestionId);


module.exports = router;
