const { Router } = require("express");
const Usuario = require("../models/Usuario");
const Destino = require("../models/Destino");
const { auth } = require("../middleware/auth");
const { verify } = require("jsonwebtoken");
const yup = require("yup");

const userRoute = new Router();

const userSchema = yup.object().shape({
  name: yup.string().required(),
  gender: yup.string().required(),
  cpf: yup.string().required().matches(/^\d+$/).length(11),
  address: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
  birth: yup.date().required(),
});

userRoute.post("/", async (req, res) => {
  try {
    await userSchema.validate(req.body, { abortEarly: false });

    const { name, gender, cpf, address, email, password, birth } = req.body;

    if (!name) {
      return res.status(400).json({ mensagem: "O nome é obrigatório" });
    }

    if (!gender) {
      return res.status(400).json({ mensagem: "Selecione seu genero" });
    }

    const existingUserCPF = await Usuario.findOne({
      where: {
        cpf: cpf,
      },
    });
    if (existingUserCPF) {
      return res.status(400).json({ message: "CPF já cadastrado" });
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

    const existingUserEmail = await Usuario.findOne({
      where: {
        email: email,
      },
    });
    if (existingUserEmail) {
      return res.status(400).json({ message: "Email já cadastrado" });
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
    if (error instanceof yup.ValidationError) {
      const yupErrors = error.inner.map((e) => ({
        field: e.path,
        message: e.message,
      }));
      return res.status(400).json({ errors: yupErrors });
    } else {
      console.log(error.message);
      return res.status(500).json({
        error: "Não foi possível cadastrar o usuário.",
      });
    }
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
    const { cpf, email } = req.body;

    await userSchema.validate(req.body, { abortEarly: false });

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não foi encontrado" });
    }

    if (cpf !== usuario.cpf) {
      const existingUserCPF = await Usuario.findOne({
        where: {
          cpf: cpf,
        },
      });
      if (existingUserCPF) {
        return res.status(400).json({ message: "CPF já cadastrado" });
      }
    }

    if (email !== usuario.email) {
      const existingUserEmail = await Usuario.findOne({
        where: {
          email: email,
        },
      });
      if (existingUserEmail) {
        return res.status(400).json({ message: "Email já cadastrado" });
      }
    }

    await usuario.update(req.body);
    await usuario.save();
    res.status(200).json({ message: "Alterado com sucesso!" });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const yupErrors = error.inner.map((e) => ({
        field: e.path,
        message: e.message,
      }));
      return res.status(400).json({ errors: yupErrors });
    } else {
      console.log(error.message);
      return res.status(500).json({ erro: "Erro ao atualizar o usuário" });
    }
  }
});

userRoute.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const userIdFromToken = req.payload.sub;
    const userIdToDelete = req.params.id;

    if (parseInt(userIdFromToken) !== parseInt(userIdToDelete)) {
      return res
        .status(403)
        .json({ error: "Você não tem permissão para excluir este usuário!" });
    }

    const usuario = await Usuario.findByPk(userIdToDelete);

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não foi encontrado" });
    }

    const destinosAssociados = await Destino.findAll({
      where: {
        user_id: id,
      },
    });
    if (destinosAssociados.length > 0) {
      return res.status(400).json({
        error:
          "Não é possível excluir o usuário, pois existem destinos associados a ele",
      });
    }

    await Usuario.destroy({
      where: {
        id: userIdToDelete,
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
