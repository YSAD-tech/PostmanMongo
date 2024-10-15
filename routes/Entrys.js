const { Router } = require('express');
const {check} = require("express-validator")
const httpEntries = require('../controllers/Entrys');
const helperEntry = require("..//helpers/Entrys")
const {validarCampos} = require("../middleware/validar_datos")
const router = Router();
// Rutas para las entradas
router.post('/',[
    check("holder","Id no valido").isMongoId(),
    check("holder","no existe en la bd").custom(helperEntry.validarHolder),
    check("date","la fecha es obligatoria").notEmpty(),
    check("date","la fecha debe ser unica").custom(helperEntry.validarDate),
    check("time","la hora es obligatoria").notEmpty(),
    check("time","la hora debe ser unica").custom(helperEntry.validarTime),
    check("state","el estado es obligatorio").notEmpty(),
    validarCampos
], httpEntries.postEntry)

router.get('/holder/:id',[
    check("id","Id no valido").isMongoId(),
    check("id","no existe en la bd").custom(helperEntry.validarId),
    validarCampos
], httpEntries.getListarPorHolder)
router.get('/dia', httpEntries.getListarPorDia)

router.get('/fechas', httpEntries.getListarEntreFechas)

router.put('/salida/:id',[
    check("id","Id no valido").isMongoId(),
    check("id","no existe en la bd").custom(helperEntry.validarId),
    check("checkout","la fecha de salida es obligatoria").notEmpty(),
    validarCampos
], httpEntries.putRegistrarSalida)

module.exports = router;