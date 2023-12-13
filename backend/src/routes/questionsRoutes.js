const express = require('express');
const router = express.Router();
const { auth, authAdmin } = require('../middleware/auth.js');
const questionsController = require('../controllers/questionsController.js');

// Protected route: Get all questions
router.get('/all', auth, questionsController.getAllQuestions);

// Protected route: Get a single question by ID
router.get('/one/:id', auth, questionsController.getQuestionById);

// Protected route: Create a new question
router.post('/createQuestion', authAdmin, questionsController.createQuestion);

// Protected route: Update an existing question
router.put('/:id', authAdmin, questionsController.updateQuestion);

// Protected route: Delete a question
router.delete('/:id', authAdmin, questionsController.deleteQuestion);

module.exports = router;
