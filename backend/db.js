const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",  // Si usas un servidor remoto, reemplázalo con la IP
    user: "root",       // Usuario de MySQL
    password: "1234",  // Reemplázalo con tu contraseña de MySQL
    database: "authDB"
});

db.connect(err => {
    if (err) {
        console.error("❌ Error de conexión:", err);
    } else {
        console.log("✅ Conectado a MySQL con HeidiSQL.");
    }
});

module.exports = db;
