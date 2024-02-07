const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const makup = require("./utils/makup");
const usersRouter = require("./routes/user");
const cardRouter = require("./routes/card");
const logger = require("./middleware/logger");
const cors = require("cors");
require("dotenv").config();

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors());
app.options("*", cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/aroundb");

app.use(logger.requestLogger);

app.use("/users", usersRouter);
app.use("/cards", cardRouter);

app.use(logger.errorLogger);

app.use((req, res, next) => {
  res.status(404).send(makup);
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).res.send({
    messege:
      statusCode === 500 ? "Se ha producido un error en el servidor" : message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
