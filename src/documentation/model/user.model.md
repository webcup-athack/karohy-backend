# Documentation - Modèle Utilisateur

Ce fichier définit le modèle de données pour les utilisateurs de l'application.

## Modèle Utilisateur

Le modèle `Utilisateur` représente les données d'un utilisateur dans l'application. Il contient les champs suivants :

- `nom` : Le nom de l'utilisateur.
- `prenom` : Le prénom de l'utilisateur (par défaut vide).
- `datenaissance` : La date de naissance de l'utilisateur.
- `username` : Le nom d'utilisateur de l'utilisateur.
- `email` : L'adresse e-mail de l'utilisateur.
- `password` : Le mot de passe de l'utilisateur.
- `profilepicture` : Le chemin vers l'image de profil de l'utilisateur (par défaut 'default-avatar.png').
- `datecreation` : La date de création du compte de l'utilisateur (par défaut à la date actuelle).
- `typeCompte` : Le type de compte de l'utilisateur (par défaut 'user').

Le modèle est défini à l'aide de `mongoose.Schema` avec les spécifications des types de données et des options de collection.

## Utilisation

Exemple d'utilisation pour créer un nouvel utilisateur en utilisant le modèle :

```javascript
const mongoose = require('mongoose');
const User = require('./chemin/vers/user.model');

// Créer un nouvel User
const nouvelUser = new User({
    nom: 'Doe',
    prenom: 'John',
    dateNaissance: new Date('1990-01-15'),
    email: 'john@example.com',
    motDePasse: 'motdepasse',
    numMobileMoney: '0332212345',
    numTelephone:'0332212345'

});

// Enregistrer l'User dans la base de données
nouvelUser.save()
    .then(() => {
        console.log('User enregistré avec succès');
    })
    .catch((error) => {
        console.error('Erreur lors de l\'enregistrement de l\'User :', error);
    });
```
