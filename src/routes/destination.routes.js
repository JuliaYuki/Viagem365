const { Router } = require("express");
const Destino = require("../models/Destino");
const { auth } = require("../middleware/auth");
const axios = require("axios");

const destinationRoute = new Router();

destinationRoute.post("/", auth, async (req, res) => {
  try {
    const { destination, description, cep } = req.body;
    const user_id = req.payload.sub;

    if (!destination || !description || !user_id || !cep) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }

    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${cep}&format=json`
    );

    if (response.data && response.data.length > 0) {
      const { lat, lon } = response.data[0];

      const novoDestino = await Destino.create({
        destination,
        description,
        cep,
        latitude: lat,
        longitude: lon,
        user_id,
      });

      return res.status(201).json(novoDestino);
    } else {
      return res
        .status(404)
        .json({ error: "Nenhum resultado encontrado para o CEP fornecido." });
    }
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
    destino.description = description;

    await destino.save();

    return res.status(200).json(destino);
  } catch (error) {
    console.log("Erro ao obter informações do destino:", error);
    return res
      .status(500)
      .json({ error: "Não foi possível obter informações do destino" });
  }
});

destinationRoute.delete("/:destino_id", auth, async (req, res) => {
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

    await destino.destroy();

    return res.status(204).send();
  } catch (error) {
    console.log("Erro ao excluir destino:", error);
    return res
      .status(500)
      .json({ error: "Não foi possível excluir o destino" });
  }
});

module.exports = destinationRoute;
