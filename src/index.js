require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: [
    "http://localhost:8081",
    "http://localhost:3000"
  ]
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// add routers
require("./routes/character.routes.js")(app);
require("./routes/anime.routes.js")(app);
require("./routes/user.routes.js")(app);
// set port, listen for requests
const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});