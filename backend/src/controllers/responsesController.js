const Response = require('../models/Response.js');

const responsesController = {

    // Save a new response
    async saveResponse(req, res) {
        try {
            const response = new Response(null, req.body.userId, req.body.answers);
            await response.save();
            res.status(201).json(response);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error saving response' });
        }
    },

    // Delete a response
    async deleteResponse(req, res) {
        try {
            await Response.delete(req.params.id);
            res.json({ message: 'Response deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error deleting response' });
        }
    },

    // Get all responses of a specific user
    async getResponsesByUser(req, res) {
        try {
            const responses = await Response.findByUserId(req.params.userId);
            res.json(responses);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching responses' });
        }
    },

    // Get all responses (of all users)
    async getAllResponses(req, res) {
        try {
            const responses = await Response.findAll();
            res.json(responses);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching responses' });
        }
    },

    // Get all responses for a specific question
    async getResponsesByQuestion(req, res) {
        try {
            const responses = await Response.findByQuestionId(req.params.questionId);
            res.json(responses);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching responses for question' });
        }
    },

    // Get average rating for a specific question
    async getAverageRating(req, res) {
        try {
            const averageRating = await Response.getAverageRatingForQuestion(req.params.questionId);
            res.json({ averageRating });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching average rating' });
        }
    },

    // Get responses within a date range
    async getResponsesByDateRange(req, res) {
        try {
            const { startDate, endDate } = req.query;
            const responses = await Response.findByDateRange(startDate, endDate);
            res.json(responses);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching responses in date range' });
        }
    },
};

module.exports = responsesController;
