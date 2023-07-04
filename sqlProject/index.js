const express = require("express");
const connection = require("./db/dbConfig.js");
const app = express();
const port = 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

function getOrdersPast7Days(callback) {
  const today = new Date();
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const query = `SELECT * FROM orders WHERE createdAt >= '${sevenDaysAgo}'`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return callback(error, null);
    }

    return callback(null, results);
  });
}

app.get("/getOrdersPast7Days", (req, res) => {
  getOrdersPast7Days((error, results) => {
    if (error) {
      res.status(500).json(error);
    }

    res.status(200).json(results);
  });
});

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

connection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("connected to database");
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
});
