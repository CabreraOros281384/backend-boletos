const express = require ('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const db = admin.firestore()

// Ruta de Login 
router.post('/login', async (req, res) =>{
try {
    const {email, password } = req.body
    const userRef = db.collection('user').doc(email)
    const userDoc = await userRef.get()
    if (!userDoc.exist){
        return res.status(401).json({
            'status': 'failed',
            'menssage' : 'Invalid email or password'
        })
    }
    const userData = userDoc.data()
    const isPasswordValid = await bcrypt.compare(password, userData.password)
    if (isPasswordValid) {
        const token = jwt.sign(
            { email: userData.email},
            'CLAVE SUPER SECRETA',
            { expiresIn: '1h'}
        )

        res.json({ 
            'status' : 'sucess',
            token
        })
    }else{
        return res.status(401).json({
            'status': 'failed',
            'menssage' : 'Invalid email or password'
    }
} catch (error){
    res.json({
        'status': 'failed',
        'error': error
    })
}
})

module.exports = router 
