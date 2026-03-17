const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://vinitapatel2476v_db_user:vinita@cluster0.pb5foqr.mongodb.net/jobportal?retryWrites=true&w=majority"
    );
    console.log("database connect successfully !");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
