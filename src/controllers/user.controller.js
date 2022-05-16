const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

exports.checkCredentials = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Check credentials
  User.checkCredentials(req.body.username, req.body.password, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with given credentials.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User"
        });
      }
    } else {
      // TODO: I think anyone could get the TOKEN_KEY by decripting the token with his username?
      const token = jwt.sign(
        { username: data.username },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      data['token'] = token;
      res.send(data);
    }
  });
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

    console.log(req.body);

  // Create an Anime
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    telefono: req.body.phone,
    immagine: req.body.image,
    amministratore: req.body.amministrator,
  });
  // Save Anime in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.status(201).send(data);
  });
};