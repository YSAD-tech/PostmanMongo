const Holder = require("../models/holders");
const httpHolders = {
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