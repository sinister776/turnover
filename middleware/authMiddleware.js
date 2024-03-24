const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateUser = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) {
            throw new Error('No token provided');
        }

        const decoded = jwt.verify(token, 'secret_key');
        if (!decoded.email) {
            throw new Error('Invalid token');
        }

        const user = await User.findOne({ where: { email: decoded.email } });
        if (!user) {
            throw new Error('User not found');
        }

        req.user = user;

        next();
    } catch (error) {
        console.error('Authentication error:', error.message);
        res.status(401).json({ error: 'Authentication failed' });
    }
};

module.exports = { authenticateUser };
