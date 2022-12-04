const mysql = require("./mysqlConnect");

get = async () => {
    const pizzas = await mysql.query("SELECT * FROM pizza");
    return pizzas;
};

opcoes = async () => {
    const massas = await mysql.query("SELECT * FROM massas");
    const sabores = await mysql.query("SELECT * FROM sabores");
    const bordas = await mysql.query("SELECT * FROM bordas");

    const coisas = {
        massas,
        sabores,
        bordas,
    };

    return coisas;
};

create = async (pizza, id) => {
    sql = `INSERT INTO pizza (idMassas, idBordas, idUser) VALUES (${pizza.massa}, ${pizza.borda}, ${id})`;
    const novaPizza = await mysql.query(sql);
    pizza.sabores.forEach(async (sabor) => {
        sql2 = `INSERT INTO pizza_sabor (idSabores, idPizza) VALUES (${sabor}, ${novaPizza.insertId})`;
        await mysql.query(sql2);
    });

    sql3 = `INSERT INTO pedidos (idPizza, idStatus) VALUES (${novaPizza.insertId}, 1)`;
    await mysql.query(sql3);
    return novaPizza;
};

endereco = async (endereco, id) => {
    sql = `INSERT INTO endereco (rua, numero, bairro, cidade, estado, cep, idUser) VALUES ('${endereco.rua}', '${endereco.numero}', '${endereco.bairro}', '${endereco.cidade}', '${endereco.estado}', '${endereco.cep}', ${id})`;
    await mysql.query(sql);

    sql = `SELECT * FROM endereco WHERE idUser = ${id}`;
    const enderecoCriado = await mysql.query(sql);

    return enderecoCriado;
};

updateEnd = async (idUser, endereco) => {
    sql = `UPDATE endereco SET rua = '${endereco.rua}', numero = '${endereco.numero}', bairro = '${endereco.bairro}', cidade = '${endereco.cidade}', estado = '${endereco.estado}', cep = '${endereco.cep}' WHERE idUser = ${idUser}`;
    await mysql.query(sql);

    sql = `SELECT * FROM endereco WHERE idUser = ${idUser}`;
    const enderecoCriado = await mysql.query(sql);

    return enderecoCriado;
};

pedidos = async () => {
    sql = `SELECT * FROM pizza`;
    const pedidos = await mysql.query(sql);

    const pedido = pedidos.map(async (pedido) => {
        sql = `SELECT * FROM pizza_sabor WHERE idPizza = ${pedido.idPizza}`;
        const sabores = await mysql.query(sql);

        const sabor = sabores.map(async (sabor) => {
            sql = `SELECT * FROM sabores WHERE idSabores = ${sabor.idSabores}`;
            const saborNome = await mysql.query(sql);
            return saborNome;
        });

        const saborNome = await Promise.all(sabor);

        sql = `SELECT * FROM massas WHERE idMassas = ${pedido.idMassas}`;
        const massa = await mysql.query(sql);

        sql = `SELECT * FROM bordas WHERE idBordas = ${pedido.idBordas}`;
        const borda = await mysql.query(sql);

        sql = `SELECT * FROM pedidos WHERE idPizza = ${pedido.idPizza}`;
        const stts = await mysql.query(sql);

        sql = `SELECT * FROM status WHERE idStatus = ${stts[0].idStatus}`;
        const status = await mysql.query(sql);

        sql = `SELECT * FROM endereco WHERE idUser = ${pedido.idUser}`;
        const endereco = await mysql.query(sql);

        sql = `SELECT * FROM usuario WHERE idUser = ${pedido.idUser}`;
        const user = await mysql.query(sql);

        const pedidoCompleto = {
            id: pedido.idPizza,
            user: user[0].name,
            massa: massa[0].tipo,
            borda: borda[0].tipo,
            sabores: saborNome.map((sabor) => sabor[0].nome),
            idStatus: status[0].idStatus,
            status: status[0].tipo,
            endereco:
                endereco[0].rua +
                ", " +
                endereco[0].numero +
                ", " +
                endereco[0].bairro +
                ", " +
                endereco[0].cidade +
                ", " +
                endereco[0].estado +
                ", " +
                endereco[0].cep,
        };

        return pedidoCompleto;
    });

    const pedidoCompleto = await Promise.all(pedido);

    return pedidoCompleto;
};

