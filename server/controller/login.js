import { Router } from "express";
const router = Router(); // Asegúrate de inicializar el router correctamente

// define the home page route
router.get('/', function (req, res) {
  res.send('Birds home page');
});

export default router; // Exporta el router correctamente
