import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import key from "../privateKeyJWT";

export default function auth(req: Request, res: Response, next: NextFunction) {
	const token = req.headers["x-auth-token"];

	if (token && !(token instanceof Array)) {
        jwt.verify(token, key, err => {
            if (err) return res.status(401).json({ success: false, message: "Token is invalid" });
            else next();
        });
	} else {
		return res.status(401).json({ success: false, message: "Auth token has not been supplied." });
	}
};