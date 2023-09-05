# Documentation - utilisateur.service.js

Ce fichier contient les fonctions de service pour gérer les opérations liées aux utilisateurs de l'application.

## Table des Matières
- [Fonctions de Service Utilisateur](#fonctions-de-service-utilisateur)
  - [creerUtilisateur(nom, prenom, datenaissance, username, email, password, profilepicture)](#creerutilisateurnom-prenom-datenaissance-username-email-password-profilepicture)
  - [genererUsernameSuggere(nom, prenom, usernameDonne)](#genererusernamesuggere-nom-prenom-usernamedonne)
  - [getUtilisateurParId(userId)](#getutilisateurpariduserid)
  - [getUtilisateurParUsername(username)](#getutilisateurparusernameusername)
  - [authentifierUtilisateur(email, password)](#authentifierutilisateuremail-password)
  - [getUtilisateurParEmail(email)](#getutilisateurparemailemail)
- [Utilisation](#utilisation)


## Fonctions de Service Utilisateur
### `authenticateUser(email, password)`

Authentifie un utilisateur par son adresse e-mail et son mot de passe.

- **Paramètres** :
  - `email` : L'adresse e-mail de l'utilisateur.
  - `password` : Le mot de passe de l'utilisateur.

- **Retour** :
  L'objet utilisateur correspondant à l'adresse e-mail et au mot de passe fournis, avec le champ de mot de passe masqué.

### `createUser(data: User)`

Authentifie un utilisateur par son adresse e-mail et son mot de passe.

- **Paramètres** :
  - `email` : L'adresse e-mail de l'utilisateur.
  - `password` : Le mot de passe de l'utilisateur.

- **Retour** :
  L'objet utilisateur correspondant à l'adresse e-mail et au mot de passe fournis, avec le champ de mot de passe masqué.




## Utilisation

Exemple d'utilisation des fonctions du service utilisateur dans le fichier `authentication.controller.js` :

```javascript
const userService = require('../services/user.service');

// ...

const login = (request, response) => {
    const { email, password } = request.body;

    // Appeler la fonction pour authentifier l'user
    userService.authentifieruser(email, password)
        .then((user) => {
            if (user) {
                // L'user est authentifié avec succès
                response.status(200).json({
                    success: true,
                    message: "Authentification réussie",
                    data: user,
                });
            } else {
                // L'user n'a pas pu être authentifié
                response.status(401).json({
                    success: false,
                    message: "Nom d'utilisateur ou mot de passe incorrect",
                });
            }
        })
        .catch((err) => {
            // Une erreur s'est produite lors de l'authentification
            console.log("error", err);
            response.status(500).json({
                success: false,
                message: "Une erreur s'est produite lors de l'authentification",
                reason: err
            });

        });
};

```