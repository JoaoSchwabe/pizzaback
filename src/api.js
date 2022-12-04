require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    app.use(cors());
    next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
/** ---------ROTAS------*/
const router = express.Router();

const route = require("./routers/route");
const pizzaRoute = require("./routers/pizzaRoutes");

app.use("/", route);
app.use("/pizza", pizzaRoute);

module.exports = app;
