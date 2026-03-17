import express from "express";

import {
createLease,
getLeases,
deleteLease
} from "../controllers/leaseController.js";

const router = express.Router();

router.post("/",createLease);

router.get("/",getLeases);

router.delete("/:id",deleteLease);

export default router;