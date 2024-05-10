const { Router } = require("express");
const Destino = require("../models/Destino");
const { auth } = require("../middleware/auth");

const destinationRoute = new Router();

destinationRoute.post("/", async (req, res) => {
  try {
    const { destination, description, user_id } = req.body;

    if (!destination || !description || !user_id) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }

    const novoDestino = await Destino.create({
      destination,
      description,
      user_id,
    });

    return res.status(201).json(novoDestino);
  } catch (error) {
    console.log("Erro ao cadastrar destino:", error);
    return res
      .status(500)
      .json({ error: "Não foi possível cadastrar o destino" });
  }
});

module.exports = destinationRoute;
