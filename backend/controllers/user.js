const User = require("../models/user");

const {
  ERROR_CODE_400,
  ERROR_CODE_404,
  ERROR_CODE_500,
  camelCase,
} = require("../utils/camelCase");

const jwt = require("jsonwebtoken");

module.exports.getUser = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => camelCase(res, ERROR_CODE_500));

  return null;
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => {
      const error = new Error("No se ha encontrado ningun usuario con ese id");
      error.statusCode = ERROR_CODE_404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => camelCase(res, ERROR_CODE_500));

  return null;
};

module.exports.createUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(ERROR_CODE_400)
      .send({ message: "Verifique los datos para crear un usuario" });
  }
  bcrypt.hash(password, 10).then((hash) =>
    User.create({
      email: email,
      password: hash,
    })
      .then((user) => res.send(user._id, user.email))
      .catch(() => camelCase(res, ERROR_CODE_500))
  );

  return null;
};

module.exports.postUser = (req, res) => {
  const { name, about, avatar } = req.body;

  if (!name || !about || !avatar) {
    return res
      .status(ERROR_CODE_400)
      .send({ message: "Verifique los datos para crear un usuario" });
  }

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => camelCase(res, ERROR_CODE_500));

  return null;
};

module.exports.patchUser = (req, res) => {
  const { name, about } = req.body;
  if (!name || !about) {
    return res
      .status(ERROR_CODE_400)
      .send({ message: "Verifique los datos para modificar el usuario" });
  }

  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => res.send({ data: user }))
    .catch((err) => camelCase(res, ERROR_CODE_500));

  return null;
};

module.exports.patchUserAvatar = (req, res) => {
  const { avatar } = req.body;

  if (!avatar) {
    return res
      .status(ERROR_CODE_400)
      .send({ message: "Verifique el enlace para modificar el avatar" });
  }

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    }
  )
    .then((avatar) => res.send({ data: avatar }))
    .catch((err) => camelCase(res, ERROR_CODE_500));

  return null;
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, "some-secret-key", {
        expiresIn: "7d",
      });

      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};
