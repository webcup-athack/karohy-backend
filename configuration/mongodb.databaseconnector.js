const mongoose = require('mongoose')

const URI = process.env.DB_STRING || "mongodb+srv://tsanta:ETU001146@cluster0.6oftdrm.mongodb.net/karohy?retryWrites=true&w=majority"; // Setted in your .env file
console.log(process.env.DB_STRING)

//if localhost : const URI = 'mongodb://user:pass@hostname:27017/'

const connectDB = async() =>{
    await mongoose.connect(URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        dbName: 'database'
    });
    console.log('db connected successfully')
}

const closeConnexion = async() => mongoose.connection.close();

module.exports = {
    connectDB: connectDB,
    closeConnexion: closeConnexion
}