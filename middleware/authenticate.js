const jwt = require('jsonwebtoken');

const adminAuthenticate = (req, res, next) => {
    let token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    
    token = token.split("Bearer ")
    token = token[1]
    
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(verified.role == "Admin") {
            req.user = verified;
            next();
        } else {
            return res.status(403).json({ error: 'Access forbidden: Admins only' });
        }
    } catch (err) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

// const userAuthenticate = (req, res, next) => {
//     let token = req.header('Authorization');
//     if (!token) return res.status(401).json({ error: 'Access denied' });
    
//     token = token.split("Bearer ")
//     token = token[1]
    
//     try {
//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         if(verified.role == "User") {
//             req.user = verified;
//             next();
//         } else {
//             return res.status(403).json({ error: 'Access forbidden: User' });
//         }
//     } catch (err) {
//         res.status(400).json({ error: 'Invalid token' });
//     }
// };

const combinedAuthenticate = (req, res, next) => {
    let token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    token = token.split("Bearer ")[1];
    try {
        // First, try to verify as admin
        const adminVerified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = adminVerified
        return next();
    } catch (adminError) {
        try {
            // If admin verification fails, try to verify as user
            const userVerified = jwt.verify(token, process.env.JWT_SECRET);
            req.user = userVerified
            return next();
        } catch (userError) {
            return res.status(403).json({ error: 'Access forbidden: Invalid token or role' });
        }
    }
};

module.exports = {
    adminAuthenticate,
    combinedAuthenticate
}