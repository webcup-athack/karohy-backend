import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema(
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
    phone_number: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'admin',
  },
);

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
