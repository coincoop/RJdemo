const Router = require("express");
const {
  register,
  login,
  verification,
} = require("../controllers/authController");

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/verification", verification);
authRouter.get("/hello", (req, res) => {
  res.send("hello");
});

module.exports = authRouter;
