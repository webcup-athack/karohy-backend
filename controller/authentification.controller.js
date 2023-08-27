// controllers/authentication-controller.js
const {
  checkEmailFormat,
  normalizeString,
} = require('../helper/string.helper');
const { formatAPIResponse, formatError } = require('../helper/api.helper');
const utilisateurService = require('../service/user.service');
const adminService = require('../service/admin.service');
const User = require('../model/user.model');

const login = (request, response) => {
  const { email, password } = request.body;

  // Appeler la fonction pour authentifier l'utilisateur
  utilisateurService
    .authenticateUser(email, password)
    .then((user) => {
      if (user) {
        // L'utilisateur est authentifié avec succès
        return formatAPIResponse(response, {
          status: 200,
          message: 'Successfully connected',
          datas: {
            user: User.formatLoginUser(user),
          },
        });
      } else {
        // L'utilisateur n'a pas pu être authentifié
        return formatAPIResponse(response, {
          status: 400,
          message: 'Incorrect email or password',
        });
      }
    })
    .catch((err) => {
      // Une erreur s'est produite lors de l'authentification
      console.log('error', err);
      return formatAPIResponse(response, {
        status: 400,
        message: 'Incorrect email or password',
        error: formatError(err),
      });
    });
};

const inscription = (request, response) => {
  const { firstname, lastname, email, password, birth_date, phone_number } =
    request.body;

  const userData = {
    prenom: firstname,
    nom: lastname,
    email: email,
    motDePasse: password, // Make sure to hash the password before saving it in production
    dateNaissance: birth_date,
    numTelephone: phone_number,
  };

  // Call the createUser function to register the user
  utilisateurService
    .createUser(userData)
    .then((user) => {
      // User registration successful
      return formatAPIResponse(response, {
        status: 200,
        message: 'Registered user successfully',
        datas: User.formatRegisterUser(user),
      });
    })
    .catch((err) => {
      // An error occurred during user registration
      console.log('error', err);
      return formatAPIResponse(response, {
        status: 400,
        message: 'An error occured while registering user',
        error: formatError(err),
      });
    });
};

const loginAdmin = (request, response) => {
  const { email, password } = request.body;

  adminService
    .authenticateAdmin(email, password)
    .then((admin) => {
      // If admin
      return formatAPIResponse(response, {
        status: 200,
        message: 'Admin connecté avec succès',
        datas: {
          admin,
        },
      });
    })
    .catch((err) => {
      console.log('error', err);
      return formatAPIResponse(response, {
        status: 400,
        message:
          "Une erreur s'est produite lors de l'authentification de l'admin",
        error: err,
      });
    });
};

module.exports = {
  login,
  inscription,
  loginAdmin,
};
