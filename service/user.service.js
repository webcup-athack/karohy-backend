const { MongooseError } = require("mongoose");
const { checkEmailFormat } = require("../helper/string.helper");
const User = require("../model/user.model");
const GeneralException = require("../utils/Error/GeneralException");
const bcrypt = require('bcrypt');

const authenticateUser = async (email, password) => {
    try {
        if (!checkEmailFormat(email)) {
            throw new GeneralException("ERROR_INPUT_INVALID", "Invalid email");
        } 
        if (password === undefined || ( password.trim() === "")) {
            throw new GeneralException("ERROR_INPUT_INVALID", "Invalid password");
        }
        const user = await User.findOne({ email: email });
        if (user && await bcrypt.compare(password, user.motDePasse)) {
            return user;
        } else {
            throw new GeneralException("ERROR_AUTH_USER_DENIED", "Authentication failed, email or password is invalid");
        }
    } catch (error) {
        if (error instanceof GeneralException) {
            throw error;
        } else {
            throw new GeneralException("ERROR_AUTH_USER_ERROR", "Authentication failed");
        }
    }
};
  
  

const createUser = async (data) => {
    try {
        const userExist = await User.findOne({ email: data.email });
        if (userExist) {
            throw new GeneralException("ERROR_SIGNIN_USER_ALREADY_EXIST", "Email already exists");
        }
        const newUser = new User(data);
        const user = await newUser.save();
        if (user) user.motDePasse = '';
        else {
            throw new GeneralException("ERROR_SIGNIN_USER_DENIED", "Could not sign in user");
        }
        return user;
    } catch (errorCreateUser) {
        if (errorCreateUser instanceof GeneralException) {
            throw errorCreateUser;
        } else {
            throw new GeneralException("ERROR_SIGNIN_USER_DENIED", "Could not sign in user");
        }
        
        
    }
}

module.exports = {
    authenticateUser: authenticateUser,
    createUser: createUser
}