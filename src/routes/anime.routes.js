module.exports = app => {
    const anime = require("../controllers/anime.controller.js");
    var router = require("express").Router();
    // Create a new Anime
    router.post("/", anime.create);
    router.get("/", anime.getAll);

    app.use('/api/anime', router);
  };