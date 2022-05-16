module.exports = app => {
    const anime = require("../controllers/anime.controller.js");
    const auth = require("../middleware/auth.js");
    var router = require("express").Router();
    
    // Create a new Anime
    // Need authentication
    router.post("/", auth, anime.create);
    // Get all anime
    router.get("/", anime.getAll);
    // Get an anime by his id
    router.get("/:id", anime.findById);

    app.use('/api/anime', router);
  };