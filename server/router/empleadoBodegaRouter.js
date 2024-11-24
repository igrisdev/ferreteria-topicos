import { Router } from "express";
import { crearProducto, eliminarProducto, obtenerProductos } from "../controller/empleadoBodegaController.js";

const router = Router();

router.get('/empleado-bodega', obtenerProductos);
router.post('/empleado-bodega', crearProducto);
router.delete('/empleado-bodega', eliminarProducto);

export default router;
