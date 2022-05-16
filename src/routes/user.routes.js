module.exports = app => {
  const user = require("../controllers/user.controller.js");
  var router = require("express").Router();

  // Create a new user with role user
  router.post("/", user.create);
  // Return user infos and session token on correct credentials
  router.post("/check_credentials/", user.checkCredentials);
  

  app.use('/api/user', router);
};