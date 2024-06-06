const jwt = require('jsonwebtoken');
const Viaje = require('../models/Viaje');
const firebase = require('firebase-admin');

const crearViaje = async (req, res) => {
  try{
    const {HDestino, HSalida, Duracion, LDestino, LSalida, Precio, viaje, Tipo, FSalida, FDestino, NAsientos} = req.body
    const newViaje = await Viaje.crearViaje(HDestino, HSalida, Duracion, LDestino, LSalida, Precio, viaje, Tipo, FSalida, FDestino, NAsientos)

    res.status(201).json({
      message: 'Viaje agendado',
      viaje: newViaje
    })
  }catch {
    console.log(req.body)
    res.status(499).json({
      message: 'No se agendo cita'
    })
  }
}

const crearViajeRedondo = async (req, res) => {
  try{
    const {HDestino, HSalida, Duracion, LDestino, LSalida, Precio, viaje, Tipo, FSalida, FDestino, NAsientos} = req.body
    const newViaje = await Viaje.crearViajeRedondo(HDestino, HSalida, Duracion, LDestino, LSalida, Precio, viaje, Tipo, FSalida, FDestino, NAsientos)

    res.status(201).json({
      message: 'Viaje redondo agendado',
      viaje: newViaje
    })
  }catch {
    console.log(req.body)
    res.status(499).json({
      message: 'No se agendo viaje redondo'
    })
  }
}

const buscarViaje = async (req, res) => {
  try {
    const { Tipo, FSalida, LDestino, LSalida } = req.body;
    console.log('Cuerpo de la solicitud:', req.body); // Depuración

    const viajes = await Viaje.findByAttributes(Tipo, LDestino, LSalida, FSalida);

    // Si no existen viajes que coincidan
    if (!viajes || viajes.length === 0) {
      return res.status(404).json({
        message: 'No existen viajes que coincidan con los criterios'
      });
    }

    // Si existen, envía la información de los viajes
    return res.status(200).json({
      message: 'success',
      viajes: viajes
    });
  } catch (error) {
    console.error('Error en buscarViaje:', error); // Depuración
    return res.status(500).json({
      message: 'Error Interno del Servidor',
      error: error.message
    });
  }
}
const buscarViajeRedondo = async (req, res) => {
  try {
    const { Tipo, FSalida, FDestino, LDestino, LSalida } = req.body;
    console.log('Cuerpo de la solicitud:', req.body); // Depuración

    const viajes = await Viaje.findByAttributesRedondo(Tipo, LDestino, LSalida, FSalida, FDestino);

    // Si no existen viajes que coincidan
    if (!viajes || viajes.length === 0) {
      return res.status(404).json({
        message: 'No existen viajes que coincidan con los criterios'
      });
    }

    // Si existen, envía la información de los viajes
    return res.status(200).json({
      message: 'success',
      viajes: viajes
    });
  } catch (error) {
    console.error('Error en buscarViaje:', error); // Depuración
    return res.status(500).json({
      message: 'Error Interno del Servidor',
      error: error.message
    });
  }
}

const getAllViajes = async (req, res) => {
  try {
    const viajes = await Viaje.getAllViajes();
    res.json({
      viajes,
      message: 'success'
    });
  } catch (error) {
    console.error('Error en getAllViajes:', error); // Depuración
    res.status(500).json({
      message: 'Error Interno'
    });
  }
}

module.exports = { getAllViajes, buscarViaje, crearViaje, crearViajeRedondo, buscarViajeRedondo};


