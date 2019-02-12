// implement your API here

const express = require("express");

const server = express();

const db = require("./data/db.js");

server.use(express.json());

// GET request
server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({
        message: "The users information could not be retrieved."
      });
    });
});

//GET by ID request
server.get("/api/users/:id", (req, res) => {
  db.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
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

// POST request

server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;
  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    db.insert({ name, bio })
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        res.status(500).json({
          error: "The users information could not be retrieved."
        });
      });
  }
});

// DELETE request
server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;

  db.remove(id)
    .then(user => {
      if (user) {
        res.status(204).json({ message: "The user is successfully deleted" });
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

// UPDATE request
server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const user = req.body;
  if (user.name && user.bio) {
    db.update(id, user)
      .then(count => {
        if (count) {
          db.findById(id).then(user => {
            res.json(user);
          });
        } else {
          res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
        }
      })
      .catch(() => {
        res
          .status(500)
          .json({ error: "The user information could not be modified." });
      });
  }
});

server.listen(4000, () => {
  console.log("\n*** Running on Port 4000 ***\n");
});
