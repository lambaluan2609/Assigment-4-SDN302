import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});


const userModel = mongoose.models.User || mongoose.model("User", userSchema)


export default userModel