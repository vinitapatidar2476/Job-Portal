const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://vinita:12345@cluster0.uvz2icw.mongodb.net/jobprotaldb?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("database connect successfully !");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
