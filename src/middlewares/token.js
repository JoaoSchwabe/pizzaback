const { verify } = require("jsonwebtoken");

exports.authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "Token not provided" });
    }

    const [bearer, token] = authorization.split(" ");

    try {
        const decoded = verify(token, process.env.SECRET);
        const { id } = decoded;
        req.userId = id;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Token invalid" });
    }
};
