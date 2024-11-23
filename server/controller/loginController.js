import { executeQuery } from '../module/db.js'

export async function login(req, res) {
  const { username, password } = req.body

  if (!username) return res.json("falta el username")
  if (!password) return res.json("falta el password")

  const queryEmpleado = `SELECT * FROM empleado WHERE username = :username AND password = :password`

  let result
  const bindsEmpleado = { username, password }
  result = await executeQuery(queryEmpleado, bindsEmpleado)

  if (result.rows.length > 0) {
    res.json({ ok: true, message: result.rows[0].CARGO })
    return
  }

  const queryAdmin = `SELECT * FROM administrador WHERE username = :username AND password = :password`

  const bindsAdmin = { username, password }
  result = await executeQuery(queryAdmin, bindsAdmin)

  if (result.rows.length > 0) {
    res.json({ ok: true, message: result.rows[0].CARGO })
    return
  }

  res.json({ ok: false, message: 'Usuario no encontrado' })
}
