const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getAllUsers, deleteUser, updateUser } = require('./../controller/userController')
const { getAllViajes, buscarViaje, crearViaje, crearViajeRedondo, buscarViajeRedondo } = require('./../controller/viajeController')
const authenticateToken = require('./../auth/authMiddleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/get-all-users',  getAllUsers)
router.delete('/users/:email', authenticateToken, deleteUser)
router.put('/users/:email', authenticateToken, updateUser)

router.post('/new-viaje-redondo', crearViajeRedondo)
router.get('/get-all-viajes', getAllViajes)
router.post('/buscar-viaje', buscarViaje )
router.post('/buscar-viaje-redondo', buscarViajeRedondo )
router.post('/new-viaje', crearViaje)

module.exports = router
