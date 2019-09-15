import User, { validate, IUser } from "../models/User";
import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import key from "../privateKeyJWT";

export const registerUser = async (req: Request, res: Response): Promise<Response> => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User with this e-mail address already exists.");
    
    user = new User({
        email: req.body.email,
        password: req.body.password
    });

    await user.save();
    return res.send(user);
};

export const loginUser = async (req: Request, res: Response): Promise<Response> => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).send("User with this e-mail address doesn't exist.");

    const isPasswordCorrect: boolean = await bcryptjs.compare(req.body.password, user.password);

    if (isPasswordCorrect) {
        res.header("x-auth-token", jwt.sign({ email: user.email }, key));
        return res.status(200).send("Logged in successfuly.");
    } else return res.status(400).send("Incorrect password.");
}