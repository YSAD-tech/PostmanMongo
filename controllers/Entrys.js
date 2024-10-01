const Entry = require('../models/Entrys');
const httpEntries = {
    // Insertar una nueva entrada
    postEntry: async (req, res) => {
        try {
            const { laptop, type } = req.body;
            const entry = new Entry({ laptop, type });
            await entry.save();
            res.json({ entry });
        } catch (error) {
            res.status(400).json({ error: "Error al crear la entrada" });
            console.log(error);
        }
    },
    // Listar entradas por Holder
    getListarPorHolder: async (req, res) => {
        try {
            const { id } = req.params;
            const entries = await Entry.find().populate({
                path: 'laptop',
                populate: { path: 'holder', match: { _id: id } }
            });

            // Filtrar entradas que tengan ese holder
            const holderEntries = entries.filter(entry => entry.laptop.holder && entry.laptop.holder._id.toString() === id);

            res.json({ entries: holderEntries });
        } catch (error) {
            res.status(400).json({ error: "Error al listar entradas por holder" });
            console.log(error);
        }
    },
    // Listar entradas por día
    getListarPorDia: async (req, res) => {
        try {
            const { dia } = req.query;
            const fechaInicio = new Date(dia);
            const fechaFin = new Date(dia);
            fechaFin.setDate(fechaFin.getDate() + 1); // Sumamos 1 día para obtener el rango del día

            const entries = await Entry.find({
                entrytime: { $gte: fechaInicio, $lt: fechaFin }
            }).populate('laptop');

            res.json({ entries });
        } catch (error) {
            res.status(400).json({ error: "Error al listar entradas por día" });
            console.log(error);
        }
    },
    // Listar entradas entre fechas
    getListarEntreFechas: async (req, res) => {
        try {
            const { inicio, fin } = req.query;
            const fechaInicio = new Date(inicio);
            const fechaFin = new Date(fin);

            const entries = await Entry.find({
                entrytime: { $gte: fechaInicio, $lt: fechaFin }
            }).populate('laptop');

            res.json({ entries });
        } catch (error) {
            res.status(400).json({ error: "Error al listar entradas entre fechas" });
            console.log(error);
        }
    },
    // Registrar salida o entrega
    putRegistrarSalida: async (req, res) => {
        try {
            const { id } = req.params;
            const checkout = new Date();
            const entry = await Entry.findByIdAndUpdate(id, { checkout }, { new: true });
            res.json({ entry });
        } catch (error) {
            res.status(400).json({ error: "Error al registrar la salida" });
            console.log(error);
        }
    },
};
module.exports = httpEntries;