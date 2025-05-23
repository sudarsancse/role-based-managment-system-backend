import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import authorizeRole from "../middleware/roleMiddleware.js";

const router = express.Router();

// only admin can access this router
router.get("/admin", verifyToken, authorizeRole("admin"), (req, res) => {
  res.json({ message: "Wellcome admin" });
});
// only admin and manager can access this router
router.get(
  "/manager",
  verifyToken,
  authorizeRole("admin", "manager"),
  (req, res) => {
    res.json({ message: "Wellcome manager" });
  }
);
// only admin, manager and hr can access this router
router.get(
  "/hr",
  verifyToken,
  authorizeRole("admin", "manager", "hr"),
  (req, res) => {
    res.json({ message: "Wellcome hr" });
  }
);
// (only admin, manager, hr, user) || (everyone) can access this router
router.get(
  "/user",
  verifyToken,
  authorizeRole("admin", "manager", "hr", "user"),
  (req, res) => {
    res.json({ message: "Wellcome user" });
  }
);

export default router;
