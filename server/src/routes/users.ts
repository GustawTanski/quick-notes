import express, { Router } from "express";
import { registerUser, loginUser } from "../controllers/users";

const router: Router = express.Router();

router.use(express.json());

router.post("/", registerUser);
router.post("/login", loginUser);

export default router;