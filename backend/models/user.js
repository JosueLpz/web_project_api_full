const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "El nombre de usuario es obligatorio"],
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: [true, "La información del usuario es obligatoria"],
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: [true, "El enlace al avatar es obligatorio"],
    validate: {
      validator(v) {
        const regex = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
        return regex.test(v);
      },
      message: (props) => `${props.value} no es un enlace de avatar válido`,
    },
  },
  email: {
    type: String,
    require: [true, "El correo es boligatorio"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Formato de correo electrónico incorrecto",
    },
  },
  password: {
    type: String,
    required: [true, "Contraseña Obligatoria"],
    select: false,
    // *El metodo select es para que la base de datos no envia la contraseña o el hash de contraseña al front
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return (
    this.findOne({ email })
      //* usa el metodo selec en la autenticacion con el string "+pass" esto para que la autenticacion si tenga aseso al hash
      .select("+password")
      .then((user) => {
        if (!user) {
          return Promise.reject(new Error("Incorrect email or password"));
        }
        return bcrypt.compare(password, user.password).then((matched) => {
          if (!matched) {
            return Promise.reject(new Error("Incorrect email or password"));
          }
          return user;
        });
      })
  );
};

module.exports = mongoose.model("user", userSchema);
