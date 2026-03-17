import express from "express";

import {
createTenant,
getTenants,
deleteTenant
} from "../controllers/tenantController.js";

const router = express.Router();

router.post("/",createTenant);

router.get("/",getTenants);

router.delete("/:id",deleteTenant);

export default router;