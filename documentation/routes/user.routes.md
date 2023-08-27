# Documentation - user.routes.js

Ce fichier définit les routes liées à l'authentification et à l'inscription des utilisateurs.

## Routes Utilisateur

Le fichier `user.routes.js` gère les points d'extrémité (endpoints) liés aux fonctionnalités d'authentification et d'inscription des utilisateurs.

- **GET /users** : Renvoie une réponse avec le texte "respond with a resource". Cela peut être utilisé comme point d'extrémité de test.

- **POST /users/login** : Endpoint pour l'authentification (login) d'un utilisateur en appelant la fonction `authenticationController.login`.

- **POST /users/inscription** : Endpoint pour l'inscription d'un nouvel utilisateur en appelant la fonction `authenticationController.inscription`.

- **GET /users/check-username/:username** : Endpoint pour vérifier si un nom d'utilisateur est disponible en appelant la fonction `authenticationController.checkUsername`.

- **GET /users/check-email/:email** : Endpoint pour vérifier si une adresse e-mail est disponible en appelant la fonction `authenticationController.checkEmail`.

## Utilisation

Exemple d'utilisation pour utiliser les routes dans votre application Express :

```javascript
const express = require('express');
const app = express();
const userRoutes = require('./chemin/vers/user.routes');

// Utiliser les routes utilisateur
app.use('/users', userRoutes);

// ...
