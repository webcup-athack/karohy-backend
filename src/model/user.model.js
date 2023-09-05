const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    prenom: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    motDePasse: {
      type: String,
      required: true,
    },
    dateNaissance: {
      type: Date,
      required: true,
    },
    numTelephone: {
      type: String,
      required: true,
    },
    // "numMobileMoney": {
    //     type: String,
    //     required: true
    // },
  },
  {
    collection: 'user',
  },
);

const User = mongoose.model('User', userSchema);

User.formatLoginUser = (user) => {
  return {
    _id: user._id,
    firstname: user.prenom,
    lastname: user.nom,
    email: user.email,
    birth_date: user.dateNaissance,
    phone_number: user.numTelephone,
  };
};

User.formatRegisterUser = (user) => {
  return {
    _id: user._id,
    firstname: user.prenom,
    lastname: user.nom,
    email: user.email,
    birth_date: user.dateNaissance,
    phone_number: user.numTelephone,
  };
};

module.exports = User;
