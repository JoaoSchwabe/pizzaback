const userModel = require("../models/userModel");

exports.get = async () => {
    return await userModel.get();
};
exports.login = async (data) => {
    return await userModel.login(data);
};
exports.register = async (data, res) => {
    return await userModel.register(data, res);
};

exports.verifyJWT = (req, res, next) => {
    const { auth } = userModel.verifyJWT(req.headers["x-access-token"]);

    if (auth === true) {
        next();
    } else {
        res.status(401).send({ auth: false, message: "Token inválido." });
    }
};
