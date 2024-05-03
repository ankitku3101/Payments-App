const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;                   // storing the authorization header

    if (!authHeader || !authHeader.startsWith('Bearer ')) {         // checking the auth Header
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];                         // getting the main token by splitting

    try {
        const decoded = jwt.verify(token, JWT_SECRET);              // decoding it, matching it with specific User's JWT
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(403).json({});
    }
};

module.exports = {
    authMiddleware
}