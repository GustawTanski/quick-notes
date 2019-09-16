import User, { validate, IUser, validateEmail } from "../models/User";
import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import key from "../privateKeyJWT";
import auth from "../mailgunCredentials";
import crypto from "crypto-random-string";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export const registerUser = async (req: Request, res: Response) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    await _saveNewUser(req, res);
};

const _saveNewUser = async (req: Request, res: Response) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User with this e-mail address already exists.");
    
    user = new User({
        email: req.body.email,
        password: req.body.password
    });

    await user.save();
    res.send(user);
};

export const verifyEmail = async (req: Request, res: Response) => {
    // TODO:: implement
};

export const loginUser = async (req: Request, res: Response) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).send("User with this e-mail address doesn't exist.");

    await _verifyAndGenerateJWT(req, res, user);
};

const _verifyAndGenerateJWT = async (req: Request, res: Response, user: IUser) => {
    const isPasswordCorrect: boolean = await bcryptjs.compare(req.body.password, user.password);

    if (!isPasswordCorrect) return res.status(400).send("Incorrect password.");

    res.header("x-auth-token", jwt.sign({ email: user.email }, key))
        .status(200)
        .send("Logged in successfuly.");
};

export const sendRecoveryMail = async (req: Request, res: Response) => {
    const { error } = validateEmail(req.params.email);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(401).send("User with this e-mail address doesn't exist.");

    await _sendMailToUser(req, res, user);
};

const _sendMailToUser = async (req: Request, res: Response, user: IUser) => {
    const token = crypto({ length: 40, type: 'url-safe' });

    // TODO:: implement
};

const _sendMail = (req: Request, res: Response, mailOptions: Mail.Options) => {
    const transporter = nodemailer.createTransport({ service: "gmail", auth });
    
    transporter.sendMail(mailOptions);
};

export const updateUserPassword = (req: Request, res: Response) => {
    // TODO:: implement
};