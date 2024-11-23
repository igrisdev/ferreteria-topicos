import { Router } from "express";
import { loginRouter } from "../router/loginRouter.js";

const router = Router();

router.post('/login', loginRouter);

export default router;
