import express, { Router, NextFunction, Request, Response } from "express";
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

router.use(["/login", "/register"], (req: Request, res: Response, next: NextFunction) => {
	const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
	const [username, password] = new Buffer(b64auth, "base64").toString().split(":");
    req.body = { email: username, password };
    
	return next();
});

export default router;