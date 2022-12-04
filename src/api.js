require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(
    cors({
        origin: "*",
    })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
/** ---------ROTAS------*/
const router = express.Router();

const route = require("./routers/route");
const pizzaRoute = require("./routers/pizzaRoutes");

app.use("/", route);
app.use("/pizza", pizzaRoute);

module.exports = app;
