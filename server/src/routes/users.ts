import express, { Router } from "express";
import userController from "../controllers/userController";

const router: Router = express.Router();

router.use(express.json());

router.post("/register", userController.registerUser);
router.post("/register/:token", userController.verifyEmail);
router.post("/login", userController.loginUser);
router.get("/forgot/:email", userController.passwordRecovery);
router.put("/forgot/:token", userController.updateUserPassword);

export default router;