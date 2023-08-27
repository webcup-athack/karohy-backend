const jwt = require('jsonwebtoken');
const SECRET_KEY = 'tsanta';

const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization'];

    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid or expired token' });
            }

            if(decoded.userid) {
                req.idUser = decoded.userid;
            }
            if(decoded.adminId) {
                req.idAdmin = decoded.adminId;
            }
            next();
        });
    } else {
        return res.status(401).json({ message: 'Token required' });
    }
};

module.exports = authenticateJWT;
