const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const makup = require("./utils/makup");
const usersRouter = require("./routes/user");
const cardRouter = require("./routes/card");

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/aroundb");

app.use("/users", usersRouter);
app.use("/cards", cardRouter);

app.use((req, res, next) => {
  res.status(404).send(makup);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Ocurrió un error interno en el servidor" });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
