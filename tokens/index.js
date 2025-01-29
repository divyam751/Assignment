const express = require("express");
const cors = require("cors");
const { PORT } = require("./utils/constant");
const { connectDB } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { authMiddleware } = require("./middlewares/auth.middleware");
const { blacklistRouter } = require("./routes/blacklist.route");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/v1/", (req, res) => {
  return res
    .status(200)
    .json({ message: "Welcome to the world of backend 😊" });
});

app.get("/api/v1/data", authMiddleware.authentication, (req, res) => {
  return res.status(200).json({
    message: "success",
    data: "Developing writers can often benefit from examining an essay, a paragraph, or even a sentence to determine what makes it effective. On the following pages are several paragraphs for you to evaluate on your own, along with the Writing Center's explanation.",
  });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/blacklist", blacklistRouter);

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`💻  Server is running on port : ${PORT}`);
  } catch (error) {
    console.error(error.message);
  }
});
