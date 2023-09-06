import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { formatAPIResponse, formatError } from '../helper/api.helper';
import { ERROR } from '../error/Error';
const SECRET_KEY = process.env.JWT_SECRET || 'test';

const authenticateJWT = (
  req: Request & {
    idUser?: string | number;
    idAdmin?: string | number;
  },
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers['authorization'];

  if (token) {
    jwt.verify(token, SECRET_KEY, (err, decoded: any) => {
      if (err) {
        return formatAPIResponse(res, {
          status: ERROR.TOKEN.INVALID_OR_EXPIRED_TOKEN.status as number,
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
      status: ERROR.TOKEN.MISSING_TOKEN.status as number,
      error: formatError(ERROR.TOKEN.MISSING_TOKEN),
    });
  }
};

export default authenticateJWT;
