import { executeQuery } from '../module/db.js'

export async function obtenerProductos(req, res) {
  const query = `SELECT * FROM producto`

  try {
    const result = await executeQuery(query);

    res.status(200).json({
      ok: true,
      data: result.rows,
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

    console.log("Resultado de la operación:", result);

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
