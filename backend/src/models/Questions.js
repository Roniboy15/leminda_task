const database = require('../db/database');

class Question {
    constructor(id, text) {
        this.id = id;
        this.text = text;
    }

    // Retrieve all questions
    static async findAll() {
        const [questions] = await database.query('SELECT * FROM Questions LIMIT 10');
        return questions.map(q => new Question(q.id, q.text));
    }

    // Find a question by its ID
    static async findById(id) {
        const [questions] = await database.query('SELECT * FROM Questions WHERE id = ?', [id]);
        if (questions.length > 0) {
            return new Question(questions[0].id, questions[0].text);
        }
        return null;
    }

    // Create a new question
    static async create(text, type) {
        const [result] = await database.query('INSERT INTO Questions (text) VALUES (?)', [text]);
        return new Question(result.insertId, text);
    }

    // Update an existing question
    async update(text) {
        this.text = text;
        await database.query('UPDATE Questions SET text = ? WHERE id = ?', [text, this.id]);
    }

    // Delete a question
    static async delete(id) {
        await database.query('DELETE FROM Questions WHERE id = ?', [id]);
    }
}

module.exports = Question;
