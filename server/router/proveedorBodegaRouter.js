import { Router } from "express";
import { crearProveedor, eliminarProveedor, obtenerProveedor } from "../controller/proveedorBodegaController.js";

const router = Router();

router.get('/proveedor-bodega', obtenerProveedor);
router.post('/proveedor-bodega', crearProveedor);
router.delete('/proveedor-bodega', eliminarProveedor);

export default router;
