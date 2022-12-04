const jwt = require("jsonwebtoken");

const pizzaModel = require("../models/pizzaModel");

exports.opcoes = async () => {
    const coisas = await pizzaModel.opcoes();
    return coisas;
};

exports.create = async (pizza, userId) => {
    const novaPizza = await pizzaModel.create(pizza, userId);

    return novaPizza;
};

exports.endereco = async (endereco, id) => {
    const novoEndereco = await pizzaModel.endereco(endereco, id);

    return novoEndereco;
};
exports.updateEnd = async (id, endereco) => {
    const novoEndereco = await pizzaModel.updateEnd(id, endereco);

    return novoEndereco;
};

exports.pedidos = async () => {
    const pedidos = await pizzaModel.pedidos();

    return pedidos;
};

exports.statusChange = async (idPizza, idStatus) => {
    const status = await pizzaModel.statusChange(idPizza, idStatus);

    return status;
};

exports.getStatus = async () => {
    const stats = await pizzaModel.getStatus();

    return stats;
};

exports.delete = async (id) => {
    const del = await pizzaModel.del(id);

    return del;
};

exports.getEndereco = async (id) => {
    const endereco = await pizzaModel.getEndereco(id);

    return endereco;
};

exports.createBorda = async (borda) => {
    const novaBorda = await pizzaModel.createBorda(borda);

    return novaBorda;
};

exports.createMassa = async (massa) => {
    const novaMassa = await pizzaModel.createMassa(massa);

    return novaMassa;
};

exports.createSabor = async (sabor) => {
    const novoSabor = await pizzaModel.createSabor(sabor);

    return novoSabor;
};

exports.Grafico = async () => {
    const grafico = await pizzaModel.Grafico();

    return grafico;
};

exports.profile = async (id) => {
    const pedidos = await pizzaModel.profile(id);

    return pedidos;
};
