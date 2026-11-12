require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const restaurantRoutes = require("./modules/restaurants/restaurant.routes");
const authRoutes = require("./modules/auth/auth.routes");

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Arquivos estáticos (front-end em /public)
app.use(express.static(path.join(__dirname, "..", "public")));

// Rotas da aplicação
app.use("/restaurants", restaurantRoutes);
app.use("/auth", authRoutes);

module.exports = app;
