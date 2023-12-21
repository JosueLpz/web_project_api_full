const auth = require("./middleware/auth");
const router = require("express").Router();
const { celebrate, Joi, Segments } = require("celebrate");
const validateURL = require("../utils/validateURL");
const {
  getUser,
  getUserId,
  postUser,
  patchUser,
  patchUserAvatar,
  createUser,
  login,
} = require("../controllers/user");

router.post(
  "/signin",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login
);
router.post(
  "/signup",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser
);
// *Aplicacion de el midd de autorizacion el los routers de usuario
app.use(auth);
router.get("/", getUser);
router.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().hex().required(),
    }),
  }),
  getUserId
);
router.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      about: Joi.string().required(),
      avatar: Joi.string().required().custom(validateURL),
    }),
  }),
  postUser
);

router.patch(
  "/me/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().hex().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      about: Joi.string().required(),
    }),
  }),
  patchUser
);
router.patch(
  "/me/avatar/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().hex().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      avatar: Joi.string().required().custom(validateURL),
    }),
  }),
  patchUserAvatar
);

module.exports = router;
