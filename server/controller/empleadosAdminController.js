import { executeQuery } from '../module/db.js'

export async function obtenerEmpleados(req, res) {
  const query = `SELECT * FROM empleado`;

  try {
    const result = await executeQuery(query);

    res.status(200).json({
      ok: true,
      data: result.rows,
    });
  } catch (err) {
    console.error("Error ejecutando la sentencia:", err);

    res.status(500).json({
      ok: false,
      message: "Error al agregar el producto",
      error: err.message,
    });
  }
}

export async function crearEmpleados(req, res) {
  const {
    id,
    salario,
    cargo,
    despedido,
    ferreteria_id,
    persona_id,
    username,
    password,
  } = req.body;

  if (!id || !salario || !cargo || !despedido || !ferreteria_id || !persona_id || !username || !password) {
    return res.status(400).json({
      ok: false,
      message: "Faltan campos obligatorios en la solicitud.",
    });
  }


  const query = `
    BEGIN
      pkg_gestion_empleados.agregar_empleado(
        id => :id,
        salario => :salario,
        cargo => :cargo,
        despedido => :despedido,
        ferreteria_id => :ferreteria_id,
        persona_id => :persona_id,
        username => :username,
        password => :password
      );
    END;
  `;

  const binds = {
    id,
    salario,
    cargo,
    despedido,
    ferreteria_id,
    persona_id,
    username,
    password,
  };

  try {
    const result = await executeQuery(query, binds, { autoCommit: true });

    console.log(result)

    res.status(200).json({
      ok: true,
      message: "Empleado agregado correctamente utilizando el procedimiento almacenado",
      data: result,
    });
  } catch (err) {
    console.error("Error ejecutando el procedimiento almacenado:", err);

    res.status(500).json({
      ok: false,
      message: "Error al agregar el empleado",
      error: err.message,
    });
  }
}

export async function eliminarEmpleados(req, res) {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      ok: false,
      message: "Falta el ID del empleado en la solicitud.",
    });
  }

  const query = `
    BEGIN
      pkg_gestion_empleados.eliminar_empleado(
        id => :id
      );
    END;
  `;

  const binds = {
    id,
  };

  try {
    const result = await executeQuery(query, binds, { autoCommit: true });

    res.status(200).json({
      ok: true,
      message: "Empleado eliminado correctamente utilizando el procedimiento almacenado",
      data: result,
    });
  } catch (err) {
    console.error("Error ejecutando el procedimiento almacenado:", err);

    res.status(500).json({
      ok: false,
      message: "Error al eliminar el producto",
      error: err.message,
    });
  }
}
