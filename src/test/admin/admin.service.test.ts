require('dotenv').config();
import { expect } from 'chai';

import {
  connectDB,
  closeConnexion,
} from '../../configuration/mongodb.databaseconnector';
const { generateRandomString } = require('../../helper/string.helper');
const Admin = require('../../model/admin.model');
const { ERROR } = require('../../error/Error');
import bcrypt from 'bcrypt';

const { authenticateAdmin } = require('../../service/admin.service');

describe('Admin Service', () => {
  before(async () => {
    await connectDB();
  });

  after(async () => {
    await closeConnexion();
  });

  describe('authenticate Admin', () => {
    const testEmail = `karohy${generateRandomString(4)}@karohy.mg`;
    const testMdp = generateRandomString(8);

    const userTest = {
      nom: generateRandomString(10),
      prenom: generateRandomString(20),
      email: testEmail,
      motDePasse: testMdp,
      numTelephone: '+261332212345',
    };

    before(async () => {
      try {
        bcrypt.hash(testMdp, 10, async (err, hashed) => {
          const admin = new Admin({
            ...userTest,
            motDePasse: hashed,
          });
          await admin.save();
        });
      } catch (err) {
        console.error(err);
      }
    });

    it('should authenticate an admin with valid email and password', async () => {
      try {
        const user = await authenticateAdmin(testEmail, testMdp);
        expect(user).to.exist;
        expect(user.email).to.equal(userTest.email);
      } catch (error) {
        // Si une exception est levée, ce test échouera
        throw error;
      }
    });

    it('should throw GeneralException with ERROR_INVALID_EMAIL for invalid email', async () => {
      const invalidEmail = 'invalidemail';
      const password = 'somepassword';

      try {
        await authenticateAdmin(invalidEmail, password);
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
        await authenticateAdmin(email, emptyPassword);
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
        await authenticateAdmin(invalidUser.email, invalidUser.motDePasse);
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
        await Admin.deleteOne({ nom: userTest.nom });
      } catch (err) {
        console.error(err);
      }
    });
  });
});
