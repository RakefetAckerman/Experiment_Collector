import express from "express";
import experimentController from "../controllers/experimentController.js";

const router = express.Router();

router.get("/:experimentName", async (req, res) => {
    await experimentController.getExperimentByName(req, res);
})

router.post("/", async (req, res) => {
    await experimentController.createExperimentFromEditor(req, res);
})

router.get("/trailType/:trialType", async (req, res) => {
    await experimentController.getTrialType(req, res);
})

export default router;
