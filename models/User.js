const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  password: String,
  joindata: Date,
});

const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
};
