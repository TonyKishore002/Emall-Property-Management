import express from "express";
import { createOwner, getOwners } from "../controllers/ownerController.js";

const router = express.Router();

router.post("/", createOwner);
router.get("/", getOwners);

export default router;