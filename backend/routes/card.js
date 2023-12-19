const router = require("express").Router();

const {
  getCard,
  postCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/card");

router.get("/", getCard);
router.post("/", postCard);
router.delete("/:id", deleteCard);
router.put("/:id/likes", likeCard);
router.delete("/:id/likes", dislikeCard);

module.exports = router;
