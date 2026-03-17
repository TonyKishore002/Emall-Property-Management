import Maintenance from "../models/Maintenance.js";

export const createRequest = async (req, res) => {

  try {

    const request = new Maintenance(req.body);

    await request.save();

    res.json(request);

  } catch (error) {

    res.status(500).json(error);

  }

};

export const getRequests = async (req, res) => {

  const requests = await Maintenance.find().populate("property_id");

  res.json(requests);

};

export const deleteRequest = async (req, res) => {

  await Maintenance.findByIdAndDelete(req.params.id);

  res.json({ message: "Request Deleted" });

};