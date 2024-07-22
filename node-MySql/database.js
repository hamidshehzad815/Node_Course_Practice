const { createPool } = require("mysql");
const express = require("express");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

const pool = createPool({
  host: "127.0.0.1",
  user: "root",
  password: "mysqlpassword@442004",
  database: "Vidly",
  connectionLimit: 10,
});

// Route to get all movies
app.get("/api/movies", (req, res) => {
  const query = `SELECT * FROM movies`;

  pool.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(results);
  });
});

// Route to insert a new movie
app.post("/api/movies", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send("Missing required field: name");
  }

  const query = `INSERT INTO movies (name) VALUES (?)`;
  const values = [name];

  pool.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ id: results.insertId, name });
  });
});

// Function to create the movies table
function createTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS movies (
      Id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    )`;

  pool.query(createTableQuery, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log("Table created successfully");
  });
}

createTable();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is listening on port: ${port}`));
