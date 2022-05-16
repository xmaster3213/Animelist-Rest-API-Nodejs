module.exports = app => {
  const character = require("../controllers/character.controller.js");
  const auth = require("../middleware/auth.js");
  var router = require("express").Router();
  
  // Get all characters with respective dubber of a given anime id
  router.get("/withDubber/:anime", character.withDubberFindByAnime);

  app.use('/api/character', router);
};