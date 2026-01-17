const User = require('../models/User');

const verifyToken = async (req, res, next) => {
    const userId = req.headers['x-user-id'];
    if (userId) {
        try {
            const user = await User.findById(userId);
            if (user) {
                req.user = user;
                next();
            } else {
                res.status(403).json({ message: 'User not found' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Server error' });
        }
    } else {
        return res.status(401).json({ message: 'You are not authenticated!' });
    }
};

const verifyTokenAndAdmin = async (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({ message: 'You are not allowed to do that!' });
        }
    });
};

module.exports = {
    verifyToken,
    verifyTokenAndAdmin,
};
