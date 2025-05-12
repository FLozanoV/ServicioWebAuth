const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./db");
const routes = require("./routes");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/", routes);

app.listen(3000, () => console.log("🚀 Servidor corriendo en el puerto 3000"));
