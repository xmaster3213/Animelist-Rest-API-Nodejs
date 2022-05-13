const sql = require("./db.js");

const User = function(user) {
  this.username = user.username;
  this.password = user.password;
  this.email = user.email;
  this.phone = user.phone;
  this.image = user.image;
  this.amministrator = user.amministrator;
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

module.exports = User;