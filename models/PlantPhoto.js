const { default: mongoose } = require("mongose");

const PlantPhotoSchema = new mongoose.Schema({
  url: String,
  plant: {type: mongoose.Types.ObjectId, ref: 'Plant'}
    // user: { type: mongoose.Types.ObjectId, ref: "User" },
});

const PlantPhoto = mongoose.model("Plant", PlantPhotoSchema);

module.exports = {
  PlantPhoto,
};
