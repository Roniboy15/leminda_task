const database = require('../db/database');

class Response {
    constructor(id, userId, answers, createdAt, elapsedTime) {
        this.id = id;
        this.userId = userId;
        this.answers = answers; // This should be an array
        this.createdAt = createdAt;
        this.elapsedTime = elapsedTime;
    }

    // Save a new response
    async save() {
        const [result] = await database.query('INSERT INTO Responses (userId, answers, elapsedTime) VALUES (?, ?, ?)', [this.userId, JSON.stringify(this.answers), this.elapsedTime]);
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
        return responses.map(res => new Response(res.id, res.userId, res.answers, res.createdAt, res.elapsedTime));
    }

    // Get all responses (of all users)
    static async findAll() {
        const [responses] = await database.query('SELECT * FROM Responses');
        return responses.map(res => new Response(res.id, res.userId, res.answers, res.createdAt, res.elapsedTime));
    }

    // Get all responses for a specific question
    static async findByQuestionId(questionId) {
        const id = Number(questionId);
        const [responses] = await database.query('SELECT * FROM Responses');

        // Filter and map to extract only relevant answers with their corresponding userId
        const relevantAnswers = responses.reduce((acc, res) => {
            const answers = res.answers;
            answers.filter(answer => answer.questionId === id)
                .forEach(matchingAnswer => {
                    acc.push({ userId: res.userId, answer: matchingAnswer.answer });
                });
            return acc;
        }, []);

        return relevantAnswers;
    }

    // // Get average rating for a specific question
    // static async getAverageRatingForQuestion(questionId) {
    //     const [responses] = await database.query('SELECT * FROM Responses');
    //     let totalRating = 0;
    //     let count = 0;

    //     responses.forEach(res => {
    //         const answers = res.answers;
    //         answers.forEach(answer => {
    //             if (answer.questionId === questionId && answer.rating) {
    //                 totalRating += answer.rating;
    //                 count++;
    //             }
    //         });
    //     });

    //     return count > 0 ? (totalRating / count) : 0;
    // }

    // Get responses within a date range
    static async findByDateRange(startDate, endDate) {

        const [responses] = await database.query('SELECT * FROM Responses WHERE createdAt BETWEEN ? AND ?', [startDate, endDate]);
        return responses.map(res => new Response(res.id, res.userId, res.answers, res.createdAt, res.elapsedTime));
    }

}

module.exports = Response;
