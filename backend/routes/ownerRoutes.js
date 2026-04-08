import express from "express";
import { createOwner, getOwners, deleteOwner } from "../controllers/ownerController.js";

const router = express.Router();

router.post("/", createOwner);
router.get("/", getOwners);
router.delete("/:id", deleteOwner);

export default router;