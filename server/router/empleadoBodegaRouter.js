import { executeQuery } from '../module/db.js'



export async function empleadoBodega(req, res) {
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
    id: 9, // Número entero para ID_PRODUCTO
    nombre: "Mar", // Cadena con máximo 45 caracteres
    marca: "Mars", // Cadena con máximo 45 caracteres
    precio: 10.00, // Número con hasta 10 dígitos y 2 decimales
    descripcion: "Mar bol", // Cadena opcional con máximo 100 caracteres
    categoria_id: 1, // Número entero para ID_CATEGORIA
    ferreteria_id: 1, // Número entero para ID_FERRETERIA
  };

  try {
    const result = await executeQuery(query, binds, { autoCommit: true });

    console.log("Resultado de la operación:", result);

    // Respuesta al cliente
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
