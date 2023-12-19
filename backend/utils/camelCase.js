const ERROR_CODE_400 = 400;
const ERROR_CODE_404 = 404;
const ERROR_CODE_500 = 500;

const camelCase = (res, statusCode) => {
  res.status(statusCode).send({ message: "Error Intente mas tarde" });
};

module.exports = {
  ERROR_CODE_400,
  ERROR_CODE_404,
  ERROR_CODE_500,
  camelCase,
};
