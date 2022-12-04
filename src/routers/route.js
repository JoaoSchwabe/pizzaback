const userController = require("../controllers/userController");
const { Router } = require("express");
const router = Router();
const { verifyJWT } = require("../controllers/userController");

router.get("/", verifyJWT, (req, res) => {
    res.status(200).send("<h1>API Pizza <3</h1>");
});

router.get("/user", async (req, res) => {
    user = await userController.get();
    res.status(200).send(user);
});

router.post("/login", async (req, res) => {
    user = await userController.login(req.body);
    res.status(200).send(user);
});
router.post("/register", async (req, res) => {
    user = await userController.register(req.body, res);
    res.status(200).send(user);
});

module.exports = router;
