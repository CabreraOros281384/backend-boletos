const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
//const jwt = require('jsonwebtoken')


//Rutas que vamos a usar 
const auth = require('./routes/auth')
const user = require('./routes/users')

//Declarar variable para el servidor web
const app = express()

//Middleware
app.use(cors())
app.use(bodyParser.json)

//Decirle a la solucion las rutas 
app.use('api/auth', auth)
//app.use('api/users', users)

const PORT = process.env.PORT || 3010
app.listen(PORT, () => {
    console.log( `Listen Port: ${PORT}`)
})

