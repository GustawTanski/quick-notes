import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
	const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
	const [username, password] = new Buffer(b64auth, "base64")
		.toString()
		.split(":");
	req.body = { email: username, password };

	return next();
};
