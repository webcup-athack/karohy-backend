const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
    {
        "nom": {
            type: String,
            required: true
        },
        "prenom": {
            type: String,
            default: ''
        },
        "email": {
            type: String,
            required: true,
            unique: true
        },
        "motDePasse": {
            type: String,
            required: true,
        },
        "numTelephone": {
            type: String,
            required: true,
        },
    },
    {
        collection: "admin"
    }
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;