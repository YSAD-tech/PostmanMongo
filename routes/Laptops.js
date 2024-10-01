const { Router } = require('express');
const httpLaptops = require('../controllers/Laptops');
const router = Router();
// Rutas para laptops
router.get('/', httpLaptops.getListarTodos); // Listar todas
router.get('/:id', httpLaptops.getListarPorId); // Listar por ID
router.post('/', httpLaptops.postLaptop); // Crear laptop
router.put('/:id', httpLaptops.putModificar); // Modificar laptop
router.put('/activar/:id', httpLaptops.putActivar); // Activar laptop
router.put('/inactivar/:id', httpLaptops.putInactivar); // Inactivar laptop
router.put('/qr/:id', httpLaptops.putGenerarQR); // Generar QR
module.exports = router;