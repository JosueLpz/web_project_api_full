module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  // * El metodo startsWith se usa para verificar si una cadena comienza con ciertos caracteres y arroja un boleano segun el resultado
  if (!authorization || authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Se requiere autorización" });
  }
  const token = authorization.replace("Bearer ", "");

  let payload;
  try {
    const payload = jwt.verify(token, "some-secret-key");
  } catch (err) {
    return res.status(401).send({ message: "NEL fallaste" });
  }

  req.user = payload;

  next();
};
