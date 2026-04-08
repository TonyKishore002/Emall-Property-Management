import RentPayment from "../models/RentPayment.js";

export const createPayment = async(req,res)=>{

try{

const payment = new RentPayment(req.body);

await payment.save();

res.json(payment);

}catch(error){

res.status(500).json(error);

}

};

export const getPayments = async(req,res)=>{

const payments = await RentPayment.find().populate({
  path: "lease_id",
  populate: [
    { path: "property_id", populate: { path: "owner_id" } },
    { path: "tenant_id" }
  ]
});

res.json(payments);

};

export const deletePayment = async(req,res)=>{

await RentPayment.findByIdAndDelete(req.params.id);

res.json({message:"Payment Deleted"});

};