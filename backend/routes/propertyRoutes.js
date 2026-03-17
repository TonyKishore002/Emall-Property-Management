import express from "express";
import {
createProperty,
getProperties,
deleteProperty
} from "../controllers/propertyController.js";

const router = express.Router();

router.post("/", createProperty);

router.get("/", getProperties);

router.delete("/:id", deleteProperty);

export default router;