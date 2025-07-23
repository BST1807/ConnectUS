import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUsersForSidebar, getMessage, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);

// ✅ One single dynamic route. Validate inside.
router.get("/:id", protectRoute, (req, res, next) => {
  const { id } = req.params;

  // Check for valid MongoDB ObjectId
  if (!/^[a-fA-F0-9]{24}$/.test(id)) {
    return res.status(400).json({ error: "Invalid message ID format." });
  }

  // OK → continue
  return getMessage(req, res, next);
});

router.post("/send/:id", protectRoute, sendMessage);

export default router;
