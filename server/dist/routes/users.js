"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userController_1 = __importDefault(require("../controllers/userController"));
var router = express_1.default.Router();
router.use(express_1.default.json());
router.use(express_1.default.urlencoded({ extended: true }));
router.post("/register", userController_1.default.registerUser);
router.get("/verify/:token", userController_1.default.verifyEmail);
router.post("/login", userController_1.default.loginUser);
router.get("/forgot/", userController_1.default.renderInputEmailForm);
router.post("/forgot/", userController_1.default.passwordRecoveryEmail);
router.get("/recover", userController_1.default.renderPasswordRecoveryForm);
router.post("/recover", userController_1.default.updateUserPassword);
exports.default = router;
