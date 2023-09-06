"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomString = exports.checkEmailFormat = exports.normalizeString = void 0;
function normalizeString(str) {
    // Changement en minuscule
    str = str.toLowerCase();
    // Supprimer les caractères spéciaux et les accents
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    // Remplacer les espaces par des tirets
    str = str.replace(/\s+/g, '-');
    // Supprimer tous les caractères non alphabétiques et non numériques
    str = str.replace(/[^a-zA-Z0-9-]/g, '');
    str = str.replace(/-+/g, '-');
    return str;
}
exports.normalizeString = normalizeString;
function checkEmailFormat(email) {
    // Expression régulière pour vérifier le format de l'e-mail
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Vérifier si l'e-mail correspond au format valide
    return emailRegex.test(email);
}
exports.checkEmailFormat = checkEmailFormat;
function generateRandomString(length) {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}
exports.generateRandomString = generateRandomString;
