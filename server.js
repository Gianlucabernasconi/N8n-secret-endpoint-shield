const express = require('express');
const cors = require('cors');
require('dotenv').config();


const helmet = require('helmet');
const webhookRoutes = require('./src/routes/webhookRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

//Config de Middleware
app.use(helmet()); // Headers de seguridad HTTP
app.use(express.json({ limit: '10kb' })); // Limitar tamaño del body para evitar DoS
app.use(cors({
    origin: process.env.FRONTEND_URL || '*' // Restringir origen en producción
}));
app.set('trust proxy', 1); //Necesario para railway/render y RateLimiter

//Conectar el Router
//Todas las rutas definidas en webhookROutes comenzaran con /api
app.use('/api', webhookRoutes);

//Inicializacion
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


