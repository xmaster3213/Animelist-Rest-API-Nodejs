const Anime = require("../models/anime.model.js");

// Create and Save a new Anime
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create an Anime
  const anime = new Anime({
    nome: req.body.nome,
    studio: req.body.studio,
    trama: req.body.trama,
    durata_episodi: req.body.durata_episodi,
    voto_medio: req.body.voto_medio,
    data_rilascio: req.body.data_rilascio,
    numero_episodi: req.body.numero_episodi,
    immagine_copertina: req.body.immagine_copertina,
    trailer: req.body.trailer
  });
  // Save Anime in the database
  Anime.create(anime, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Anime."
      });
    else res.status(201).send(data);
  });
};

exports.getAll = (req, res) => {
  Anime.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retriving the animes."
      })
    } else {
      res.send(data)
    }
  });
}

exports.findById = (req, res) => {
  Anime.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Anime with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Anime with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};