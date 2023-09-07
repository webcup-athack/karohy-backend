import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    birth_date: {
      type: Date,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'user',
  },
);

const User = mongoose.model('User', userSchema);

// User.formatLoginUser = (user) => {
//   return {
//     _id: user._id,
//     firstname: user.prenom,
//     lastname: user.nom,
//     email: user.email,
//     birth_date: user.dateNaissance,
//     phone_number: user.numTelephone,
//   };
// };

// User.formatRegisterUser = (user) => {
//   return {
//     _id: user._id,
//     firstname: user.prenom,
//     lastname: user.nom,
//     email: user.email,
//     birth_date: user.dateNaissance,
//     phone_number: user.numTelephone,
//   };
// };

export default User;
