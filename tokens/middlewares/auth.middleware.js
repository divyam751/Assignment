const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../utils/constant");
const { Blacklist } = require("../models/blacklist.model");

const authMiddleware = {
  authentication: async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized, token not found" });
    }
    const token = authHeader.split(" ")[1];

    const isTokenBlacklisted = await Blacklist.findOne({ token });

    if (isTokenBlacklisted) {
      return res
        .status(401)
        .json({ message: "User is in blacklist, can't proceed your request" });
    }
    jwt.verify(token, SECRET_KEY, (err, decode) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Unauthorized,Invalid or expired token" });
      }
      req.user = decode;

      next();
    });
  },
};

module.exports = { authMiddleware };
