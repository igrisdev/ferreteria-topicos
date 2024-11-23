import { Router } from "express";
import { actualizarProducto, crearProducto, eliminarProducto, obtenerProductos } from "../controller/empleadoBodegaController.js";

const router = Router();

router.get('/empleado-bodega', obtenerProductos);
router.post('/empleado-bodega', crearProducto);
router.put('/empleado-bodega', actualizarProducto);
router.delete('/empleado-bodega', eliminarProducto);

export default router;
