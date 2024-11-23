import { Router } from "express";
import { empleadoBodega } from "../router/empleadoBodegaRouter.js";

const router = Router();

router.post('/empleado-bodega', empleadoBodega);

export default router;
