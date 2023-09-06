import { checkEmailFormat } from '../helper/string.helper';
import User from '../model/user.model';
import { IUser } from '../types/app';
import GeneralException from '../utils/Error/GeneralException';
import bcrypt from 'bcrypt';
import { ERROR } from '../error/Error';

const authenticateUser = async (
  email: string,
  password: string,
): Promise<IUser | unknown> => {
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
    const user = await User.findOne({ email: email });
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    } else {
      throw GeneralException.formatException(
        ERROR.AUTHENTICATION.INVALID_CREDENTIALS,
      );
    }
  } catch (error: any) {
    // console.log(error);
    throw GeneralException.formatException(error);
  }
};

const createUser = async (newUser: IUser): Promise<IUser | unknown> => {
  try {
    const userExist = await User.findOne({ email: newUser.email });
    if (userExist) {
      throw GeneralException.formatException(
        ERROR.AUTHENTICATION.EMAIL_ALREADY_EXISTS,
      );
    }

    if (!checkEmailFormat(newUser.email)) {
      throw GeneralException.formatException(
        ERROR.AUTHENTICATION.INVALID_EMAIL,
      );
    }

    if (newUser.password === undefined || newUser.password.trim() === '') {
      throw GeneralException.formatException(
        ERROR.AUTHENTICATION.INVALID_PASSWORD,
      );
    }
    const hashedPassword = bcrypt.hashSync(newUser.password, 10);
    newUser.password = hashedPassword;
    const userCreated = new User(newUser);
    const user = await userCreated.save();
    if (user) user.password = '';
    else {
      throw GeneralException.formatException(
        ERROR.AUTHENTICATION.UNKNOWN_ERROR,
      );
    }

    return user;
  } catch (errorCreateUser: any) {
    throw GeneralException.formatException(errorCreateUser);
  }
};

export { authenticateUser, createUser };
