import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUsersForSidebar, getMessage ,sendMessage} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users",protectRoute, getUsersForSidebar)

router.get("/", (req, res) => {
  res.status(400).json({ message: "Missing message ID!" });
});





// Match only valid MongoDB ObjectId (24 hex chars)
router.get("/:id([a-fA-F0-9]{24})", protectRoute, getMessage);

// Catch bad /:id calls
router.get("/:invalidId", (req, res) => {
  res.status(400).json({ error: "Invalid message ID format." });
});




router.post("/send/:id",protectRoute,sendMessage);
export default router;