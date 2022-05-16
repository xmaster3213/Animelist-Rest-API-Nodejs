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
    else {
      const token = jwt.sign(
        { username: req.body.username },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      data['token'] = token;
      res.status(201).send(data)
    };
  });
};

exports.findById = (req, res) => {
  if (req.params.username !== req.user.username) {
    res.status(401).send('Invalid Token for requested User');
    return;
  }
  User.findByUsername(req.params.username, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with username ${req.params.username}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with username " + req.params.username
        });
      }
    } else res.send(data);
  });
};