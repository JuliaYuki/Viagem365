const { Router } = require("express");
const Destino = require("../models/Destino");
const { auth } = require("../middleware/auth");

const destinationRoute = new Router();

destinationRoute.post("/", auth, async (req, res) => {
  try {
    const { destination, description } = req.body;
    const user_id = req.payload.sub;

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

destinationRoute.get("/", auth, async (req, res) => {
  try {
    const user_id = req.payload.sub;
    const destinos = await Destino.findAll({
      where: {
        user_id: user_id,
      },
    });

    return res.status(200).json(destinos);
  } catch (error) {
    console.log("Erro ao listar destinos:", error);
    return res
      .status(500)
      .json({ error: "Não foi possível listar os destinos" });
  }
});

destinationRoute.get("/:destino_id", auth, async (req, res) => {
  try {
    const user_id = req.payload.sub;
    const destino_id = req.params.destino_id;

    const destino = await Destino.findOne({
      where: {
        id: destino_id,
        user_id: user_id,
      },
    });

    if (!destino) {
      return res.status(404).json({ error: "Destino não encontrado!" });
    }

    return res.status(200).json(destino);
  } catch (error) {
    console.log("Erro ao obter informações do destino:", error);
    return res
      .status(500)
      .json({ error: "Não foi possível obter informações do destino" });
  }
});

destinationRoute.put("/:destino_id", auth, async (req, res) => {
  try {
    const user_id = req.payload.sub;
    const destino_id = req.params.destino_id;
    const { destination, description } = req.body;

    const destino = await Destino.findOne({
      where: {
        id: destino_id,
        user_id: user_id,
      },
    });

    if (!destino) {
      return res.status(404).json({ error: "Destino não encontrado!" });
    }

    destino.destination = destination;
    destino.destination = description;

    await destino.save();

    return res.status(200).json(destino);
  } catch (error) {
    console.log("Erro ao obter informações do destino:", error);
    return res
      .status(500)
      .json({ error: "Não foi possível obter informações do destino" });
  }
});

module.exports = destinationRoute;
