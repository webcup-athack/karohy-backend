import { expect } from 'chai';
import { createUser, authenticateUser } from '../../service/user.service';

import { config } from 'dotenv';
config();

import {
  connectDB,
  closeConnexion,
} from '../../configuration/mongodb.databaseconnector';

import { generateRandomString } from '../../helper/string.helper';
import User from '../../model/user.model';
import { ERROR } from '../../error/Error';
import { IUser } from '../../types/app';

describe('User Service', () => {
  before(async () => {
    await connectDB();
  });

  after(async () => {
    await closeConnexion();
  });

  describe('authenticateUser', () => {
    const testEmail = `karohy${generateRandomString(4)}@karohy.mg`;
    const testMdp = generateRandomString(8);

    const userTest: IUser = {
      firstname: generateRandomString(10),
      lastname: generateRandomString(20),
      email: testEmail,
      password: testMdp,
      birthdate: Date.now(),
      phoneNumber: '+261332212345',
    };

    before(async () => {
      try {
        await createUser(userTest);
      } catch (err) {
        console.error(err);
      }
    });

    it('should authenticate a user with valid email and password', async () => {
      const user = await authenticateUser(testEmail, testMdp) as IUser;
      expect(user).to.exist;
      expect(user.email).to.equal(userTest.email);
    });

    it('should throw GeneralException with ERROR_INVALID_EMAIL for invalid email', async () => {
      const invalidEmail = 'invalidemail';
      const password = 'somepassword';

      try {
        await authenticateUser(invalidEmail, password);
      } catch (error: any) {
        expect(error.code).to.equal(ERROR.AUTHENTICATION.INVALID_EMAIL.code);
        expect(error.message).to.equal(
          ERROR.AUTHENTICATION.INVALID_EMAIL.message,
        );
      }
    });

    it('should throw GeneralException with ERROR_INVALID_PASSWORD for empty password', async () => {
      const email = 'validuser@example.com';
      const emptyPassword = '';

      try {
        await authenticateUser(email, emptyPassword);
      } catch (error: any) {
        expect(error.code).to.equal(ERROR.AUTHENTICATION.INVALID_PASSWORD.code);
        expect(error.message).to.equal(
          ERROR.AUTHENTICATION.INVALID_PASSWORD.message,
        );
      }
    });

    it('should throw GeneralException with ERROR_INVALID_CREDENTIALS for invalid credentials', async () => {
      const invalidUser = {
        email: `invalid${userTest.email}`,
        motDePasse: 'invalidpassword',
      };

      try {
        await authenticateUser(invalidUser.email, invalidUser.motDePasse);
      } catch (error: any) {
        expect(error.code).to.equal(
          ERROR.AUTHENTICATION.INVALID_CREDENTIALS.code,
        );
        expect(error.message).to.contain(
          ERROR.AUTHENTICATION.INVALID_CREDENTIALS.message,
        );
      }
    });

    after(async () => {
      try {
        await User.deleteOne({ email: userTest.email });
      } catch (err) {
        console.error(err);
      }
    });
  });

  describe('createUser', () => {
    const testEmail = `karohy${generateRandomString(4)}@karohy.mg`;
    const testMdp = generateRandomString(8);
    const userTest: IUser = {
      firstname: generateRandomString(10),
      lastname: generateRandomString(20),
      email: testEmail,
      password: testMdp,
      birthdate: Date.now(),
      phoneNumber: '+261332212345',
    };

    it('should create a new user with valid data', async () => {
      const userNew = await createUser(userTest) as IUser;
      expect(userNew).to.exist;
      expect(userNew.lastname).to.equal(userTest.lastname);
      expect(userNew.email).to.equal(userTest.email);
    });

    it('should throw GeneralException with EMAIL_ALREADY_EXISTS for invalid user data', async () => {
      try {
        await createUser(userTest);
      } catch (error: any) {
        expect(error.code).to.equal(
          ERROR.AUTHENTICATION.EMAIL_ALREADY_EXISTS.code,
        );
      }
    });

    after(async () => {
      // Supprime l'utilisateur de test après chaque test de createUser
      await User.deleteOne({ email: userTest.email });
    });
  });
});
