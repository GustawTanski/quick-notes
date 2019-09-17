import express, { Router } from "express";
import userController from "../controllers/userController";

const router: Router = express.Router();

router.use(express.json());

router.post("/register", userController.registerUser);
router.get("/verify/:token", userController.verifyEmail);
router.post("/login", userController.loginUser);
router.get("/forgot/", userController.renderInputEmailForm);
router.put("/forgot/:email", userController.passwordRecoveryEmail);
router.get("/forgot/:token", userController.renderPasswordRecoveryForm);
router.put("/forgot/:token", userController.updateUserPassword);

export default router;