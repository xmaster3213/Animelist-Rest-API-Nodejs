const sql = require("./db.js");

const User = function(user) {
  this.username = user.username;
  this.password = user.password;
  this.email = user.email;
  this.telefono = user.telefono;
  this.immagine = user.immagine;
  this.amministratore = user.amministratore;
}

User.checkCredentials = (username, password, result) => {
  sql.query('SELECT * FROM account WHERE username = ? AND password = ?', [username, password], (err, res) => {
    if (err) {
     console.log('error ' + err);
     result(err, null);
     return;    
    }
    if (res.length) {
      console.log('found user: ' + res);
      result(null, res[0]);
      return;
    }
    result({kind: 'not_found'}, null);
  });  
};

User.create = (newUser, result) => {
  sql.query('INSERT INTO account SET ?', newUser, (err, res) => {
    if (err) {
      console.log('error ', err);
      result(err, null);
      return;
    }
    console.log('created user ', {id: res.id, ...newUser});
    result(null, {id: res.id, ...newUser});
  });
};

module.exports = User;