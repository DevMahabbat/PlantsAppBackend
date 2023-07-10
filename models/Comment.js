const { default: mongoose } = require("mongoose");

const CommentSchema = new mongoose.Schema({
  content: String,
  user: {type: mongoose.Types.ObjectId, ref:"User"},
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = {
  Comment,
};
