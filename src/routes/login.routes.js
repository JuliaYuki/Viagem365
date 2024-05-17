const { Router, query } = require("express");
const Usuario = require("../models/Usuario");

const { sign } = require("jsonwebtoken");

const loginRoutes = new Router();

/**
 * @swagger
 * tags:
 *   name: Login
 *   description: Rotas para autenticação
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Autenticação de usuário
 *     tags: [Login]
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: credenciais
 *         description: Credenciais de login
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               description: Email do usuário
 *             password:
 *               type: string
 *               description: Senha do usuário
 *     responses:
 *       200:
 *         description: Token JWT gerado
 *         schema:
 *           type: object
 *           properties:
 *             Token:
 *               type: string
 *               description: Token JWT
 *       400:
 *         description: Erro na validação dos dados
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao autenticar o usuário
 */


loginRoutes.post("/", async (req, res) => {

    try {
    const email = req.body.email;
    const password = req.body.password;

    if (!email) {
      return res.status(400).json({ error: "Informe o email" });
    }

    if (!password) {
      return res.status(400).json({ error: "Informe sua senha" });
    }

    const usuario = await Usuario.findOne({
      where: { email:email, password:password },
    });

    if (!usuario) {
      return res
        .status(404)
        .json({
          error: "Nenhum usuário corresponde ao email e senha informados",
        });
    }

    const payload = {sub:usuario.id, email:usuario.email, name:usuario.name}

    const token = sign(payload, process.env.SECRET_JWT)

    res.status(200).json({Token: token})

  } catch (error) {
    return res.status(500).json({error: error, message: "Algo deu errado"})
  }
});

module.exports = loginRoutes;
