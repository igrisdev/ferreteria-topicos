import { Router } from "express";
import { crearProducto, obtenerProductos } from "../controller/empleadoBodegaController.js";

const router = Router();

router.get('/empleado-bodega', obtenerProductos);
router.post('/empleado-bodega', crearProducto);

export default router;
