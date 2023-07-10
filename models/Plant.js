const { default: mongoose } = require("mongoose");

const PlantSchema = new mongoose.Schema({
  name: String,
  description: String,
  rating: Number,
  publishDate: Date,
  comments : [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
//   user: { type: mongoose.Schema.Types.ObjectId, ref:"User"},
  photos: [{ type: mongoose.Schema.Types.ObjectId, ref: "PlantPhoto"}],
});

const Plant = mongoose.model("Plant", PlantSchema);

module.exports = {
  Plant,
};
