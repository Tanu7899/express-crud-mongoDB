const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    
    token = token.split("Bearer ")
    token = token[1]
    
    try {
        const verified = jwt.verify(token.replace(" " ,""), process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token' });
    }
};