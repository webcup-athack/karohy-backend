# Documentation - Modèle Admin

Ce fichier définit le modèle de données pour les administrateurs de l'application.

## Modèle Utilisateur

Le modèle `Admin` représente les données d'un administrateur dans l'application. Il contient les champs suivants :

- `nom` : Le nom de l'administrateur.
- `prenom` : Le prénom de l'administrateur (par défaut vide).
- `datenaissance` : La date de naissance de l'administrateur.
- `email` : L'adresse e-mail de l'administrateur.
- `password` : Le mot de passe de l'administrateur.

Le modèle est défini à l'aide de `mongoose.Schema` avec les spécifications des types de données et des options de collection.

## Utilisation

Exemple d'utilisation pour créer un nouvel utilisateur en utilisant le modèle :

```javascript
const mongoose = require('mongoose');
const admin = require('./chemin/vers/admin.model');

// Créer un nouvel User
const nouvelAdmin = new Admin({
    nom: 'Doe',
    prenom: 'John',
    dateNaissance: new Date('1990-01-15'),
    email: 'john@example.com',
    motDePasse: 'motdepasse',

});

// Enregistrer l'User dans la base de données
nouvelAdmin.save()
    .then(() => {
        console.log('User enregistré avec succès');
    })
    .catch((error) => {
        console.error('Erreur lors de l\'enregistrement de l\'Admin :', error);
    });
```
