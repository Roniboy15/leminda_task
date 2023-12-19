const Feedback = require('../models/Feedback');

const feedbackController = {
    // Create a new feedback
    async createFeedback(req, res) {
        try {
            const { userId, questionId, text, rating } = req.body;
            const feedback = new Feedback(null, userId, questionId, text, rating);
            await feedback.save();
            res.status(201).json({ msg: "Feedback created successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creating feedback' });
        }
    },

    // Get all feedbacks
    async getAllFeedbacks(req, res) {
        try {
            const feedbacks = await Feedback.findAll();
            res.json(feedbacks);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching feedbacks' });
        }
    },

    // Get feedback by ID
    async getFeedbackById(req, res) {
        try {
            const feedback = await Feedback.findById(req.params.id);
            if (feedback) {
                res.json(feedback);
            } else {
                res.status(404).json({ message: 'Feedback not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching feedback' });
        }
    },

    // Update feedback
    async updateFeedback(req, res) {
        try {
            const feedback = await Feedback.findById(req.params.id);
            if (feedback) {
                const { userId, questionId, text, rating } = req.body;

                // Update fields only if they are provided in the request body
                if (userId !== undefined) feedback.userId = userId;
                if (questionId !== undefined) feedback.questionId = questionId;
                if (text !== undefined) feedback.text = text;
                if (rating !== undefined) feedback.rating = rating;

                await feedback.update();
                res.status(201).json({ msg: "Feedback updated successfully" });
            } else {
                res.status(404).json({ message: 'Feedback not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating feedback' });
        }
    },


    // Delete feedback
    async deleteFeedback(req, res) {
        try {
            const feedback = await Feedback.findById(req.params.id);
            if (feedback) {
                await Feedback.delete(req.params.id);
                res.json({ message: 'Feedback deleted successfully' });
            } else {
                res.status(404).json({ message: 'Feedback not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error deleting feedback' });
        }
    },

    // Get feedbacks for a specific user
    async getFeedbackByUserId(req, res) {
        try {
            const feedbacks = await Feedback.findByUserId(req.params.userId);
            res.status(200).json(feedbacks);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching feedbacks for user' });
        }
    },

    // Get feedbacks for a specific question
    async getFeedbackByQuestionId(req, res) {
        try {
            const feedbacks = await Feedback.findByQuestionId(req.params.questionId);
            res.json(feedbacks);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching feedbacks for question' });
        }
    },

     // Get general feedbacks
     async getFeedbackWithNoRatingOrQuestionId(req, res) {
        try {
            const feedbacks = await Feedback.findWithNoRatingOrQuestionId();
            res.json(feedbacks);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching feedbacks for question' });
        }
    }



};

module.exports = feedbackController;
