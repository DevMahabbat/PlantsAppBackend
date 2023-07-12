const express = require("express");
const multer = require("multer");


const app = express();
const { db } = require("./config/db");

db.connect();
const Plant = require("./models/Plant");
const PlantPhoto = require("./models/PlantPhoto");
const Comment = require("./models/Comment");

// Set up Multer storage for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Directory where uploaded images will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename for each uploaded image
  },
});
app.use("/uploads", express.static("uploads"));
app.use(express.json());
const upload = multer({ storage: storage });
;

// Endpoint for getting all plants

// Endpoint for creating a new plant
app.post("/plants", (req, res) => {
  const { name, description, rating, ratingCount } = req.body;
  console.log(name);
  const newPlant = new Plant({
    name: name,
    description: description,
    rating: rating,
    ratingCount: ratingCount,
    publishDate: Date.now(),
  });

  newPlant.save();

  res.json(newPlant);
});

// Endpoint for adding an image to a plant
app.post("/plants/:id/photos", upload.single("photo"), async (req, res) => {
  try {
    const plantId = req.params.id;
    const { originalname, filename } = req.file;
console.log(originalname);
    // Create a new PlantPhoto instance
    const plantPhoto = new PlantPhoto({
      plant: plantId,
      imageUrl: filename, // Save the filename or full path to the image, depending on your setup
      description: req.body.description || "",
    });

    // Save the PlantPhoto instance
    await plantPhoto.save();

    // Connect the PlantPhoto to the Plant
    await Plant.findByIdAndUpdate(
      plantId,
      { $push: { photos: plantPhoto._id } },
      { new: true }
    );

    res
      .status(200)
      .json({ success: true, message: "Photo uploaded successfully" });
  } catch (error) {
    console.error("Error uploading photo:", error);
    res.status(500).json({ success: false, message: "Failed to upload photo" });
  }
});

app.get("/plants", async (req, res) => {
  try {
    const plants = await Plant.find()
      .populate("comments")
      .populate({
        path: "photos",
        populate: { path: "plant" } // Populate the plant field in the photos subdocument
      });

    res.json(plants);
  } catch (error) {
    console.error("Error fetching plants:", error);
    res.status(500).json({ success: false, message: "Failed to fetch plants" });
  }
});
// Endpoint for getting a plant by ID with populated fields
app.get("/plants/:id", async (req, res) => {
  try {
    const plantId = req.params.id;

    const plant = await Plant.findById(plantId)
      .populate("comments") // Populate the comments field
      .populate({
        path: "photos",
        populate: { path: "plant" }, // Populate the plant field in the photos subdocument
      });

    if (!plant) {
      return res.status(404).json({ success: false, message: "Plant not found" });
    }

    res.json(plant);
  } catch (error) {
    console.error("Error fetching plant:", error);
    res.status(500).json({ success: false, message: "Failed to fetch plant" });
  }
});

// Endpoint for adding a comment to a plant
app.post("/plants/:id/comments", async (req, res) => {
  try {
    
    const plantId = req.params.id;
    const  {content}  = req.body;
console.log(content);
    const plant = await Plant.findById(plantId);

    if (!plant) {
      return res.status(404).json({ success: false, message: "Plant not found" });
    }

    // Create a new comment instance
    const comment = new Comment({
      plant: plantId,
      content: content,
    });

    // Save the comment instance
    await comment.save();

    // Update the plant's comments array
    await Plant.findByIdAndUpdate(
      plantId,
      { $push: { comments: comment._id } },
      { new: true }
    );
    // await plant.save();

    res.status(201).json({ success: true, message: "Comment added successfully" });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ success: false, message: "Failed to add comment" });
  }
});


// Start the server
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
