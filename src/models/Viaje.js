const admin = require('../config/firebase');
const IViaje = require('../interfaces/IViaje');
const firestore = admin.firestore();

class Viaje extends IViaje {
    constructor(HDestino, HSalida, Duracion, LDestino, LSalida, Precio, viaje, Tipo, FSalida, FDestino, NAsientos) {
        super();
        this.HDestino = HDestino;
        this.HSalida = HSalida;
        this.Duracion = Duracion;
        this.LDestino = LDestino;
        this.LSalida = LSalida;
        this.Precio = Precio;
        this.viaje = viaje;
        this.Tipo = Tipo;
        this.FSalida = FSalida;
        this.FDestino = FDestino;
        this.NAsientos = NAsientos;
    }

    static async crearViaje(HDestino, HSalida, Duracion, LDestino, LSalida, Precio, viaje, Tipo, FSalida, FDestino, NAsientos) {
      //const FSalidaDate = new Date(data.FSalida.seconds * 1000);
      //FSalidaDate.setMilliseconds(0);

      //const FDestinoDate = new Date(data.FDestino.seconds * 1000);
      //FDestinoDate.setMilliseconds(0);
      try {
      const ViajeN = firestore.collection('viajes').doc(viaje)
      await ViajeN.set({

          HDestino,
          HSalida,
          Duracion,
          LDestino,
          LSalida,
          Precio,
          viaje,
          Tipo,
          FSalida,
          FDestino,
          NAsientos
        })

        return new Viaje(HDestino, HSalida, Duracion, LDestino, LSalida, Precio, viaje, Tipo, FSalida, FDestino, NAsientos)
    } catch (error) {
        console.log('@@ Error => ', error)
        throw new Error ('Error creating viaje')
    }
}

    static async getAllViajes() {
        try {
            const viajes = [];
            const snapshot = await firestore.collection('viajes').get();
            snapshot.forEach(doc => {
                const data = doc.data();
                viajes.push(new Viaje(
                    data.HDestino,
                    data.HSalida,
                    data.Duracion,
                    data.LDestino,
                    data.LSalida,
                    data.Precio,
                    data.viaje,
                    data.Tipo,
                    data.FSalida,//toDate(), // Convertir el Timestamp a objeto Date
                    data.FDestino,//.toDate() // Convertir el Timestamp a objeto Date
                    data.NAsientos
                ));
            });
            return viajes;
        } catch (error) {
            throw error;
        }
    }

  
    static async findByAttributes(Tipo, LDestino, LSalida, FSalida) {
      try {
        let query = firestore.collection('viajes');
    
        console.log('Parámetros de búsqueda:', { Tipo,LDestino, LSalida, FSalida }); // Depuración
        if(Tipo){
          query = query.where('Tipo', '==', Tipo);
          console.log('FSalida añadido al query:', ); 
        }
        if (FSalida) {
          query = query.where('FSalida', '==', FSalida);
          console.log('FSalida añadido al query:', FSalida); // Depuración
        }
    
        if (LDestino) {
          query = query.where('LDestino', '==', LDestino);
          console.log('LDestino añadido al query:', LDestino); // Depuración
        }
    
        if (LSalida) {
          query = query.where('LSalida', '==', LSalida);
          console.log('LSalida añadido al query:', LSalida); // Depuración
        }
    
        const querySnapshot = await query.get();
        console.log('Query snapshot:', querySnapshot.size, 'documentos encontrados'); // Depuración
    
        const viajes = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          console.log('Datos del documento:', data); // Depuración
          // Convertir el Timestamp a objeto Date y establecer los milisegundos en 0
          const FSalidaDate = new Date(data.FSalida.seconds * 1000);
          FSalidaDate.setMilliseconds(0);
          const FDestinoDate = new Date(data.FDestino.seconds * 1000);
          FDestinoDate.setMilliseconds(0);
          viajes.push(new Viaje(
            data.HDestino,
            data.HSalida,
            data.Duracion,
            data.LDestino,
            data.LSalida,
            data.Precio,
            data.viaje,
            data.Tipo,
            FSalidaDate,
            FDestinoDate,
            data.NAsientos
          ));
        });
        console.log('Viajes encontrados:', viajes); // Depuración
        return viajes;
      } catch (error) {
        console.error('@@ Error en findByAttributes => ', error);
        throw new Error('Error finding viaje by attributes');
      }
    }
    
  
}

module.exports = Viaje;
