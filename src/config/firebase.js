const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey.json')
process.env.TZ = 'America/Mexico_City';

// Inicializar firebase-admin.
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

module.exports = admin