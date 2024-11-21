const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(
    "mongodb+srv://HUSSAIN:npqSTU789@cluster0.sn1la.mongodb.net"
  );
  console.log(`mongo connected: ${conn.connection.host}`);
};

module.exports = connectDB;
