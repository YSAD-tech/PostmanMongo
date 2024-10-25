const { Router } = require('express');
const {check} = require("express-validator")
const httpEntries = require('../controllers/Entrys');
const helperEntry = require("..//helpers/Entrys")
const {validarCampos} = require("../middleware/validar_datos");
const { validarJWT } = require('../middleware/validar_jwt');

const router = Router();

// Rutas para las entradas
router.post('/',[
  check("laptop", "El ID de la laptop es obligatorio").isMongoId(),
  check("laptop", "La laptop debe existir en la BD").custom(helperEntry.validarLaptop),
  check("holder", "El ID del holder es obligatorio").isMongoId(),
  check("holder", "el Holder debe existir en la BD").custom(helperEntry.validarHolder),
  validarCampos
], httpEntries.postEntry)

router.get('/holder/:id',[
    validarJWT,
    check("id","Id no valido").isMongoId(),
    check("id","no existe en la bd").custom(helperEntry.validarId),
    validarCampos
], httpEntries.getListarPorHolder)
router.get('/dia', httpEntries.getListarPorDia)

router.get('/fechas',[
    validarJWT,
    check("startDate", "La fecha de inicio es obligatoria").notEmpty(),
    check("endDate", "La fecha de fin es obligatoria").notEmpty(),
    validarCampos
], httpEntries.getListarEntreFechas)

router.put('/salida/:id',[
    validarJWT,
    check("id","Id no valido").isMongoId(),
    check("id","no existe en la bd").custom(helperEntry.validarId),
    check("checkout","la fecha de salida es obligatoria").notEmpty(),
    validarCampos
], httpEntries.putRegistrarSalida)

module.exports = router;