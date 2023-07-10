const { default: mongoose } = require("mongoose");
const env = require("dotenv").config()

const db = {
  connect: async () => {
    try {
      await mongoose.connect(process.env.connection);
      console.log("mongodb connection succeeded");
    } catch (error) {
 console.error(error)
    }
  },
};

module.exports = {
  db,
};