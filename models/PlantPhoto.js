const { default: mongoose } = require("mongoose");

const PlantPhotoSchema = new mongoose.Schema({
  plant: { type: mongoose.Schema.Types.ObjectId, ref: "Plant" },
  imageUrl: String,
  description: String,
});

module.exports = mongoose.model("PlantPhoto", PlantPhotoSchema);
