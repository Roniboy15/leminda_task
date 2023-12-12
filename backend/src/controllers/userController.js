const database = require('../db/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require("../config/secret.js");
const saltRounds = 10; // Used for bcrypt password hashing

const userController = {
    // Get all users
    async getAllUsers(req, res) {
        try {
            const [users] = await database.query('SELECT id, username, email FROM Users');
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching users' });
        }
    },

    // Get a single user by ID
    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const [user] = await database.query('SELECT id, username, email FROM Users WHERE id = ?', [id]);

            if (user.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json(user[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching user' });
        }
    },

    // Create a new user
    async createUser(req, res) {
        try {
            const { username, email, password } = req.body;

            // Check if the username or email already exists
            const [existingUser] = await database.query('SELECT * FROM Users WHERE username = ? OR email = ?', [username, email]);

            if (existingUser.length > 0) {
                return res.status(400).json({ message: 'Username or email already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, saltRounds);
            await database.query('INSERT INTO Users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);

            res.status(201).json({ message: 'User created' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creating user' });
        }
    },

    // Update a user
    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { username, email, password } = req.body;

            // First, check if the user exists
            const [userExists] = await database.query('SELECT id FROM Users WHERE id = ?', [id]);
            if (userExists.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Check if the username already exists in other records
            if (username) {
                const [existingUsername] = await database.query('SELECT id FROM Users WHERE username = ? AND id != ?', [username, id]);
                if (existingUsername.length > 0) {
                    return res.status(400).json({ message: 'Username already exists' });
                }
            }

            // Check if the email already exists in other records
            if (email) {
                const [existingEmail] = await database.query('SELECT id FROM Users WHERE email = ? AND id != ?', [email, id]);
                if (existingEmail.length > 0) {
                    return res.status(400).json({ message: 'Email already exists' });
                }
            }

            let updateQuery = 'UPDATE Users SET ';
            const updateValues = [];
            if (username) {
                updateQuery += 'username = ?, ';
                updateValues.push(username);
            }
            if (email) {
                updateQuery += 'email = ?, ';
                updateValues.push(email);
            }
            if (password) {
                const hashedPassword = await bcrypt.hash(password, saltRounds);
                updateQuery += 'password = ?, ';
                updateValues.push(hashedPassword);
            }
            updateQuery = updateQuery.slice(0, -2); // Remove last comma
            updateQuery += ' WHERE id = ?';
            updateValues.push(id);

            const [result] = await database.query(updateQuery, updateValues);

            if (result.affectedRows === 0) {
                // This case should not occur since we already checked if the user exists
                return res.status(404).json({ message: 'User not found' });
            }

            res.json({ message: 'User updated' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating user' });
        }
    },


    // Delete a user
    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const [result] = await database.query('DELETE FROM Users WHERE id = ?', [id]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json({ message: 'User deleted' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error deleting user' });
        }
    },

    async loginUser(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required' });
            }

            // Check if the user exists
            const [user] = await database.query('SELECT * FROM Users WHERE email = ?', [email]);
            if (user.length === 0) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Check if the password is correct
            const isValidPassword = await bcrypt.compare(password, user[0].password);
            if (!isValidPassword) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Generate a token
            const token = jwt.sign({
                id: user[0].id,
                username: user[0].username,
                role: user[0].role
            }, config.jwt_secret_key, { expiresIn: config.jwt_login_duration });

            res.json({ message: 'Login successful', token });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error logging in' });
        }
    }
};

module.exports = userController;
