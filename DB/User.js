const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  mobile: String,
  location: String,
  hotel: String,
  checkIn: String,
  checkOut: String,
  termsConditions: String,
});

module.exports = mongoose.model("users", userSchema);
