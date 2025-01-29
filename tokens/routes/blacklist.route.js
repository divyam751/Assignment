const { Router } = require("express");
const { blacklist } = require("../controllers/blacklist.controller");

const blacklistRouter = Router();

blacklistRouter.post("/", blacklist);

module.exports = { blacklistRouter };
