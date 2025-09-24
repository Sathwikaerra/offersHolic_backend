// plans.js
import express from "express";
import PlanPricing from "../../../models/Plans.js"; // adjust path as needed

const router = express.Router();

// GET /user/v1/plans
router.get("/all", async (req, res) => {
  try {
    const plans = await PlanPricing.find();
    console.log(plans)
    res.status(200).json({
      ok: true,
      data: plans,
    });
  } catch (error) {
    console.error("Error fetching plans:", error);
    res.status(500).json({ success: false, message: "Failed to fetch plans" });
  }
});

export default router;
