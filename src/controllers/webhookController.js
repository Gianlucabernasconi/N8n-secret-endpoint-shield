const axios = require('axios');
const contactFormSchema = require('../schemas/contactFormSchema');

//Esta funcion llama al webhook de n8n
exports.sendFormData = async (req, res) => {


    //Validacion de contenido
    const { error, value: validatedData } = contactFormSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
    });

    if (error) {
        //Si la validacion falla la ejecucion se detiene aqui
        return res.status(400).json({
            success: false,
            message: 'Error de validacion',
            details: error.details,
        });
    }

    //PROXY SEGURO: Si la validación es OK, enviamos la petición a N8n
    try {

        const webhookUrl = process.env.WEBHOOK_N8N_URL;
        // El servidor Express hace la llamada a N8n
        await axios.post(webhookUrl, validatedData);

        // RESPUESTA: Enviamos éxito a Vue
        res.status(200).json({
            success: true,
            message: 'Formulario enviado correctamente',
        });


    } catch (error) {
        console.error('Error al enviar el formulario:', error);
        res.status(500).json({
            success: false,
            message: 'Error al enviar el formulario',
        });
    }

}