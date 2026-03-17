import Tenant from "../models/Tenant.js";

export const createTenant = async (req,res)=>{

try{

const tenant = new Tenant(req.body);

await tenant.save();

res.json(tenant);

}catch(error){

res.status(500).json(error);

}

};

export const getTenants = async(req,res)=>{

const tenants = await Tenant.find();

res.json(tenants);

};

export const deleteTenant = async(req,res)=>{

await Tenant.findByIdAndDelete(req.params.id);

res.json({message:"Tenant Deleted"});

};