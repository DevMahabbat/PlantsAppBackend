const { default: mongoose } = require("mongoose");
const CommentSchema = new mongoose.Schema({
  content: String,
  user: { type: mongoose.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Comment", CommentSchema);

