# Documentation - authentication.controller.js

Ce fichier contient les fonctions de contrôleur pour la gestion de l'authentification des utilisateurs.


## Table des matières

- [login(request, response)](#loginrequest-response)
- [inscription(request, response)](#inscriptionrequest-response)
- [checkUsername(request, response)](#checkusernamerequest-response)
- [checkEmail(request, response)](#checkemailrequest-response)

<br><hr><br>

## Fonctionnalités

### `login(request, response)`

Authentifie un utilisateur en vérifiant les informations d'identification fournies (email et mot de passe) par le biais du service `utilisateurService.authentifierUtilisateur`. Si l'authentification réussit, renvoie un code de statut 200 avec un message de réussite et les données de l'utilisateur. Sinon, renvoie un code de statut 401 avec un message d'erreur.

- **Paramètres** :
  - `request` : L'objet de requête Express.
  - `response` : L'objet de réponse Express.
<br/><br/>
<hr/>

### `inscription(request, response)`

Inscrit un nouvel utilisateur en vérifiant les informations fournies (nom, prénom, date de naissance, nom d'utilisateur, email, mot de passe, image de profil) via le service `utilisateurService.creerUtilisateur`. Effectue diverses vérifications, telles que la disponibilité de l'email et du nom d'utilisateur, avant de procéder à l'inscription.

- **Paramètres** :
  - `request` : L'objet de requête Express.
  - `response` : L'objet de réponse Express.
<br/><br/>
<hr/>

## Remarque

- Ces fonctions de contrôleur sont utilisées pour gérer les opérations d'authentification des utilisateurs. Elles appellent divers services du module `utilisateurService` pour effectuer des vérifications et des actions spécifiques.

En utilisant ces fonctions de contrôleur, vous pouvez gérer l'authentification et l'inscription des utilisateurs dans votre application.
