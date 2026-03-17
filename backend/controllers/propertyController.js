import Property from "../models/Property.js";

export const createProperty = async (req, res) => {
  try {

    const property = new Property(req.body);

    await property.save();

    res.json(property);

  } catch (error) {

    res.status(500).json(error);

  }
};

export const getProperties = async (req, res) => {

  const properties = await Property.find().populate("owner_id");

  res.json(properties);

};

export const deleteProperty = async (req, res) => {

  await Property.findByIdAndDelete(req.params.id);

  res.json({message:"Property Deleted"});

};