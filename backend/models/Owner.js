import mongoose from "mongoose";

const OwnerSchema = new mongoose.Schema({
  owner_name: String,
  phone: String,
  email: String
});

export default mongoose.model("Owner", OwnerSchema);