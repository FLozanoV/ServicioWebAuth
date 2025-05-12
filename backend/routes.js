const express = require("express");
const db = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Registro de usuario
router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword], (err, result) => {
        if (err) return res.status(500).json({ error: "Error al registrar usuario." });
        res.json({ message: "✅ Usuario registrado exitosamente." });
    });
});
// Inicio de sesión
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    db.query("SELECT * FROM users WHERE username = ?", [username], async (err, results) => {
        if (err || results.length === 0) return res.status(400).json({ error: "❌ Usuario no encontrado." });

        const user = results[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ error: "❌ Error en la autenticación." });

        const token = jwt.sign({ username: user.username }, "secretKey", { expiresIn: "1h" });
        res.json({ message: "✅ Autenticación satisfactoria.", token });
    });
});

module.exports = router; // ⚠️ Asegúrate de que estás exportando el `router`
