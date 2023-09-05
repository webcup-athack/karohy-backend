const { ERROR } = require('../error/Error');
const { checkEmailFormat } = require('../helper/string.helper');
const Admin = require('../model/admin.model');
const GeneralException = require('../utils/Error/GeneralException');
const bcrypt = require('bcrypt');

const authenticateAdmin = async (email, password) => {
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

module.exports = {
  authenticateAdmin: authenticateAdmin,
};
