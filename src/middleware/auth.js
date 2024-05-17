const { verify } = require("jsonwebtoken");

async function auth(req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res.status(401).json({ message: "Token de autorização não fornecido" });
        }

        const token = authorizationHeader.replace("Bearer ", ""); // Remover o prefixo "Bearer"

        req['payload'] = verify(token, process.env.SECRET_JWT);

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Autenticação Falhou!",
            cause: error.message
        });
    }
}

module.exports = { auth };