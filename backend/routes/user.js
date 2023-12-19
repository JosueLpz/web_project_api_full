const auth = require("./middleware/auth");
const router = require("express").Router();
const {
  getUser,
  getUserId,
  postUser,
  patchUser,
  patchUserAvatar,
  createUser,
  login,
} = require("../controllers/user");

router.post("/signin", login);
router.post("/signup", createUser);
// *Aplicacion de el midd de autorizacion el los routers de usuario
app.use(auth);
router.get("/", getUser);
router.get("/:id", getUserId);
router.post("/", postUser);
router.patch("/me/:id", patchUser);
router.patch("/me/avatar/:id", patchUserAvatar);

module.exports = router;
