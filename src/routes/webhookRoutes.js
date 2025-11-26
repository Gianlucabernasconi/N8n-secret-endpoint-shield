const express = require('express');
const router = express.Router();
const formLimiter = require('../middlewares/rateLimiter');
const webhookController = require('../controllers/webhookController');


// Definimos la ruta POST:
// Cuando Vue llama a /api/contact-form:
router.post('/contact-form',
    formLimiter, // Primero, se revisa que no haya spam (Rate Limiter)
    webhookController.sendFormData // Luego, se ejecuta la lógica de validación y envío (Controller)
);

module.exports = router;