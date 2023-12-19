const mongoose = require("mongoose");

const {Schema} = mongoose;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "El nombre de usuario es obligatorio"],
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: [true, "El enlace de las tarjetas es obligatorio"],
    validate: {
      validator (v) {
        const regex = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
        return regex.test(v);
      },
      message: (props) => `${props.value} no es un enlace de válido`,
    },
  },
  owner: {
    required: [true, "El Id es obligatorio"],
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  likes: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("card", cardSchema);
