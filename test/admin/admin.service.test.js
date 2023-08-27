const { expect } = require('chai');

const GeneralException = require('../../utils/Error/GeneralException'); // Chemin vers votre classe d'exception
const connectorMongodb = require('../../configuration/mongodb.databaseconnector'); // Chemin vers votre fichier de connexion à la base de données
const { generateRandomString } = require('../../helper/string.helper');
const Admin = require('../../model/admin.model');
const { authenticateAdmin } = require('../../service/admin.service');


require('dotenv').config();

describe('Admin Service', () => {

    before(async () => {
        await connectorMongodb.connectDB();
    });

    after(async () => {
        await connectorMongodb.closeConnexion();
    });

    describe('authenticate Admin', () => {
        const userTest = {
            nom: generateRandomString(10),
            prenom: generateRandomString(20),
            email: `karohy${generateRandomString(4)}@karohy.mg`,
            motDePasse: generateRandomString(8),
            numTelephone: "+261332212345"
        };

        before(async () => {
            try {
                const admin = new Admin(userTest);
                await admin.save();
            } catch (err) {
                console.error(err);
            }
        });

        

        it('should authenticate a admin with valid email and password', async () => {
            try {
                const user = await authenticateAdmin(userTest.email, userTest.motDePasse);
                expect(user).to.exist;
                expect(user.email).to.equal(userTest.email);
            } catch (error) {
                // Si une exception est levée, ce test échouera
                throw error;
            }
        });
    
        it('should throw GeneralException with ERROR_INPUT_INVALID for invalid email', async () => {
            const invalidEmail = 'invalidemail';
            const password = 'somepassword';
          
            try {
                await authenticateAdmin(invalidEmail, password);
            } catch (error) {
                expect(error).to.be.instanceOf(GeneralException);
                expect(error.code).to.equal('ERROR_INPUT_INVALID');
                expect(error.message).to.equal('Invalid email');
            }
        });
    
        it('should throw GeneralException with ERROR_INPUT_INVALID for empty password', async () => {
            const email = 'validuser@example.com';
            const emptyPassword = '';
          
            try {
                await authenticateAdmin(email, emptyPassword);
            } catch (error) {
                expect(error).to.be.instanceOf(GeneralException);
                expect(error.code).to.equal('ERROR_INPUT_INVALID');
                expect(error.message).to.equal('Invalid password');
            }
        });
    
        it('should throw GeneralException with ERROR_AUTH_ADMIN_DENIED for invalid credentials', async () => {
            const invalidUser = {
                email: `invalid${userTest.email}`,
                motDePasse: 'invalidpassword'
              };
            
            try {
                await authenticateAdmin(invalidUser.email, invalidUser.motDePasse);
            } catch (error) {
                expect(error).to.be.instanceOf(GeneralException);
                expect(error.code).to.equal('ERROR_AUTH_ADMIN_DENIED');
                expect(error.message).to.contain('Authentication failed');
            }
        });

        after(async () => {
            try {
                await Admin.deleteOne({ nom: userTest.nom});
            } catch (err) {
                console.error(err);
            } 
        });
    });

});