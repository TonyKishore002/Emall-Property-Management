import Lease from "../models/Lease.js";

export const createLease = async(req,res)=>{

try{

const lease = new Lease(req.body);

await lease.save();

res.json(lease);

}catch(error){

res.status(500).json(error);

}

};

export const getLeases = async(req,res)=>{

const leases = await Lease.find()
.populate("property_id")
.populate("tenant_id");

res.json(leases);

};

export const deleteLease = async(req,res)=>{

await Lease.findByIdAndDelete(req.params.id);

res.json({message:"Lease Deleted"});

};