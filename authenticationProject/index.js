require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user.js");
const homeRoutes = require("./routes/home.js");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/user", userRoutes);
app.use("/api/home", homeRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected...");
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}...`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
