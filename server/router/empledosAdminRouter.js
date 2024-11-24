import { Router } from "express";
import { crearEmpleados, eliminarEmpleados, obtenerEmpleados } from "../controller/empleadosAdminController.js";

const router = Router();

router.get('/empleados-admin', obtenerEmpleados);
router.post('/empleados-admin', crearEmpleados);
router.delete('/empleados-admin', eliminarEmpleados);

export default router;
