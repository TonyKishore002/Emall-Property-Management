import Owner from "../models/Owner.js";

export const createOwner = async (req, res) => {
  try {
    const owner = new Owner(req.body);
    await owner.save();
    res.json(owner);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getOwners = async (req, res) => {
  const owners = await Owner.find();
  res.json(owners);
};

export const deleteOwner = async (req, res) => {
  try {
    await Owner.findByIdAndDelete(req.params.id);
    res.json({ message: "Owner deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
};