const Questions = require('../models/Questions');

const questionsController = {
    // Get all questions
    async getAllQuestions(req, res) {
        try {
            const questions = await Questions.findAll();
            res.json(questions);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching questions' });
        }
    },

    // Get a single question by ID
    async getQuestionById(req, res) {
        try {
            const id = req.params.id;
            const question = await Questions.findById(id);
            if (question) {
                res.json(question);
            } else {
                res.status(404).json({ message: 'Question not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching the question' });
        }
    },

    // Create a new question
    async createQuestion(req, res) {
        try {
            const { text } = req.body;
            const newQuestion = await Questions.create(text);
            res.status(201).json(newQuestion);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creating the question' });
        }
    },

    // Update an existing question
    async updateQuestion(req, res) {
        try {
            const id = req.params.id;
            const { text } = req.body;
            const question = await Questions.findById(id);
            if (question) {
                await question.update(text);
                res.json({ message: 'Question updated successfully' });
            } else {
                res.status(404).json({ message: 'Question not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating the question' });
        }
    },

    // Delete a question
    async deleteQuestion(req, res) {
        try {
            const id = req.params.id;
            await Questions.delete(id);
            res.json({ message: 'Question deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error deleting the question' });
        }
    }
};

module.exports = questionsController;
