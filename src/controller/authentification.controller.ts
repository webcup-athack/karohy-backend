import { formatAPIResponse } from '../helper/api.helper';
import { authenticateUser, createUser } from '../service/user.service';
import { authenticateAdmin } from '../service/admin.service';

import { Request, Response } from 'express';
import GeneralException from '../utils/Error/GeneralException';

// Importing necessary libraries
import jwt from 'jsonwebtoken';
import { IAdmin, IUser } from '../types/types';

const SECRET_KEY = process.env.JWT_SECRET || 'test'; // Store this in a .env or another secure place

const login = async (request: Request, response: Response) => {
  const { email, password } = request.body;

  authenticateUser(email, password)
    .then(async (user: IUser | any) => {
      const token = jwt.sign({ userid: user._id }, SECRET_KEY, {
        expiresIn: '24h',
      });
      delete user.password;
      return formatAPIResponse(response, {
        status: 200,
        message: 'Successfully connected',
        datas: {
          user: user,
          token,
        },
      });
    })
    .catch((err: GeneralException) => {
      console.log('Error authentification controller login', err);
      return formatAPIResponse(response, {
        status: err.status || 400,
        error: err,
      });
    });
};

const inscription = (request: Request, response: Response) => {
  const { firstname, lastname, email, password, birth_date, phone_number } =
    request.body;

  const userData: IUser = {
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: password,
    birth_date: birth_date,
    phone_number: phone_number,
  };

  createUser(userData)
    .then((user: IUser | any) => {
      const token = jwt.sign({ userid: user._id }, SECRET_KEY, {
        expiresIn: '24h',
      }); // Generate the JWT token for the registered user
      delete user.password;
      return formatAPIResponse(response, {
        status: 200,
        message: 'Registered user successfully',
        datas: {
          user: user,
          token, // Include the token in the response
        },
      });
    })
    .catch((err: GeneralException) => {
      console.log('Error authentification controller register', err);
      return formatAPIResponse(response, {
        status: err.status || 400,
        error: err,
      });
    });
};

const loginAdmin = async (request: Request, response: Response) => {
  const { email, password } = request.body;

  authenticateAdmin(email, password)
    .then(async (admin: IAdmin | any) => {
      const token = jwt.sign({ adminId: admin._id }, SECRET_KEY, {
        expiresIn: '24h',
      });
      delete admin.password;
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

export { login, inscription, loginAdmin };
