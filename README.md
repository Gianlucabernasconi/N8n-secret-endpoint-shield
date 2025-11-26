# N8n Form Backend

Este es un servicio backend ligero y seguro construido con Node.js y Express. Su función principal es actuar como un intermediario entre un formulario de contacto en el frontend y un flujo de automatización en N8n.

El servicio recibe los datos del formulario, los valida estrictamente para asegurar la integridad de los datos, aplica medidas de seguridad avanzadas y luego los reenvía a un webhook de N8n para su procesamiento.

## 🚀 Características

- **Validación Robusta**: Utiliza `Joi` para validar todos los campos entrantes (tipos de datos, rangos numéricos, formatos de email, etc.).
- **Seguridad Avanzada (Helmet)**: Protege la aplicación configurando cabeceras HTTP seguras automáticamente.
- **Protección DoS**: Limita el tamaño del payload JSON a 10kb para prevenir ataques de denegación de servicio.
- **Rate Limiting**: Protege contra ataques de fuerza bruta y spam limitando las peticiones a 5 por cada 5 minutos por IP.
- **CORS Dinámico**: Configurable mediante variables de entorno para restringir el acceso solo a tu dominio frontend en producción.
- **Proxy Seguro**: Oculta la URL real del webhook de N8n al frontend.

## 🛠️ Tecnologías

- **Node.js**
- **Express**
- **Helmet** (Seguridad HTTP)
- **Joi** (Validación de esquemas)
- **Axios** (Peticiones HTTP)
- **Express Rate Limit**

## 📋 Requisitos Previos

- Node.js (v14 o superior recomendado)
- NPM

## 🔧 Instalación y Configuración

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd N8n_Form_Backend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar Variables de Entorno**
   Crea un archivo `.env` en la raíz del proyecto basándote en el siguiente ejemplo:

   ```env
   PORT=3000
   WEBHOOK_N8N_URL=https://tu-instancia-n8n.com/webhook/tu-uuid
   FRONTEND_URL=https://tu-sitio-web.com
   ```
   > **Nota sobre `FRONTEND_URL`**: Si no se define, el servidor aceptará peticiones de cualquier origen (`*`), lo cual es útil para desarrollo pero no recomendado para producción.

## ▶️ Ejecución

**Modo Producción:**
```bash
npm start
```
El servidor se iniciará en `http://localhost:3000` (o el puerto que hayas definido).

## 📡 API Endpoints

### Enviar Formulario
**POST** `/api/contact-form`

Recibe los datos del formulario de contacto.

**Cuerpo de la Petición (JSON Example):**
```json
{
  "alto": 150,
  "ancho": 200,
  "profundidad": 60,
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan@ejemplo.com",
  "cantidaddeunidades": 2,
  "tipodemueble": "Mesa",
  "tipodemadera": "Roble",
  "niveldecomplejidad": "Medio",
  "terminacion": "Barniz",
  "usoprevisto": "Comedor",
  "urgenciadeentrega": "Normal",
  "requieredespacho": "si",
  "comunadedespacho": "Providencia",
  "observaciones": "Sin observaciones"
}
```

**Respuestas:**

- **200 OK**: Formulario enviado y procesado correctamente por N8n.
- **400 Bad Request**: Error de validación (datos faltantes o incorrectos).
- **429 Too Many Requests**: Límite de peticiones excedido.
- **500 Internal Server Error**: Error al conectar con N8n.

## 🌍 Despliegue (Render/Railway)

Este proyecto está configurado para ser desplegado fácilmente.

1. Sube el código a GitHub/GitLab.
2. Conecta el repositorio a Render o Railway.
3. **Variables de Entorno**: Configura las siguientes variables en el panel de control de tu proveedor:
   - `WEBHOOK_N8N_URL`: La URL de tu webhook de N8n.
   - `FRONTEND_URL`: La URL de tu sitio web (ej: `https://mi-sitio.netlify.app`).
4. El comando de inicio `npm start` será detectado automáticamente.
