const bcrypt = require('bcrypt');
const database = require('../db/database');
const saltRounds = 10; // Used for bcrypt password hashing

class User {
    
    constructor(id, username, email, password, role = 'user') {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    static async findByUsernameOrEmail(username, email) {
        const [users] = await database.query('SELECT * FROM Users WHERE username = ? OR email = ?', [username, email]);
        return users;
    }

    async save() {
        this.password = await bcrypt.hash(this.password, saltRounds);
        await database.query('INSERT INTO Users (username, email, password, role) VALUES (?, ?, ?, ?)', [this.username, this.email, this.password, this.role]);
    }
}

module.exports = User;
