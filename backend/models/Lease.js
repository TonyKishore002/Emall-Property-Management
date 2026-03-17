import mongoose from "mongoose";

const LeaseSchema = new mongoose.Schema({
  property_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property"
  },
  tenant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant"
  },
  lease_start: Date,
  lease_end: Date
});

export default mongoose.model("Lease", LeaseSchema);