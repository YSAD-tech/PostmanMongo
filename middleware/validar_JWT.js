const jwt = require('jsonwebtoken');
const Holder = require('../models/holders');
const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid }; 
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h' // Token expira en 4 horas
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
        });
    });
};

const validarJWT = async (req, res, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la peticion",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    let usuario = await Holder.findById(uid);
    if (!usuario) {
      return res.status(401).json({
        msg: "Token no válido DB", //- usuario no existe DB
      });
    }
    if (usuario.estado == 0) {
      return res.status(401).json({
        msg: "Token no válido false", //- usuario con estado: false
      });
    }
    next();
  } catch (error) {
    res.status(401).json({
      msg: "Token no valido",
    });
  }
};

module.exports = {validarJWT, generarJWT};