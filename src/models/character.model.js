const sql = require("./db.js");

// constructor
const Character = function(character) {
  this.id_anime = character.id_anime;
  this.id_doppiatore = character.id_dubber;
  this.nome = character.name;
  this.descrizione = character.description;
  this.immagine = character.image;
};

Character.withDubberFindByAnime = (id, result) => {
  sql.query(`
    SELECT personaggio.id as character_id, personaggio.id_anime as character_id_anime, personaggio.nome AS character_name, personaggio.descrizione as character_description, personaggio.immagine AS character_image, doppiatore.id as dubber_id, doppiatore.nome AS dubber_name, doppiatore.immagine AS dubber_image, doppiatore.info AS dubber_info
    FROM personaggio
    LEFT JOIN doppiatore ON personaggio.id_doppiatore = doppiatore.id
    WHERE personaggio.id_anime = ?
  `, [id], (err, res) => {
    if (err) {
      console.log("error ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found characters: ", res);
      result(null, res);
      return;
    }
    result({kind: "not_found"}, null);
  });
};


module.exports = Character;