import mongoose from "mongoose";

const TenantSchema = new mongoose.Schema({
  tenant_name: String,
  business_type: String,
  phone: String
});

export default mongoose.model("Tenant", TenantSchema);