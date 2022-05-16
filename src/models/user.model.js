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
    console.log('created user ', {...newUser});
    result(null, {...newUser});
  });
};

User.findByUsername = (username, result) => {
  sql.query('SELECT * FROM account WHERE username = ?', [username], (err, res) => {
    if (err) {
      console.log('error ', err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log('found user ', res[0]);
      result(null, res[0]);
      return;
    }
    result('not_found', null);
  });
};

module.exports = User;