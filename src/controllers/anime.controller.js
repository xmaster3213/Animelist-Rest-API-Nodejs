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
    nome: req.body.name,
    studio: req.body.studio,
    trama: req.body.plot,
    durata_episodi: req.body.duration_episodes,
    voto_medio: req.body.avg_score,
    data_rilascio: req.body.release_date,
    numero_episodi: req.body.episodes_number,
    immagine_copertina: req.body.cover_image,
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