const config = process.env;

module.exports = {
  HOST: config.DB_HOST,
  USER: config.DB_USER,
  PASSWORD: config.DB_PASSWORD,
  DB: config.DB_NAME,
  PORT: config.DB_PORT
};
