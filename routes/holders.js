const { Router } = require("express");
const httpHolders = require("../controllers/Holders");
const router = Router();
// Rutas para holders
router.get("/", httpHolders.getListarTodos); // Listar todos
router.get("/:id", httpHolders.getListarPorId); // Listar por ID
router.post("/", httpHolders.postHolder); // Crear holder
router.put("/:id", httpHolders.putModificar); // Modificar holder
router.put("/activar/:id", httpHolders.putActivar); // Activar holder
router.put("/inactivar/:id", httpHolders.putInactivar); // Inactivar holder

module.exports = router;