statusChange = async (idPizza, idStatus) => {
    sql = `UPDATE pedidos SET idStatus = ${idStatus} WHERE idPizza = ${idPizza}`;
    await mysql.query(sql);

    return "Status alterado com sucesso";
};

getStatus = async () => {
    sql = `SELECT * FROM status`;
    const stats = await mysql.query(sql);

    return stats;
};

del = async (idPizza) => {
    sql = `DELETE FROM pedidos WHERE idPizza = ${idPizza}`;
    await mysql.query(sql);

    sql = `DELETE FROM pizza_sabor WHERE idPizza = ${idPizza}`;
    await mysql.query(sql);

    sql = `DELETE FROM pizza WHERE idPizza = ${idPizza}`;
    await mysql.query(sql);

    return "Pedido deletado com sucesso";
};

getEndereco = async (idUser) => {
    sql = `SELECT * FROM endereco WHERE idUser = ${idUser}`;
    const endereco = await mysql.query(sql);

    if (endereco.length === 0) {
        return false;
    }

    return endereco;
};

createSabor = async (sabor) => {
    sql = `INSERT INTO sabores (nome) VALUES ('${sabor.sabor}')`;
    await mysql.query(sql);

    return true;
};

createMassa = async (massa) => {
    sql = `INSERT INTO massas (tipo) VALUES ('${massa.massa}')`;
    await mysql.query(sql);

    return true;
};

createBorda = async (borda) => {
    sql = `INSERT INTO bordas (tipo) VALUES ('${borda.borda}')`;
    await mysql.query(sql);

    return true;
};

Grafico = async () => {
    sql =
        "select s.nome, COUNT(ps.idSabores) as quant from pizza_sabor ps, sabores s where s.idSabores = ps.idSabores group by nome;";

    const grafico = await mysql.query(sql);

    return grafico;
};

profile = async (idUser) => {
    sql = `SELECT * FROM pizza WHERE idUser = ${idUser}`;
    const pedidos = await mysql.query(sql);

    const pedido = pedidos.map(async (pedido) => {
        sql = `SELECT * FROM pizza_sabor WHERE idPizza = ${pedido.idPizza}`;
        const sabores = await mysql.query(sql);

        const sabor = sabores.map(async (sabor) => {
            sql = `SELECT * FROM sabores WHERE idSabores = ${sabor.idSabores}`;
            const saborNome = await mysql.query(sql);
            return saborNome;
        });

        const saborNome = await Promise.all(sabor);

        sql = `SELECT * FROM massas WHERE idMassas = ${pedido.idMassas}`;
        const massa = await mysql.query(sql);

        sql = `SELECT * FROM bordas WHERE idBordas = ${pedido.idBordas}`;
        const borda = await mysql.query(sql);

        sql = `SELECT * FROM pedidos WHERE idPizza = ${pedido.idPizza}`;
        const stts = await mysql.query(sql);

        sql = `SELECT * FROM status WHERE idStatus = ${stts[0].idStatus}`;
        const status = await mysql.query(sql);

        const pedidoCompleto = {
            id: pedido.idPizza,
            massa: massa[0].tipo,
            borda: borda[0].tipo,
            sabores: saborNome.map((sabor) => sabor[0].nome),
            idStatus: status[0].idStatus,
            status: status[0].tipo,
        };

        return pedidoCompleto;
    });

    const pedidoCompleto = await Promise.all(pedido);

    return pedidoCompleto;
};

module.exports = {
    get,
    opcoes,
    create,
    endereco,
    pedidos,
    getStatus,
    statusChange,
    del,
    getEndereco,
    updateEnd,
    createSabor,
    createMassa,
    createBorda,
    Grafico,
    profile,
};
