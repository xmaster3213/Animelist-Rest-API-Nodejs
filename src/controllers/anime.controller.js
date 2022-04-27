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
    durata_episodio: req.body.durata_episodio,
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
    else res.send(data);
  });
};