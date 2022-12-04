const mysql = require("mysql2/promise");
async function connect() {
    if (global.connection && global.connection.state !== "disconnected")
        return global.connection;

    const connection = await mysql.createConnection(process.env.DB_URL);
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}

async function query(sql) {
    const conn = await connect();
    const [rows] = await conn.query(sql);
    return rows;
}

module.exports = { query };
