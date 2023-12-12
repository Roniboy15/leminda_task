const jwt = require('jsonwebtoken');
const { config } = require('../config/secret.js');

exports.auth = (req, res, next) => {
    let token = req.header('x-api-key');
    if (!token) {
        return res.status(401).json({ msg: 'You must send a token to this endpoint' });
    }
    try {
        let decodedToken = jwt.verify(token, config.jwt_secret_key);
        req.tokenData = decodedToken;
        next();
    } catch (err) {
        return res.status(401).json({ msg: 'Token invalid or expired' });
    }
};

exports.authAdmin = (req, res, next) => {
    let token = req.header('x-api-key');
    if (!token) {
        return res.status(401).json({ msg: 'You must send a token to this endpoint' });
    }
    try {
        let decodedToken = jwt.verify(token, config.jwt_secret_key);
        if (decodedToken.role !== 'admin') {
            return res.status(401).json({ msg: 'You must have admin privileges to access this endpoint' });
        }
        req.tokenData = decodedToken;
        next();
    } catch (err) {
        return res.status(401).json({ msg: 'Token invalid or expired' });
    }
};

