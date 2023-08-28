const jwt = require('jsonwebtoken');
const { formatAPIResponse, formatError } = require('../helper/api.helper');
const SECRET_KEY = 'tsanta';

const authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization'];

  if (token) {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return formatAPIResponse(res, {
          status: 403,
          error: formatError({
            message: 'Invalid or expired token',
          }),
        });
      }

      if (decoded.userid) {
        req.idUser = decoded.userid;
      }
      if (decoded.adminId) {
        req.idAdmin = decoded.adminId;
      }
      next();
    });
  } else {
    return formatAPIResponse(res, {
      status: 401,
      error: formatError({
        message: 'Token required',
      }),
    });
  }
};

module.exports = authenticateJWT;
