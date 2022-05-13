module.exports = app => {
    const anime = require("../controllers/anime.controller.js");
    const auth = require("../middleware/auth.js");
    var router = require("express").Router();
    // Create a new Anime
    router.post("/", auth, anime.create);
    router.get("/", anime.getAll);
    router.get("/:id", anime.findById);

    app.use('/api/anime', router);
  };