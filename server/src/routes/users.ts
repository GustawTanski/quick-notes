import express, { Router } from "express";
import * as controller from "../controllers/users";

const router: Router = express.Router();

router.use(express.json());

router.post("/register", controller.registerUser);
router.post("/login", controller.loginUser);
router.get("/forgot/:email", controller.sendRecoveryMail);
router.put("/forgot/:token", controller.updateUserPassword);

export default router;