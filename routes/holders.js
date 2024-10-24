const { Router } = require("express");
const {check} = require("express-validator")
const httpHolders = require("..//controllers/Holders");
const {validarJWT} = require("..//middleware/validar_JWT.js")
const {helperHolder} = require("..//helpers/Holders")
const {validarCampos} = require("..//middleware/validar_datos")
const router = Router();
// Rutas para holders
router.get("/",validarJWT,httpHolders.getListarTodos); // Listar todos

router.get("/:id",validarJWT,[
    check("id","Id no valido").isMongoId(), 
    check("id","no existe en la bd").custom(helperHolder.validarId),
], httpHolders.getListarPorId); // Listar por ID

router.post("/",validarJWT,[
    check("email", "El email es obligatorio").notEmpty(),
    check("email","El email debe ser unico").custom(helperHolder.validarEmail),
    check("password", "La contraseña es obligatoria").notEmpty(),
    check("password", "la contraseña debe ser mínimo de 8 caracteres").isLength({min:8}),
    check("document", "el documento es obligatorio").notEmpty(),
    check("document", "el documento debe ser único").custom(helperHolder.validarDocument),
    check("name", "El nombre es obligatorio").notEmpty(),
    check("rol", "El rol es obligatorio").notEmpty(),
    check("phone", "El telefono es obligatorio").notEmpty(),
    check("state", "El estado es obligatorio").notEmpty(),
    validarCampos
], httpHolders.postHolder); // Crear holder
router.post("/login",[
    check("email", "El email es obligatorio").notEmpty(),
    check("password", "La password es obligatoria").notEmpty(),
    validarCampos
],httpHolders.postHolder);

router.put("/:id",validarJWT,[
    check("id","Id no valido").isMongoId(), 
    check("id","no existe en la bd").custom(helperHolder.validarId),
], httpHolders.putModificar); // Modificar holder

router.put("/activar/:id",validarJWT,[
    check("id","Id no valido").isMongoId(), 
    check("id","no existe en la bd").custom(helperHolder.validarId),
], httpHolders.putActivar); // Activar holder

router.put("/inactivar/:id",validarJWT,[
    check("id","Id no valido").isMongoId(), 
    check("id","no existe en la bd").custom(helperHolder.validarId),
], httpHolders.putInactivar); // Inactivar holder

module.exports = router;