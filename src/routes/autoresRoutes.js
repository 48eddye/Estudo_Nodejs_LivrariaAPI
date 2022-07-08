import express from "express";
import autorController from "../controllers/autoresController.js";

const router = express.Router();

router.get("/autores", autorController.listarAutores);
router.get("/autores/:id", autorController.listarAutorPorId);
router.post("/autores", autorController.cadastrarAutor);
router.put("/autores/:id", autorController.atualizarAutor);
router.delete("/autores/:id", autorController.excluirAutor);

export default router;