# Documentation - string.helper.js

Ce fichier contient des fonctions utilitaires pour normaliser les chaînes de caractères et vérifier le format des adresses e-mail.

## Table des matières

- [normalizeString(str)](#normalizestringstr)
- [checkEmailFormat(email)](#checkemailformatemail)


## Fonctionnalités

### `normalizeString(str)`

Normalise une chaîne de caractères en effectuant les opérations suivantes :

1. Convertit la chaîne en minuscules.
2. Supprime les caractères spéciaux, les accents et les espaces.
3. Remplace les espaces par des tirets.
4. Supprime tous les caractères non alphabétiques, non numériques et non tirets.
5. Supprime les tirets consécutifs.

- **Paramètres** :
  - `str` : La chaîne de caractères à normaliser.

- **Retour** :
  La chaîne de caractères normalisée.

### `checkEmailFormat(email)`

Vérifie si une adresse e-mail est au format valide en utilisant une expression régulière.

- **Paramètres** :
  - `email` : L'adresse e-mail à vérifier.

- **Retour** :
  `true` si l'adresse e-mail est au format valide, sinon `false`.


<br>

# Remarque
Ces fonctions aident à normaliser les données entrantes et à garantir la conformité avec les formats attendus. Utilisez-les pour améliorer la cohérence des données dans votre application.