const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Intentando conectar a MongoDB...');
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error de Conexión: ${error.message}`);
    console.log('El servidor seguirá funcionando, pero las funciones de base de datos no estarán disponibles.');
  }
};

module.exports = connectDB;
