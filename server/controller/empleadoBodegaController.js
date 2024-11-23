import { executeQuery } from '../module/db.js'

export async function obtenerProductos(req, res) {
  const query = `SELECT * FROM producto`;

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

export async function crearProducto(req, res) {
  const {
    id,
    nombre,
    marca,
    precio,
    descripcion,
    categoria_id,
    ferreteria_id,
  } = req.body

  const query = `
    BEGIN
      pkg_gestion_productos.agregar_producto(
        id => :id,
        nombre => :nombre,
        marca => :marca,
        precio => :precio,
        descripcion => :descripcion,
        categoria_id => :categoria_id,
        ferreteria_id => :ferreteria_id
      );
    END;
  `;

  const binds = {
    id,
    nombre,
    marca,
    precio,
    descripcion,
    categoria_id,
    ferreteria_id,
  };

  try {
    const result = await executeQuery(query, binds, { autoCommit: true });

    res.status(200).json({
      ok: true,
      message: "Producto agregado correctamente utilizando el procedimiento almacenado",
      data: result,
    });
  } catch (err) {
    console.error("Error ejecutando el procedimiento almacenado:", err);

    res.status(500).json({
      ok: false,
      message: "Error al agregar el producto",
      error: err.message,
    });
  }
}

export async function actualizarProducto(req, res) {
  const {
    id,
    nombre,
    marca,
    precio,
    descripcion,
    categoria_id,
    ferreteria_id,
  } = req.body;

  if (!id || !nombre || !marca || !precio || !categoria_id || !ferreteria_id) {
    return res.status(400).json({
      ok: false,
      message: "Faltan campos obligatorios en la solicitud.",
    });
  }

  const query = `
    BEGIN
      pkg_gestion_productos.actualizar_precio_producto(
        id => :id,
        nombre => :nombre,
        marca => :marca,
        precio => :precio,
        descripcion => :descripcion,
        categoria_id => :categoria_id,
        ferreteria_id => :ferreteria_id
      );
    END;
  `;

  const binds = {
    id,
    nombre,
    marca,
    precio,
    descripcion,
    categoria_id,
    ferreteria_id,
  };
  console.log({
    id,
    nombre,
    marca,
    precio,
    descripcion,
    categoria_id,
    ferreteria_id,
  })
  try {
    const result = await executeQuery(query, binds, { autoCommit: true });

    res.status(200).json({
      ok: true,
      message: "Producto actualizado correctamente utilizando el procedimiento almacenado",
      data: result,
    });
  } catch (err) {
    console.error("Error ejecutando el procedimiento almacenado:", err);

    res.status(500).json({
      ok: false,
      message: "Error al actualizar el producto",
      error: err.message,
    });
  }
}

export async function eliminarProducto(req, res) {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      ok: false,
      message: "Falta el ID del producto en la solicitud.",
    });
  }

  const query = `
    BEGIN
      pkg_gestion_productos.eliminar_producto(
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
      message: "Producto eliminado correctamente utilizando el procedimiento almacenado",
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
