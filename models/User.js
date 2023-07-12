import { default as mongoose } from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  password: String,
  joindata: Date,
});

const User = mongoose.model("User", UserSchema);

export default {
  User,
};
