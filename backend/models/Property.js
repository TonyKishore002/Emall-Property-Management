import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Owner"
  },
  shop_number: String,
  floor: Number,
  rent_price: Number
});

export default mongoose.model("Property", PropertySchema);