# Documentation - mongodb.databaseconnector.js

Ce fichier définit un module qui permet d'établir une connexion à une base de données MongoDB en utilisant la bibliothèque **mongoose**.

## Fonctionnalité

Ce module expose une fonction :

### `connectDB()`

Établit une connexion à la base de données MongoDB en utilisant l'URI fourni dans la variable d'environnement `DB_STRING`. Cette fonction configure la connexion avec les options `useUnifiedTopology` et `useNewUrlParser` pour assurer une connexion stable et actuelle.

## Fonctions Exposées

- **`connectDB()`** : Établit la connexion à la base de données MongoDB.

  - **Paramètres** :
    Aucun paramètre requis.

  - **Retour** :
    Aucune valeur de retour explicite.

  - **Configuration Requise** :
    Assurez-vous d'avoir configuré l'URI de la base de données MongoDB dans votre fichier `.env` :

    ```dotenv
    DB_STRING=mongodb://user:password@hostname:port/database
    ```

    Si vous travaillez en local (localhost), vous pouvez définir l'URI directement dans le fichier `mongodb.databaseconnector.js` :

    ```javascript
    const URI = 'mongodb://user:pass@hostname:27017/';
    ```

    Veillez à utiliser l'URI approprié pour votre propre configuration.
    

  - **Exemple d'utilisation**:

    ```JS
        // Importez le module de connexion à la base de données
        const mongodbCon = require('./mongodb.databaseconnector');

        // Appelez la fonction pour établir la connexion à la base de données
        mongodbCon.connectDB();
    ```

- **`closeConnection()`**: Ferme la connexion à la base de données MongoDB.
  - **Paramètres** :
    Aucun paramètre requis.

  - **Retour** :
    Aucune valeur de retour explicite.

  - **Configuration Requise** :
    Assurez-vous d'avoir configuré l'URI de la base de données MongoDB dans votre fichier `.env` :

    ```dotenv
    DB_STRING=mongodb://user:password@hostname:port/database
    ```

    Si vous travaillez en local (localhost), vous pouvez définir l'URI directement dans le fichier `mongodb.databaseconnector.js` :

    ```javascript
    const URI = 'mongodb://user:pass@hostname:27017/';
    ```

    Veillez à utiliser l'URI approprié pour votre propre configuration.
    

  - **Exemple d'utilisation**:

    ```JS
        // Importez le module de connexion à la base de données
        const mongodbCon = require('./mongodb.databaseconnector');

        // Appelez la fonction pour établir la connexion à la base de données
        mongodbCon.closeConnection();
    ```


## Remarque

Ce module simplifie l'établissement d'une connexion à la base de données MongoDB pour votre application Mongoose-Express. Assurez-vous d'appeler la fonction `connectDB()` au début de votre application pour garantir que la connexion est établie avant d'interagir avec la base de données.
