const { Router } = require("express");
const Usuario = require("../models/Usuario");
const { auth } = require("../middleware/auth") 
const { verify } = require("jsonwebtoken"); 

const userRoute = new Router();

userRoute.post("/", async (req, res) => {
  try {
    const name = req.body.name;
    const gender = req.body.gender;
    const cpf = req.body.cpf;
    const address = req.body.address;
    const email = req.body.email;
    const password = req.body.password;
    const birth = req.body.birth;

    if (!name) {
      return res.status(400).json({ mensagem: "O nome é obrigatório" });
    }

    if (!gender) {
      return res.status(400).json({ mensagem: "Selecione seu genero" });
    }

    if (!cpf) {
      return res.status(400).json({ mensagem: "Campo CPF obrigatório" });
    }

    if (!address) {
      return res.status(400).json({ mensagem: "Endereço é obrigatório" });
    }

    if (!birth.match(/\d{4}-\d{2}-\d{2}/gm)) {
      return res.status(400).json({
        erro: "A data de nascimento deve estar no formato AAAA-MM-DD",
      });
    }

    const usuario = await Usuario.create({
      name,
      gender,
      cpf,
      address,
      email,
      password,
      birth,
    });
    res.status(201).json(usuario);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: "Não foi possível cadastrar o usuario.",
    });
  }
});


userRoute.get("/", async (req, res) => {
  try {
    // Verifica se há um token de autorização na solicitação
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1]; // Extrai o token da string "Bearer <token>"
      const decodedToken = verify(token, process.env.SECRET_JWT); // Decodifica o token
      
      // Verifica se o token é válido
      if (!decodedToken) {
        return res.status(401).json({ message: "Token inválido" });
      }
      
      const userId = decodedToken.sub; // Obtém o ID do usuário do payload do token
      const usuario = await Usuario.findByPk(userId); // Busca o usuário no banco de dados usando o ID

      if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
      }

      return res.json(usuario); // Retorna o usuário encontrado
    } else {
      // Se não houver um token de autorização, busca todos os usuários no banco de dados
      const usuarios = await Usuario.findAll();

      return res.json(usuarios); // Retorna todos os usuários
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Não foi possível buscar os usuários" });
  }
});

userRoute.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não foi encontrado" });
    }

    res.json(usuario);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: "Não foi possível localizar o usuário",
      error: error,
    });
  }
});

userRoute.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não foi encontrado" });
    }

    await usuario.update(req.body);
    await usuario.save();
    res.status(200).json({ message: "Alterado com sucesso!" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ erro: "Erro ao atulizar o usuário" });
  }
});

userRoute.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não foi encontrado" });
    }

    Usuario.destroy({
      where: {
        id: id,
      },
    });

    res.status(204).json({ message: "Usuário deletado com sucesso!" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ error: "Não foi possível encontrar o usuário", error: error });
  }
});

module.exports = userRoute;
