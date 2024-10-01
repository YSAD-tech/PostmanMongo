const Laptop = require('../models/Laptops');
const QRCode = require('qrcode'); // Librería para generar códigos QR
const httpLaptops = {
    // Listar todas las laptops
    getListarTodos: async (req, res) => {
        try {
            const laptops = await Laptop.find().populate('holder');
            res.json({ laptops });
        } catch (error) {
            res.status(400).json({ error: "Error al listar laptops" });
            console.log(error);
        }
    },
    // Listar laptop por ID
    getListarPorId: async (req, res) => {
        try {
            const { id } = req.params;
            const laptop = await Laptop.findById(id).populate('holder');
            res.json({ laptop });
        } catch (error) {
            res.status(400).json({ error: "Error al obtener laptop" });
            console.log(error);
        }
    },
    // Crear una nueva laptop
    postLaptop: async (req, res) => {
        try {
            const { holder, serial, qrcode, state, observations } = req.body;
            const laptop = new Laptop({ holder, serial, qrcode, state, observations });
            await laptop.save();
            res.json({ laptop });
        } catch (error) {
            res.status(400).json({ error: "Error al crear laptop" });
            console.log(error);
        }
    },
    // Modificar una laptop por ID
    putModificar: async (req, res) => {
        try {
            const { id } = req.params;
            const laptop = await Laptop.findByIdAndUpdate(id, req.body, { new: true });
            res.json({ laptop });
        } catch (error) {
            res.status(400).json({ error: "Error al modificar laptop" });
            console.log(error);
        }
    },
    // Activar una laptop
    putActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const laptop = await Laptop.findByIdAndUpdate(id, { state: 1 });
            res.json({ laptop });
        } catch (error) {
            res.status(400).json({ error: "Error al activar laptop" });
            console.log(error);
        }
    },
    // Inactivar una laptop
    putInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const laptop = await Laptop.findByIdAndUpdate(id, { state: 0 });
            res.json({ laptop });
        } catch (error) {
            res.status(400).json({ error: "Error al inactivar laptop" });
            console.log(error);
        }
    },
    // Generar código QR
    putGenerarQR: async (req, res) => {
        try {
            const { id } = req.params;
            const laptop = await Laptop.findById(id);
            if (!laptop) {
                return res.status(404).json({ error: "Laptop no encontrada" });
            }

            const qrCodeUrl = await QRCode.toDataURL(laptop.serial); // Generar el QR basado en el serial
            laptop.qrcode = qrCodeUrl;
            await laptop.save();
            res.json({ qrCodeUrl });
        } catch (error) {
            res.status(400).json({ error: "Error al generar código QR" });
            console.log(error);
        }
    },
};
module.exports = httpLaptops;