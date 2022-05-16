const Character = require("../models/character.model.js");

exports.withDubberFindByAnime = (req, res) => {
  Character.withDubberFindByAnime(req.params.anime, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Episodes with Anime id ${req.params.anime}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Episodes with Anime id " + req.params.anime
        });
      }
    } else res.send(data);
  });
};