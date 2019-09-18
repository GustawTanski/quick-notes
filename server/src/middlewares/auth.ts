import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers["x-auth-token"];

    const jwt_secret = process.env.JWT_SECRET;
    if (!jwt_secret) return res.status(500).send("Environmental variable JWT_SECRET is missing.");

	if (token && typeof token == "string") {
        _verify(token, jwt_secret, res, next);
    } else {
        return res.status(401).send("Auth token has not been supplied.");
    }
};

const _verify = (token: string, key: string, res: Response, next: NextFunction) => {
    jwt.verify(token, key, err => {
        if (err) return res.status(401).send("Token is invalid");
        else next();
    });
};