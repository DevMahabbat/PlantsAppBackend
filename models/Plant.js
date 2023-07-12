const { default: mongoose } = require("mongoose");

const PlantSchema = new mongoose.Schema({
  name: String,
  description: String,
  rating: Number,
  ratingCount: Number,
  publishDate: Date,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  photos: [{ type: mongoose.Schema.Types.ObjectId, ref: "PlantPhoto" }],
});

module.exports = mongoose.models.Plant || mongoose.model("Plant", PlantSchema);
