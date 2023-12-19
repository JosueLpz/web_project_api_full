const Card = require("../models/card");
const {
  ERROR_CODE_400,
  ERROR_CODE_404,
  ERROR_CODE_500,
  camelCase,
} = require("../utils/camelCase");

module.exports.getCard = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => camelCase(res, ERROR_CODE_500));

  return null;
};

module.exports.postCard = (req, res) => {
  const { name, link } = req.body;

  if (!name || !link) {
    return res
      .status(ERROR_CODE_400)
      .send({ message: "Verifique los datos para crear una tarjeta" });
  }

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      camelCase(res, ERROR_CODE_500);
    });

  return null;
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail(() => {
      const error = new Error("No se ha encontrado ninguna tarjeta con esa id");
      error.statusCode = ERROR_CODE_404;
      throw error;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => camelCase(res, ERROR_CODE_500));

  return null;
};

module.exports.likeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  );

module.exports.dislikeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  );
