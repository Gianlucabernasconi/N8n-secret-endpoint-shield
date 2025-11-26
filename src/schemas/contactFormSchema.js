const Joi = require('joi');

const contactFormSchema = Joi.object({
    // --- CAMPOS VALIDADOS CON VUELIDATE (Deben ser replicados) ---

    // Dimensiones (Alto, Ancho, Profundidad)
    alto: Joi.number().strict().min(1).max(300).required().messages({
        'any.required': 'El alto es obligatorio.',
        'number.min': 'El mínimo permitido es 1 cm.',
        'number.max': 'El máximo permitido es 300 cm.',
        'number.base': 'Solo se permiten números.'
    }),
    ancho: Joi.number().strict().min(1).max(400).required().messages({
        'any.required': 'El ancho es obligatorio.',
        'number.min': 'El mínimo permitido es 1 cm.',
        'number.max': 'El máximo permitido es 400 cm.',
        'number.base': 'Solo se permiten números.'
    }),
    profundidad: Joi.number().strict().min(1).max(400).required().messages({
        'any.required': 'La profundidad es obligatoria.',
        'number.min': 'El mínimo permitido es 1 cm.',
        'number.max': 'El máximo permitido es 400 cm.',
        'number.base': 'Solo se permiten números.'
    }),

    // Contacto (Nombre, Apellido, Email)
    nombre: Joi.string().trim().min(2).max(40).required().messages({
        'any.required': 'El nombre es obligatorio.',
        'string.min': 'Debe contener como mínimo dos letras.',
        'string.max': 'El largo máximo permitido son 40 caracteres.',
        'string.base': 'Solo se permiten textos.'
    }),
    apellido: Joi.string().trim().min(2).max(40).required().messages({
        'any.required': 'El apellido es obligatorio.',
        'string.min': 'Debe contener como mínimo dos letras.',
        'string.max': 'El largo máximo permitido son 40 caracteres.',
        'string.base': 'Solo se permiten textos.'
    }),
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        'any.required': 'El correo es obligatorio.',
        'string.email': 'Formato de correo inválido.',
        'string.base': 'Solo se permiten textos.'
    }),

    // Cantidad de Unidades
    cantidaddeunidades: Joi.number().strict().min(1).max(10).required().messages({
        'any.required': 'La cantidad es obligatoria.',
        'number.min': 'El mínimo es 1 unidad.',
        'number.max': 'El máximo es 10 unidades.',
        'number.base': 'Solo se permiten números.'
    }),

    // CAMPOS SIN VALIDACIÓN DE REGLAS 

    // Campos select 
    tipodemueble: Joi.string().required(),
    tipodemadera: Joi.string().required(),
    niveldecomplejidad: Joi.string().required(),
    terminacion: Joi.string().required(),
    usoprevisto: Joi.string().required(),
    urgenciadeentrega: Joi.string().required(),
    requieredespacho: Joi.string().valid('si', 'no').required(),

    // Campos condicionales y de texto 
    comunadedespacho: Joi.string().when('requieredespacho', {
        is: 'si',
        then: Joi.string().required().messages({ 'any.required': 'La comuna de despacho es obligatoria si se requiere despacho.' }),
        otherwise: Joi.string().allow('').optional()
    }),
    observaciones: Joi.string().allow('').optional(), // Permitimos cadena vacía
});

module.exports = contactFormSchema;