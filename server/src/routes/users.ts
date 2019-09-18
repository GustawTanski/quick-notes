import express, { Router } from "express";
import userController from "../controllers/userController";

const router: Router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/register", userController.registerUser);
router.get("/verify/:token", userController.verifyEmail);
router.post("/login", userController.loginUser);
router.get("/forgot/", userController.renderInputEmailForm);
router.post("/forgot/", userController.passwordRecoveryEmail);
router.get("/recover", userController.renderPasswordRecoveryForm);
router.post("/recover", userController.updateUserPassword);

export default router;