const { Router } = require('express');
const httpEntries = require('../controllers/Entrys');
const router = Router();
// Rutas para las entradas
router.post('/', httpEntries.postEntry); // Insertar una nueva entrada
router.get('/holder/:id', httpEntries.getListarPorHolder); // Listar entradas por Holder
router.get('/dia', httpEntries.getListarPorDia); // Listar entradas por día
router.get('/fechas', httpEntries.getListarEntreFechas); // Listar entradas entre fechas
router.put('/salida/:id', httpEntries.putRegistrarSalida); // Registrar salida o entrega
module.exports = router;