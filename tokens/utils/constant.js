require("dotenv").config();

PORT = 3000;
DBNAME = "server01";
URI = process.env.MONGODB_URI;
SECRET_KEY = process.env.SECRET_KEY;
REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;

module.exports = { PORT, URI, DBNAME, SECRET_KEY, REFRESH_SECRET_KEY };
