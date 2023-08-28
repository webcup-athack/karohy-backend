const jwt = require('jsonwebtoken');
const { formatAPIResponse, formatError } = require('../helper/api.helper');
const { ERROR } = require('../error/Error');
const SECRET_KEY = 'tsanta';

const authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization'];

  if (token) {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return formatAPIResponse(res, {
          status: ERROR.TOKEN.INVALID_OR_EXPIRED_TOKEN.status,
          error: formatError(ERROR.TOKEN.INVALID_OR_EXPIRED_TOKEN),
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
      status: ERROR.TOKEN.MISSING_TOKEN.status,
      error: formatError(ERROR.TOKEN.MISSING_TOKEN),
    });
  }
};

module.exports = authenticateJWT;