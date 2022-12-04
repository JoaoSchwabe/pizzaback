const mysql = require("./mysqlConnect");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
get = async () => {
    const users = await mysql.query(
        "SELECT id, name, email, type FROM usuario"
    );
    return users;
};

login = async (data) => {
    const user = await mysql.query(
        `SELECT idUser, name, email, password, type FROM usuario WHERE email = '${data.email}'`
    );
    if (user.length > 0) {
        if (bcrypt.compareSync(data.password, user[0].password)) {
            const token = jwt.sign({ id: user[0].idUser }, process.env.SECRET, {
                expiresIn: 60 * 60 * 24,
            });
            return {
                auth: true,
                token: token,
                user: {
                    id: user[0].idUser,
                    name: user[0].name,
                    email: user[0].email,
                    type: user[0].type,
                },
            };
        } else {
            return { auth: false, message: "Senha inválida." };
        }
    } else {
        return { auth: false, message: "Usuário não encontrado." };
    }
};

register = async (data, res) => {
    const user = await mysql.query(
        `SELECT idUser, name, email, type FROM usuario WHERE email = '${data.email}'`
    );
    if (user.length > 0) {
        res.status(401).send({ auth: false, message: "Usuário já existe!" });
    } else {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(data.password, salt);
        const newUser = await mysql.query(
            `INSERT INTO usuario (name, email, password, type) VALUES ('${data.name}', '${data.email}', '${hash}', 'cliente')`
        );
        if (newUser != null) {
            sql = `SELECT idUser, name, email, type FROM usuario WHERE email = '${data.email}'`;
            const user = await mysql.query(sql);
            const token = jwt.sign({ id: user[0].idUser }, process.env.SECRET, {
                expiresIn: 1800,
            });
            res.status(200).send({
                auth: true,
                message: "Usuário criado!",
                token: token,
            });
        } else {
            res.status(401).send({
                auth: false,
                message: "Erro ao criar usuário!",
            });
        }
    }
};

//função que verifica se o JWT é ok
verifyJWT = (token) => {
    if (!token) {
        resp = { auth: false, message: "Token não informado." };
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            resp = { auth: false, message: "Token inválido." };
        }
        if (decoded) {
            resp = { auth: true, idUser: decoded.id };
        }
    });
    return resp;
};

module.exports = { get, login, register, verifyJWT };
