module.exports = app => {
  const user = require("../controllers/user.controller.js");
  var router = require("express").Router();
  // Create a new Anime
  router.post("/check_credentials/", user.checkCredentials);

  app.use('/api/user', router);
};