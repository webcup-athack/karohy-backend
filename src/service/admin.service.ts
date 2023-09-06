import { ERROR } from '../error/Error';
import { checkEmailFormat } from '../helper/string.helper';
import Admin from '../model/admin.model';
import { IAdmin } from '../types/app';
import GeneralException from '../utils/Error/GeneralException';
import bcrypt from 'bcrypt';

const authenticateAdmin = async (
  email: string,
  password: string,
): Promise<IAdmin | unknown> => {
  try {
    if (!checkEmailFormat(email)) {
      throw GeneralException.formatException(
        ERROR.AUTHENTICATION.INVALID_EMAIL,
      );
    }
    if (password === undefined || password.trim() === '') {
      throw GeneralException.formatException(
        ERROR.AUTHENTICATION.INVALID_PASSWORD,
      );
    }
    const user = await Admin.findOne({ email: email });
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    } else {
      throw GeneralException.formatException(
        ERROR.AUTHENTICATION.INVALID_CREDENTIALS,
      );
    }
  } catch (error: any) {
    throw GeneralException.formatException(error);
  }
};

export { authenticateAdmin };
