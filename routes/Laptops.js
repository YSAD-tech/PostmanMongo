const { Router } = require('express');
const {check} = require("express-validator")
const httpLaptops = require('../controllers/Laptops');
const {helperLaptop} = require("../helpers/Laptops")
const { validarCampos } = require("../middleware/validar_datos")
const router = Router();

router.get('/', httpLaptops.getListarTodos); // Listar todas
router.get('/:id',[
    check("holder","Id no valido").isMongoId(), 
    check("holder","no existe en la bd").custom(helperLaptop.validarId),

], httpLaptops.getListarPorId); // Listar por ID

router.post('/',[
    check("serial","Serial es obligatorio").notEmpty(),
    check("holder","Holder es obligatorio").notEmpty(),
    check("holder","Id no valido").isMongoId(), 
    check("holder","no existe en la bd").custom(helperLaptop.validarId),
    check("qrcode","QRCode es obligatorio").notEmpty(),
    check("qrcode", "El qrcode debe ser unico").custom(helperLaptop.validarQRCode),
    validarCampos
], httpLaptops.postLaptop); // Crear laptop

router.put('/:id',[
    check("holder","Id no valido").isMongoId(), 
    check("holder","no existe en la bd").custom(helperLaptop.validarId)
], httpLaptops.putModificar); // Modificar laptop

router.put('/activar/:id',[
    check("holder","Id no valido").isMongoId(), 
    check("holder","no existe en la bd").custom(helperLaptop.validarId)
], httpLaptops.putActivar); // Activar laptop

router.put('/inactivar/:id',[
    check("holder","Id no valido").isMongoId(), 
    check("holder","no existe en la bd").custom(helperLaptop.validarId)
], httpLaptops.putInactivar); // Inactivar laptop

router.put('/qr/:id',[
    check("holder","Id no valido").isMongoId(), 
    check("holder","no existe en la bd").custom(helperLaptop.validarId)
], httpLaptops.putGenerarQR); // Generar QR

module.exports = router;