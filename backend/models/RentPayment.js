import mongoose from "mongoose";

const RentSchema = new mongoose.Schema({
  lease_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lease"
  },
  payment_date: {
    type: Date,
    default: Date.now
  },
  amount: Number,
  payment_status: String
});

export default mongoose.model("RentPayment", RentSchema);