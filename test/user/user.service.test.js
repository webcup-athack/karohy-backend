const { expect } = require('chai');
const { authenticateUser, createUser } = require('../../service/user.service'); // Chemin vers votre fichier user.service
const GeneralException = require('../../utils/Error/GeneralException'); // Chemin vers votre classe d'exception
const connectorMongodb = require('../../configuration/mongodb.databaseconnector'); // Chemin vers votre fichier de connexion à la base de données
const { generateRandomString } = require('../../helper/string.helper');
const User = require('../../model/user.model');

require('dotenv').config();

describe('User Service', () => {

    before(async () => {
        await connectorMongodb.connectDB();
    });

    after(async () => {
        await connectorMongodb.closeConnexion();
    });

    describe('authenticateUser', () => {
        const userTest = {
            nom: generateRandomString(10),
            prenom: generateRandomString(20),
            email: `karohy${generateRandomString(4)}@karohy.mg`,
            motDePasse: generateRandomString(8),
            dateNaissance: Date.now(),
            numMobileMoney: "+261332212345",
            numTelephone: "+261332212345"
        };

        before(async () => {
            try {
                await createUser(userTest);
            } catch (err) {
                console.error(err);
            }
        });

        

        it('should authenticate a user with valid email and password', async () => {
            try {
                const user = await authenticateUser(userTest.email, userTest.motDePasse);
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
                await authenticateUser(invalidEmail, password);
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
                await authenticateUser(email, emptyPassword);
            } catch (error) {
                expect(error).to.be.instanceOf(GeneralException);
                expect(error.code).to.equal('ERROR_INPUT_INVALID');
                expect(error.message).to.equal('Invalid password');
            }
        });
    
        it('should throw GeneralException with ERROR_AUTH_USER_DENIED for invalid credentials', async () => {
            const invalidUser = {
                email: `invalid${userTest.email}`,
                motDePasse: 'invalidpassword'
              };
            
            try {
                await authenticateUser(invalidUser.email, invalidUser.motDePasse);
            } catch (error) {
                expect(error).to.be.instanceOf(GeneralException);
                expect(error.code).to.equal('ERROR_AUTH_USER_DENIED');
                expect(error.message).to.contain('Authentication failed');
            }
        });

        after(async () => {
            try {
                await User.deleteOne({ nom: userTest.nom});
            } catch (err) {
                console.error(err);
            } 
        });
    });

    describe('createUser', () => {
        const userTest = {
            nom: generateRandomString(10),
            prenom: generateRandomString(20),
            email: `karohy${generateRandomString(4)}@karohy.mg`,
            motDePasse: generateRandomString(8),
            dateNaissance: Date.now(),
            numMobileMoney: "+261332212345",
            numTelephone: "+261332212345"
        };
        it('should create a new user with valid data', async () => {
            try {
                const userNew = await createUser(userTest);
                expect(userNew).to.exist;
                expect(userNew.nom).to.equal(userTest.nom);
                expect(userNew.email).to.equal(userTest.email);
            } catch (err) {
                throw err;
            }
            
        });
    
        it('should throw GeneralException with ERROR_SIGNIN_USER_ALREADY_EXIST for invalid user data', async () => {
            try {
                await createUser(userTest);
            } catch (error) {
                expect(error).to.be.instanceOf(GeneralException);
                expect(error.code).to.equal('ERROR_SIGNIN_USER_ALREADY_EXIST');
            }
        });

        after(async () => {
            // Supprime l'utilisateur de test après chaque test de createUser
            await User.deleteOne({ nom: userTest.nom });
        });
        
    });
});
