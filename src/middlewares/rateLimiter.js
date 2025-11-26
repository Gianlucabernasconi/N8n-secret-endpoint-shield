const rateLimit = require('express-rate-limit');

// 5 peticiones por direccion ip en un lapso de 5 minutos
const formLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 5,
    message: 'Demasiados intentos. Por favor, intenta de nuevo más tarde.'
});

module.exports = formLimiter;
