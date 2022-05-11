const sql = require("./db.js");

// constructor
const Anime = function(anime) {
  this.nome = anime.nome;
  this.studio = anime.studio;
  this.trama = anime.trama;
  this.durata_episodi = anime.durata_episodi;
  this.voto_medio = anime.voto_medio;
  this.data_rilascio = anime.data_rilascio;
  this.numero_episodi = anime.numero_episodi;
  this.immagine_copertina = anime.immagine_copertina;
  this.trailer = anime.trailer;
};

Anime.create = (newAnime, result) => {
  sql.query("INSERT INTO anime SET ?", newAnime, (err, res) => {
    if (err) {
      console.log("error ", err);
      // result(err, res)
      result(err, null);
      return;
    }
    console.log("created anime: ", {id: res.id, ...newAnime});
    result(null, {id: res.id, ...newAnime});
  });
};

Anime.getAll = (result) => {
  sql.query("SELECT * FROM anime", (err, res) => {
    if (err) {
      console.log("error ", err);
      result(err, null);
      return;
    }
    console.log("animes: ", res);
    result(null, res);
  });
};

Anime.findById = (id, result) => {
  sql.query("SELECT * FROM anime WHERE ID = ?", [id], (err, res) => {
    if (err) {
      console.log("error ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found anime: ", res);
      result(null, res[0]);
      return;
    }
    result({kind: "not_found"}, null);
  });
};

module.exports = Anime;