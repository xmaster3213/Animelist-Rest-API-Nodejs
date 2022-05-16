module.exports = app => {
  const user = require("../controllers/user.controller.js");
  const auth = require("../middleware/auth.js");
  var router = require("express").Router();

  // Create a new user with role user
  router.post("/", user.create);
  // Return user infos and session token on correct credentials
  router.post("/check_credentials/", user.checkCredentials);
  // Get infos of given user
  // Need authentication and given username must be equal to token username
  router.get("/:username", auth, user.findById);

  app.use('/api/user', router);
};