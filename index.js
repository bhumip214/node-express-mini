// implement your API here

const express = require("express");

const server = express();

const db = require("./data/db.js");

server.use(express.json());

// GET request
server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json({ users });
    })
    .catch(err => {
      res.status(500).json({
        message: "The users information could not be retrieved."
      });
    });
});

//GET by ID request
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(users => {
      if (user) {
        res.status(200).json({ users });
      } else {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "The users information could not be retrieved."
      });
    });
});

// DELETE request
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params.id;

  db.remove(id)
    .then(user => {
      if (user) {
        res.status(204).end();
      } else {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The user could not be removed" });
    });
});

server.listen(4000, () => {
  console.log("\n*** Running on Port 4000 ***\n");
});
