const database = require('../db/database');

class Response {
    constructor(id, userId, answers, createdAt) {
        this.id = id;
        this.userId = userId;
        this.answers = answers; // This should be an array an 
        this.createdAt = createdAt;
    }

    // Save a new response
    async save() {
        const [result] = await database.query('INSERT INTO Responses (userId, answers) VALUES (?, ?)', [this.userId, JSON.stringify(this.answers)]);
        this.id = result.insertId;
        return this;
    }

    // Delete a response
    static async delete(id) {
        await database.query('DELETE FROM Responses WHERE id = ?', [id]);
    }

    // Get all responses of a specific user
    static async findByUserId(userId) {
        const [responses] = await database.query('SELECT * FROM Responses WHERE userId = ?', [userId]);
        return responses.map(res => new Response(res.id, res.userId, res.answers, res.createdAt));
    }

    // Get all responses (of all users)
    static async findAll() {
        const [responses] = await database.query('SELECT * FROM Responses');
        return responses.map(res => new Response(res.id, res.userId, res.answers, res.createdAt));
    }

    // Get all responses for a specific question
    static async findByQuestionId(questionId) {
        const [responses] = await database.query('SELECT * FROM Responses');
        console.log(responses)
        return responses
            .map(res => new Response(res.id, res.userId, res.answers, res.createdAt))
            .filter(res => res.answers.some(answer => answer.questionId === questionId));
    }

    // Get average rating for a specific question
    static async getAverageRatingForQuestion(questionId) {
        const [responses] = await database.query('SELECT * FROM Responses');
        let totalRating = 0;
        let count = 0;

        responses.forEach(res => {
            const answers = JSON.parse(res.answers);
            answers.forEach(answer => {
                if (answer.questionId === questionId && answer.rating) {
                    totalRating += answer.rating;
                    count++;
                }
            });
        });

        return count > 0 ? (totalRating / count) : 0;
    }

    // Get responses within a date range
    static async findByDateRange(startDate, endDate) {
        const [responses] = await database.query('SELECT * FROM Responses WHERE createdAt BETWEEN ? AND ?', [startDate, endDate]);
        return responses.map(res => new Response(res.id, res.userId, JSON.parse(res.answers), res.createdAt));
    }

}

module.exports = Response;
