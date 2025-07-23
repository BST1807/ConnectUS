import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUsersForSidebar, getMessage ,sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);

router.get("/", (req, res) => {
  res.status(400).json({ message: "Missing message ID!" });
});

// ✅ Only one param route — regex handles valid ID
router.get("/:id([a-fA-F0-9]{24})", protectRoute, getMessage);

router.post("/send/:id", protectRoute, sendMessage);

// ✅ 404 fallback for unknown routes
router.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

export default router;
