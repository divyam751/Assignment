const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");
const { SECRET_KEY, REFRESH_SECRET_KEY } = require("../utils/constant");

const registerSchema = Joi.object({
  fullname: Joi.string().min(3).max(50).required().messages({
    "string.empty": "fullname is required",
    "string.min": "fullname must be atleast 3 charaters long",
    "string.max": "fullname can't be more then 50 characters",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "email is required",
    "string.email": "email must be a valid email address",
  }),
  password: Joi.string().min(6).max(30).required().messages({
    "string.empty": "password is required",
    "string.min": "password must be atleast 6 charaters long",
    "string.max": "password can't be more then 30 characters long",
  }),
});

const register = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { fullname, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: `email already registerd,please login` });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullname,
      email,
      password: hashPassword,
    });
    return res.status(201).json({
      message: `${email} registered successfully`,
      data: { id: newUser._id },
    });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ mesasge: "somthing went wrong please try again later" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password both are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: `${email} not found,please register first` });
    }

    const response = await bcrypt.compare(password, user.password);
    if (!response) {
      return res.status(401).json({ mesasge: "invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "7d" });

    const refreshToken = jwt.sign({ id: user._id }, REFRESH_SECRET_KEY, {
      expiresIn: "28d",
    });

    return res.status(200).json({
      message: `Welcome back ${user.fullname}`,
      data: { token, refreshToken },
    });
  } catch (error) {
    console.log(error.mesasge);
    return res
      .status(500)
      .json({ mesasge: "somthing went wrong, please try again later" });
  }
};

const generateToken = async (req, res) => {
  try {
    const refreshToken = req.headers?.authorization?.split(" ")[1];

    jwt.verify(refreshToken, REFRESH_SECRET_KEY, (err, decode) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "refreshToken exprired,please login again" });
      }

      const token = jwt.sign({ id: decode.id }, SECRET_KEY, {
        expiresIn: "7d",
      });

      return res
        .status(200)
        .json({ message: "token generated successfully", data: { token } });
    });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ message: "something went wrong,please try again later" });
  }
};
module.exports = { register, login, generateToken };
