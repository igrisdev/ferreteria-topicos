import oracledb from 'oracledb';

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const dbConfig = {
  user: 'system',
  password: '123456',
  connectString: 'DESKTOP-UKOJCVS:1521/XE'
};

export async function executeQuery(query, binds = [], options = {}) {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(query, binds, options);

    if (options.autoCommit) {
      await connection.commit();
    }

    return result;
  } catch (err) {
    console.error('Error ejecutando la consulta:', err);
    throw err;
  } finally {
    // Asegurarse de cerrar la conexión
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error cerrando la conexión:', err);
      }
    }
  }
}





// import oracledb from 'oracledb';
//
// oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
//
// const mypw = '123456';
//
// export async function run() {
//   try {
//     const connection = await oracledb.getConnection({
//       user: 'system',
//       password: mypw,
//       connectString: 'DESKTOP-UKOJCVS:1521/XE'
//     });
//
//     const result = await connection.execute(
//       `SELECT * FROM producto`
//     );
//
//     console.log(result.rows);
//     connection.close();
//   } catch (err) {
//     console.error(err);
//   }
// }
