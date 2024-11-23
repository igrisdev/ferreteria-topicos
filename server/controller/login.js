import { Router } from "express";
import { executeQuery } from "../module/db.js";

const router = Router();

router.post('/login', async function (req, res) {
  const { username, password } = req.body

  if (!username) return res.json("falta el username")
  if (!password) return res.json("falta el password")

  const query = `SELECT * FROM empleado`
  const result = await executeQuery(query)
  console.log(result.rows)

  res.json(result.rows)
});

export default router;
