import database = require("../db/database");

class Feedback {
    constructor(id, userId, questionId, text, rating) {
        this.id = id;
        this.userId = userId;
        this.questionId = questionId; // Can be null if it's general feedback
        this.text = text;
        this.rating = rating; // Can be a numerical value or null
    }

    async save() {
        await database.query('INSERT INTO Feedbacks (userId, questionId, text, rating) VALUES (?, ?, ?, ?)', [this.userId, this.questionId, this.text, this.rating]);
    }

    static async findAll() {
        const [feedbacks] = await database.query('SELECT * FROM Feedbacks');
        return feedbacks.map(fb => new Feedback(fb.id, fb.userId, fb.questionId, fb.text, fb.rating));
    }
    static async findById(id) {
        const [feedbacks] = await database.query('SELECT * FROM Feedbacks WHERE id = ?', [id]);
        if (feedbacks.length > 0) {
            const fb = feedbacks[0];
            return new Feedback(fb.id, fb.userId, fb.questionId, fb.text, fb.rating);
        }
        return null;
    }

    async update() {
        await database.query('UPDATE Feedbacks SET userId = ?, questionId = ?, text = ?, rating = ? WHERE id = ?', [this.userId, this.questionId, this.text, this.rating, this.id]);
    }
    static async delete(id) {
        await database.query('DELETE FROM Feedbacks WHERE id = ?', [id]);
    }

    static async findByUserId(userId) {
        const [feedbacks] = await database.query('SELECT * FROM Feedbacks WHERE userId = ?', [userId]);
        return feedbacks.map(fb => new Feedback(fb.id, fb.userId, fb.questionId, fb.text, fb.rating));
    }

    static async findByQuestionId(questionId) {
        const [feedbacks] = await database.query('SELECT * FROM Feedbacks WHERE questionId = ?', [questionId]);
        return feedbacks.map(fb => new Feedback(fb.id, fb.userId, fb.questionId, fb.text, fb.rating));
    }


}

module.exports =  Feedback;