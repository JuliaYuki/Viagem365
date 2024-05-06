const { Router } = require("express"); 
const Aluno = require("../models/Aluno");
const Curso = require("../models/Curso");

const routes = new Router();

// GET - Lista alguma coisa
// POST - Criar/adicionar algo
// PUT - Atualizar algo
// DELETE - Deleta algo
// PATCH - depois

// criar uma rota
// tipo
// path
// implementacao

routes.get("/bem_vindo", async (req, res) => {
  res.json({ name: "Bem vindo" });
});

routes.post("/alunos", async (req, res) => {
  try {
    const nome = req.body.nome;
    const data_nascimento = req.body.data_nascimento;
    const celular = req.body.celular;

    if (!nome) {
      return res.status(400).json({
        message: "O nome é obrigatório.",
      });
    }

    if (!data_nascimento.match(/\d{4}-\d{2}-\d{2}/gm)) {
      return res
        .status(400)
        .json({ message: "A data de nascimento não está no formato válido." });
    }

    // if (!data_nascimento) {
    //   return res.status(400).json({
    //     message: "A data de nascimento é obrigatória.",
    //   });
    // }

    const aluno = await Aluno.create({
      nome: nome,
      data_nascimento: data_nascimento,
      celular: celular,
    });
    res.status(201).json(aluno);
  } catch (error) {
    console.log(error.message);
    res.stauts(500).json({
      error: "Não foi possível cadastrar o aluno.",
    });
  }
});

routes.get("/alunos", async (req, res) => {
  const alunos = await Aluno.findAll();
  res.json(alunos);
});

routes.post("/cursos", async (req, res) => {
  // Exercicio 01 Semana11
  try {
    const nome = req.body.nome;
    const duracao_horas = req.body.duracao_horas;

    if (!nome) {
      return res.status(400).json({ message: "O nome é obrigatório." });
    }

    if (!(duracao_horas >= 40 && duracao_horas <= 200)) {
      return res
        .status(400)
        .json({ message: "A duração deve ser entre 40 e 200 horas" });
    }

    const curso = await Curso.create({
      nome: nome,
      duracao_horas: duracao_horas,
    });
    res.status(201).json(curso);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Não foi possível cadastrar o curso." });
  }
});

routes.get("/cursos", async (req, res) => {
  // Exercicio 02 e 03 Semana11
  let params = {}

  if(req.query.nome) {
    params = {...params, nome: req.query.nome}
  }

  const cursos = await Curso.findAll({
    where: params
  });
  res.json(cursos);
});

routes.delete("/alunos/:id", (req, res) => {
  const id = req.params.id;

  Aluno.destroy({
    where: {
      id: id
    }
  })
  res.status(204).json({});
});

routes.delete("/cursos/:id", (req, res) => {
  // Exercicio 05 da Semana11
  const id = req.params.id

  Curso.destroy({
    where: {
      id: id
    }
  })
  res.status(204).json({})
})

routes.put("/cursos/:id", async (req, res) => {
  // Exercicio 04 da Semana11
  const id = req.params.id

  const curso = await Curso.findByPk(id)

  if(!curso) {
    return res.status(404).json({ mensagem: 'Curso não encontrado.'})
  }
  curso.update(req.body)

  await curso.save()

  res.json(curso)
})


//A partir daqui Exercicio 06 da Semana 11
routes.post("/professores", async (req, res) => {
  try {
    const nome = req.body.nome
    const cargo = req.body.cargo

    if(!nome) {
      return res.status(400).json({ messagem: "O nome é obrigatório."})
    }

    if(!cargo) {
      return res.status(400).json({ message: "O cargo é obrigatório."})
    }

    const professor = await Professor.create({
      nome: nome,
      cargo: cargo
    })

    res.status(201).json(professor)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: "Não é possível cadastrar o professor."})
  }
})

routes.get("/professores", async (req, res) => {
  let params = {}

  if(req.query.nome) {
    params = {...params, nome: req.query.nome}
  }

  const professor = await Professor.findAll({
    where: params
  })

  res.json(professor)
})

routes.put("/professores/:id", async (req, res) => {
  const id = req.params.id

  const professor = await Professor.findByPk(id)

  if(!professor) {
    return res.status(404).json({ message: "Professor não encontrado."})
  }
  professor.update(req.body)

  await professor.save()

  res.json(professor)
})

routes.delete("/professores/:id", (req, res) => {
  const {id} = req.params

  Professor.destroy({
    where: {
      id: id
    }
  })

  res.status(204).json({})
})

module.exports = routes;
