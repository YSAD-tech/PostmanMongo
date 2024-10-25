const Holder = require("../models/holders");
const bcrypt = require('bcryptjs'); 
const token=require("../middleware/validar_jwt")
const { generarJWT } = require('../middleware/validar_jwt');
const httpHolders = {
    postlogin: async (req, res) => {
        const { email, password } = req.body;
        try {
            const holder = await Holder.findOne({ email });
            if (!holder) {
                return res.status(404).json({ msg: "Holder no encontrado" });
            }
            
            if (holder.estado === 0) {
                return res.status(403).json({ msg: "Holder inactivo" });
            }
    
            const validarPassword = bcrypt.compare(password, holder.password);
            console.log("contraseña recibida:",password)
            console.log("constraseña almacenada ", holder.password)
            console.log("constraseña valida",validarPassword)
            console.log("Comparando contraseñas para el usuario:", holder.email);
            if (!validarPassword) {
                return res.status(401).json({ msg: "Password incorrecto" });
            } 
    
            const token = await generarJWT(holder.id);
            res.json({ holder, token });
        } catch (error) {
            console.error("Error en postlogin:", error);
            console.error(error); 
            return res.status(500).json({ msg: "No se pudo realizar la operación" });
        }
    },
    // Listar todos los holders
    getListarTodos: async (req, res) => {
        try {
            const holders = await Holder.find();
            res.json({ holders });
        } catch (error) {
            res.status(400).json({ error: "Operación no se realizó correctamente" });
            console.log(error);
        }
    },
    // Listar holder por ID
    getListarPorId: async (req, res) => {
        try {
            const { id } = req.params;
            const holder = await Holder.findById(id);
            res.json({ holder });
        } catch (error) {
            res.status(400).json({ error: "Operación no se realizó correctamente" });
            console.log(error);
        }
    },
    // Crear nuevo holder
    postHolder: async (req, res) => {
        try {
            const { email, password, document, name, rol, ficha, photo, phone } = req.body;
            const holder = new Holder({ email, password, document, name, rol, ficha, photo, phone });
            await holder.save();
            res.json({ holder });
        } catch (error) {
            res.status(400).json({ error: "Operación no se realizó correctamente" });
            console.log(error);
        }
    },
    // Modificar un holder por ID
    putModificar: async (req, res) => {
        try {
            const { id } = req.params;
            const holder = await Holder.findByIdAndUpdate(id, req.body, { new: true });
            res.json({ holder });
        } catch (error) {
            res.status(400).json({ error: "Operación no se realizó correctamente" });
            console.log(error);
        }
    },
    // Activar un holder
    putActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const holder = await Holder.findByIdAndUpdate(id, { state: 1 });
            res.json({ holder });
        } catch (error) {
            res.status(400).json({ error: "Operación no se realizó correctamente" });
            console.log(error);
        }
    },
    // Inactivar un holder
    putInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const holder = await Holder.findByIdAndUpdate(id, { state: 0 });
            res.json({ holder });
        } catch (error) {
            res.status(400).json({ error: "Operación no se realizó correctamente" });
            console.log(error);
        }
    },
};
module.exports = httpHolders;