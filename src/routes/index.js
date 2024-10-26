import express from "express";
import {login,register} from "../controllers/authController.js";
import {getUserInfo, updateUserInfo} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/info", (req, res) => {
  res.json({
    data: {
      fullName: "Lam Ba Luan",
      studentCode: "QE170169"
    }
  });
});

router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/users/me", authMiddleware, getUserInfo);
router.put("/users/me", authMiddleware, updateUserInfo);

export default router;
