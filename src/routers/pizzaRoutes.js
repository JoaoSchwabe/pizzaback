const pizzaController = require("../controllers/pizzaController");
const { Router } = require("express");
const router = Router();
const { authMiddleware } = require("../middlewares/token");

router.get("/", (req, res) => {
    res.status(200).send("<h1>API Pizza <3</h1>");
});

router.get("/opcoes", authMiddleware, async (req, res) => {
    opcoes = await pizzaController.opcoes();
    res.status(200).send(opcoes);
});

router.post("/pizza", authMiddleware, async (req, res) => {
    pizza = await pizzaController.create(req.body, req.userId);
    res.status(200).send(pizza);
});

router.post("/endereco", authMiddleware, async (req, res) => {
    endereco = await pizzaController.endereco(req.body, req.userId);
    res.status(200).send(endereco);
});

router.put("/endereco", authMiddleware, async (req, res) => {
    endereco = await pizzaController.updateEnd(req.userId, req.body);
    res.status(200).send(endereco);
});

router.get("/pedidos", authMiddleware, async (req, res) => {
    pedidos = await pizzaController.pedidos();
    res.status(200).send(pedidos);
});

router.get("/profile", authMiddleware, async (req, res) => {
    pedidos = await pizzaController.profile(req.userId);
    res.status(200).send(pedidos);
});

router.get("/status", authMiddleware, async (req, res) => {
    stats = await pizzaController.getStatus();
    res.status(200).send(stats);
});

router.put("/pedidos/:id", authMiddleware, async (req, res) => {
    stats = await pizzaController.statusChange(req.params.id, req.body.status);
    res.status(200).send(stats);
});

router.delete("/delete/:id", authMiddleware, async (req, res) => {
    del = await pizzaController.delete(req.params.id);
    res.status(200).send(del);
});

router.get("/endereco/get", authMiddleware, async (req, res) => {
    endereco = await pizzaController.getEndereco(req.userId);
    if (endereco.length > 0) {
        res.status(200).send(endereco[0]);
    } else {
        res.status(200).send({ error: "Nenhum endereço encontrado" });
    }
});

router.post("/borda", authMiddleware, async (req, res) => {
    borda = await pizzaController.createBorda(req.body);
    if (borda.error) {
        res.status(200).send(borda[0]);
    } else {
        res.status(200).send(borda);
    }
});

router.post("/massa", authMiddleware, async (req, res) => {
    massa = await pizzaController.createMassa(req.body);
    if (massa.error) {
        res.status(400).send(massa);
    } else {
        res.status(200).send(massa);
    }
});

router.post("/sabor", authMiddleware, async (req, res) => {
    sabor = await pizzaController.createSabor(req.body);
    if (sabor.error) {
        res.status(400).send(sabor);
    } else {
        res.status(200).send(sabor);
    }
});

router.get("/grafico", authMiddleware, async (req, res) => {
    grafico = await pizzaController.Grafico();
    res.status(200).send(grafico);
});

module.exports = router;
