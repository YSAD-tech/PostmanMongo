const { Router } = require("express");
const {check} = require("express-validator")
const httpHolders = require("../controllers/Holders");

const {helperHolder} = require("../helpers/Holders")
const {validarCampos} = require("../middleware/validar_datos");
const {validarJWT} = require("../middleware/validar_jwt");

const router = Router();
// Rutas para holders
router.get("/",[
    validarJWT,
    validarCampos
], httpHolders.getListarTodos); // Listar todos

router.get("/:id",[
    validarJWT,
    check("id","Id no valido").isMongoId(), 
    check("id","no existe en la bd").custom(helperHolder.validarId),
    validarCampos
], httpHolders.getListarPorId); // Listar por ID

router.post("/",[
    check("email", "El email es obligatorio").notEmpty(),
    check("email","el email debe ser unico").custom(helperHolder.validarEmail),
    check("password", "La contraseña es obligatoria").notEmpty(),
    check("password", "la contraseña debe ser mínimo de 8 caracteres").isLength({min:8}),
    check("document", "el documento es obligatorio").notEmpty(),
    check("document", "el documento debe ser único").custom(helperHolder.validarDocumento),
    check("name", "El nombre es obligatorio").notEmpty(),
    check("rol", "El rol es obligatorio").notEmpty(),
    check("phone", "El telefono es obligatorio").notEmpty(),
    check("state", "El estado es obligatorio").notEmpty(),
    check("ficha", "Ficha debe ser un número").isNumeric(),
    validarCampos
], httpHolders.postHolder); // Crear holder

router.put("/:id",[
    validarJWT,
    check("id","Id no valido").isMongoId(), 
    check("id","no existe en la bd").custom(helperHolder.validarId),
    check("email", "El email es obligatorio").optional().notEmpty(),
  check("email", "El email debe ser único").optional().custom(helperHolder.validarEmail),
  check("password", "La contraseña debe tener mínimo 8 caracteres").optional().isLength({ min: 8 }),
    validarCampos
], httpHolders.putModificar); // Modificar holder

router.put("/activar/:id",[
    validarJWT,
    check("id","Id no valido").isMongoId(), 
    check("id","no existe en la bd").custom(helperHolder.validarId),
    validarCampos
], httpHolders.putActivar); // Activar holder

router.put("/inactivar/:id",[
    validarJWT,
    check("id","Id no valido").isMongoId(), 
    check("id","no existe en la bd").custom(helperHolder.validarId),
    validarCampos
], httpHolders.putInactivar); // Inactivar holder

router.post("/login", [
    check("email", "El email es obligatorio").notEmpty(),
    check("password", "La contraseña es obligatoria").notEmpty(),
    validarCampos
], httpHolders.postlogin);

module.exports = router;