import { executeQuery } from '../module/db.js'

export async function obtenerProveedor(req, res) {
  const query = `SELECT * FROM proveedor`;

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

export async function crearProveedor(req, res) {
  const { id, persona_id, nombre } = req.body;

  console.log({ id, persona_id, nombre })

  const query = `
    BEGIN
      pkg_gestion_proveedores.agregar_proveedor(
        id => :id,
        persona_id => :persona_id,
        nombre => :nombre
      );
    END;
  `;

  const binds = {
    id,
    persona_id,
    nombre,
  };

  try {
    const result = await executeQuery(query, binds, { autoCommit: true });

    res.status(200).json({
      ok: true,
      message: "Proveedor agregado correctamente utilizando el procedimiento almacenado",
      data: result,
    });
  } catch (err) {
    console.error("Error ejecutando el procedimiento almacenado:", err);

    res.status(500).json({
      ok: false,
      message: "Error al agregar el proveedor",
      error: err.message,
    });
  }
}

export async function eliminarProveedor(req, res) {
  const { id } = req.body;

  // Validar que se proporcione un ID
  if (!id) {
    return res.status(400).json({
      ok: false,
      message: "Falta el ID del proveedor en la solicitud.",
    });
  }

  // Consulta SQL para llamar al procedimiento almacenado
  const query = `
    BEGIN
      pkg_gestion_proveedores.eliminar_proveedor(
        id => :id
      );
    END;
  `;

  // Parámetros para el procedimiento
  const binds = {
    id,
  };

  try {
    // Ejecutar el procedimiento almacenado
    const result = await executeQuery(query, binds, { autoCommit: true });

    // Comprobar el resultado
    res.status(200).json({
      ok: true,
      message: "Proveedor eliminado correctamente utilizando el procedimiento almacenado",
      data: result,
    });
  } catch (err) {
    // Capturar y responder con errores
    console.error("Error ejecutando el procedimiento almacenado:", err);

    res.status(500).json({
      ok: false,
      message: "Error al eliminar el proveedor",
      error: err.message,
    });
  }
}
