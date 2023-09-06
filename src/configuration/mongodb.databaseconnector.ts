import { ConnectOptions, connect, connection } from 'mongoose';

const URI =
  process.env.DB_STRING ||
  'mongodb+srv://tsanta:ETU001146@cluster0.6oftdrm.mongodb.net/karohy?retryWrites=true&w=majority'; // Setted in your .env file
console.log(process.env.DB_STRING);

// if localhost : const URI = 'mongodb://user:pass@hostname:27017/'

const connectDB = async () => {
  await connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    dbName: process.env.DB_NAME || 'test',
  } as ConnectOptions);
  console.log('db connected successfully : ', process.env.DB_NAME);
};

const closeConnexion = async () => connection.close();

export { connectDB, closeConnexion };
