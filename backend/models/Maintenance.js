import mongoose from "mongoose";

const MaintenanceSchema = new mongoose.Schema({
  property_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property"
  },
  request_date: {
    type: Date,
    default: Date.now
  },
  issue_description: String,
  status: String
});

export default mongoose.model("Maintenance", MaintenanceSchema);