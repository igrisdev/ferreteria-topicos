import oracledb from 'oracledb';

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const dbConfig = {
  user: 'ALVAREZ_DB',
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
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error cerrando la conexión:', err);
      }
    }
  }
}

