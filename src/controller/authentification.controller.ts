const { formatAPIResponse } = require('../helper/api.helper');
const utilisateurService = require('../service/user.service');
const adminService = require('../service/admin.service');
const User = require('../model/user.model');
import { Request, Response } from 'express';
import GeneralException from '../utils/Error/GeneralException';

// Importing necessary libraries
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET_KEY = 'tsanta'; // Store this in a .env or another secure place

const login = async (request: Request, response: Response) => {
  const { email, password } = request.body;

  utilisateurService
    .authenticateUser(email, password)
    .then(async (user: any) => {
      const token = jwt.sign({ userid: user.id }, SECRET_KEY, {
        expiresIn: '24h',
      });
      return formatAPIResponse(response, {
        status: 200,
        message: 'Successfully connected',
        datas: {
          user: User.formatLoginUser(user),
          token,
        },
      });
    })
    .catch((err: GeneralException) => {
      console.log('error', err);
      return formatAPIResponse(response, {
        status: err.status || 400,
        error: err,
      });
    });
};

const inscription = (request: Request, response: Response) => {
  const { firstname, lastname, email, password, birth_date, phone_number } =
    request.body;

  const userData = {
    prenom: firstname,
    nom: lastname,
    email: email,
    motDePasse: password,
    dateNaissance: birth_date,
    numTelephone: phone_number,
  };

  utilisateurService
    .createUser(userData)
    .then((user: any) => {
      const token = jwt.sign({ userid: user._id }, SECRET_KEY, {
        expiresIn: '24h',
      }); // Generate the JWT token for the registered user

      return formatAPIResponse(response, {
        status: 200,
        message: 'Registered user successfully',
        datas: {
          user: User.formatRegisterUser(user),
          token, // Include the token in the response
        },
      });
    })
    .catch((err: GeneralException) => {
      console.log('error', err);
      return formatAPIResponse(response, {
        status: err.status || 400,
        error: err,
      });
    });
};

const loginAdmin = async (request: Request, response: Response) => {
  const { email, password } = request.body;

  adminService
    .authenticateAdmin(email, password)
    .then(async (admin: any) => {
      const token = jwt.sign({ adminId: admin.id }, SECRET_KEY, {
        expiresIn: '24h',
      });
      return formatAPIResponse(response, {
        status: 200,
        message: 'Admin connecté avec succès',
        datas: {
          admin,
          token,
        },
      });
    })
    .catch((err: GeneralException) => {
      return formatAPIResponse(response, {
        status: err.status || 400,
        error: err,
      });
    });
};

module.exports = {
  login,
  inscription,
  loginAdmin,
};