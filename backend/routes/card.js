const router = require("express").Router();
const { celebrate, Joi, Segments } = require("celebrate");
const validateURL = require("../utils/validateURL");

const {
  getCard,
  postCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/card");

router.get("/", getCard);
router.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      link: Joi.string().required().custom(validateURL),
    }),
  }),
  postCard
);
router.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().hex().required(),
    }),
  }),
  deleteCard
);
router.put(
  "/:id/likes",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().hex().required(),
    }),
  }),
  likeCard
);
router.delete(
  "/:id/likes",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().hex().required(),
    }),
  }),
  dislikeCard
);

module.exports = router;
