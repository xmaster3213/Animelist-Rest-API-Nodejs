const fs = require('fs');

try {
  const dbRaw = fs.readFileSync('res/.local/db.json', 'utf8');
  db = JSON.parse(dbRaw);
  module.exports = {
    HOST: db.host,
    USER: db.user,
    PASSWORD: db.password,
    DB: db.name,
    PORT: db.port
  };
} catch (err) {
  console.error(err);
}