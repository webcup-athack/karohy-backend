const { checkEmailFormat } = require('../helper/string.helper');
const User = require('../model/user.model');
const GeneralException = require('../utils/Error/GeneralException');
const bcrypt = require('bcrypt');
const { ERROR } = require('../error/Error');

const authenticateUser = async (email, password) => {
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
    if (user && (await bcrypt.compare(password, user.motDePasse))) {
      return user;
    } else {
      throw GeneralException.formatException(
        ERROR.AUTHENTICATION.INVALID_CREDENTIALS,
      );
    }
  } catch (error) {
    throw GeneralException.formatException(error);
  }
};

const createUser = async (data) => {
  try {
    const userExist = await User.findOne({ email: data.email });
    if (userExist) {
      throw GeneralException.formatException(
        ERROR.AUTHENTICATION.EMAIL_ALREADY_EXISTS,
      );
    }

    if (!checkEmailFormat(data.email)) {
      throw GeneralException.formatException(
        ERROR.AUTHENTICATION.INVALID_EMAIL,
      );
    }

    if (data.motDePasse === undefined || data.motDePasse.trim() === '') {
      throw GeneralException.formatException(
        ERROR.AUTHENTICATION.INVALID_PASSWORD,
      );
    }
    const hashedPassword = await bcrypt.hash(data.motDePasse, 10);
    data.motDePasse = hashedPassword;
    const newUser = new User(data);
    const user = await newUser.save();
    if (user) user.motDePasse = '';
    else {
      throw GeneralException.formatException(
        ERROR.AUTHENTICATION.UNKNOWN_ERROR,
      );
    }

    return user;
  } catch (errorCreateUser) {
    throw GeneralException.formatException(errorCreateUser);
  }
};

module.exports = {
  authenticateUser: authenticateUser,
  createUser: createUser,
};
