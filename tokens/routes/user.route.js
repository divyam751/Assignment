const { Router } = require("express");
const {
  register,
  login,
  generateToken,
} = require("../controllers/user.controller");

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/token", generateToken);

module.exports = { userRouter };
