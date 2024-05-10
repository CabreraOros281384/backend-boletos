const bcrypt = require ('bcrypt')
const jwt = require ('jsonwebtoken')
const admin = require('./../config/firebase')

const loginUser = async (req, res) => {
    try{
        const { email , password } = req.body

        //Buscamos el usuarios para verificar si existe el correo 
        const userDoc = await admin.firestore().collection('user').doc(email).get

        //sino existe el usuario 
        if (!userDoc.exists){
            return res.status(404).json({
                mensage: 'User not found'
            })
        }
        const userData = userDoc.data()

        //Verificat si existe el password
        const isValidPass = await bcrypt.compare(password, userData.password)

        if(!isValidPass){
            return res.status(401).json({
                mensage: 'Invalied Credentials '
            })
        }
        //Genera el token 
        const token = jwt.sign({ email: userData.email}, process.env.SECRET, { expiresIn: '1h'})
        res.status(200).json({
            message: 'Internal Server Error'
        })

    }catch (error){
        res.tatus(500).json({
            message : 'Internal Server Error'
        })
    }
}