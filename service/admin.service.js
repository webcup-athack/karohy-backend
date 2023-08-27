const { checkEmailFormat } = require("../helper/string.helper");
const Admin = require("../model/admin.model");
const GeneralException = require("../utils/Error/GeneralException");

const authenticateAdmin = async (email, password) => {
    
    try {
        if (!checkEmailFormat(email)) {
            throw new GeneralException("ERROR_INPUT_INVALID", "Invalid email");
        } 
        if (password === undefined || ( password.trim() === "")) {
            throw new GeneralException("ERROR_INPUT_INVALID", "Invalid password");
        }
        const user = await Admin.findOne({ email: email, motDePasse: password });
        if (user) {
            return user;
        } else {
            throw new GeneralException("ERROR_AUTH_ADMIN_DENIED", "Authentication failed, usermail or password is invalid");
        }
    } catch (error) {
        if (error instanceof GeneralException) {
            throw error;
        } else {
            throw new GeneralException("ERROR_AUTH_ADMIN_ERROR", "Authentication failed");
        }
    }

};

module.exports = {
    authenticateAdmin: authenticateAdmin
}