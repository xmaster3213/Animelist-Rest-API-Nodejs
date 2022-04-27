module.exports = app => {
    const anime = require("../controllers/anime.controller.js");
    var router = require("express").Router();
    // Create a new Anime
    router.post("/", anime.create);

    app.use('/api/anime', router);
  };