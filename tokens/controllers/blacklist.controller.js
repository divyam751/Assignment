const { Blacklist } = require("../models/blacklist.model");

const blacklist = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ message: "token is required" });
    }

    const isTokenBlacklisted = await Blacklist.findOne({ token });
    if (isTokenBlacklisted) {
      return res
        .status(409)
        .json({ message: "This token already blacklisted" });
    }

    const response = await Blacklist.create({ token });

    return res.status(200).json({
      message: "token added in blacklist successfully",
      data: response._id,
    });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ message: "something went wrong,please try again later" });
  }
};

module.exports = { blacklist };
