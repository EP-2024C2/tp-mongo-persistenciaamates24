const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/gestionProductos';

async function connectToDatabase() {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(MONGO_URL);
        console.log('Conexión a MongoDB exitosa');
    } catch (error) {
        console.error('Error al conectarse a MongoDB', error);
    }
}

module.exports = connectToDatabase;