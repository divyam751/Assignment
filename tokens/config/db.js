const { mongoose } = require("mongoose");
const { URI, DBNAME } = require("../utils/constant");

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${URI}/${DBNAME}`);
    console.log(
      `Database connected successfully on port : ${connectionInstance.connection.port}`
    );
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = { connectDB };
