const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Holder = require("../models/holders");
const httpHolders = {
    // Listar todos los holders
    getListarTodos: async (req, res) => {
        try {
            const holders = await Holder.find();
            res.json({ holders });
        } catch (error) {
            res.status(400).json({ error: "Operación no se realizó correctamentet" });
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
            res.status(400).json({ error: "Operación no se realizó correctamentes" });
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
            console.error("Error al crear el holder:", error);
            res.status(400).json({ error: "Operación no se realizó correctamenteh" });
            console.log(error);
        }
    },
    // Crear nuevo Login
    login: async (req, res) => {
        const { email, password } = req.body;
    
        try {
            // Buscar el holder por email
            const holder = await Holder.findOne({ email });
            if (!holder) {
                return res.status(400).json({
                    msg: "Holder no correcto"
                });
            }
    
            // Verificar si el holder está activo
            if (holder.state === '0') {  // Asegúrate de que 'state' es la propiedad correcta
                return res.status(403).json({
                    msg: "Holder Inactivo"
                })
            }
    
            // Comparar la contraseña
            const validPassword = bcrypt.compareSync(password, holder.password);
            console.log("contraseña recibida",password)
            console.log("contraseña almacena",holder.password)
            console.log("contraseña valida",validPassword)
            if (!validPassword) {
                return res.status(401).json({
                    msg: "Password incorrecto"
                })
            }
    
            // Generar el token JWT
            const token = await generarJWT(holder.id)
    
            // Responder con el holder y el token
            res.json({
                holder,
                token
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                msg: "Hable con el WebMaster"
            });
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