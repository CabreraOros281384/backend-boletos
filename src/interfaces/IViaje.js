class IViaje {
    static async getAllViajes () {}
    static async findByAttributes(Tipo,FSalida, LDestino, LSalida){}
    static async crearViaje(data) {}
    static async crearViajeRedondo(data) {}
    static async findByAttributesRedondo(Tipo, LDestino, LSalida, FSalida, FDestino){}
    //static async findByAttributesRegreso(LDestino, LSalida, FSalida,FDestino){}
}

module.exports = IViaje