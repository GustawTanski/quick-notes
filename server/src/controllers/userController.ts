import User, { validate, IUser, validateEmail } from "../models/User";
import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import key from "../privateKeyJWT";
import auth from "../mailgunCredentials";
import crypto from "crypto-random-string";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

const userController = {
    async registerUser(req: Request, res: Response) {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
    
        await _saveNewUser(req, res);
    },

    async verifyEmail(req: Request, res: Response) {
        // TODO:: implement
    },

    async loginUser(req: Request, res: Response) {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
    
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(401).send("User with this e-mail address doesn't exist.");
    
        await _verifyAndGenerateJWT(req, res, user);
    },

    async passwordRecovery(req: Request, res: Response) {
        const { error } = validateEmail(req.params.email);
        if (error) return res.status(400).send(error.details[0].message);
    
        const user = await User.findOne({ email: req.params.email });
        if (!user) return res.status(401).send("User with this e-mail address doesn't exist.");
    
        await _sendRecoveryMail(res, user);
    },

    async updateUserPassword(req: Request, res: Response) {
        // TODO:: implement
    }
}

export default userController;

const _saveNewUser = async (req: Request, res: Response) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User with this e-mail address already exists.");
    
    user = new User({
        email: req.body.email,
        password: req.body.password,
        accountVerificationToken: crypto({ length: 40, type: "url-safe" })
    });

    _sendVerificationEmail(res, user);

    if (res.headersSent) return;

    await user.save();
    res.status(200).send(user);
};

const _sendVerificationEmail = (res: Response, user: IUser) => {
    const mailOptions = {
        from: "email@email.com",
        to: user.email,
        subject: "Quick-notes account verification",
        html: `
            Your Quick-notes account needs to be verified before you start using it.
            You can do so by clicking <a href=${user.accountVerificationToken}>here</a>
            `
    };

    _sendMail(res, mailOptions);
};

const _verifyAndGenerateJWT = async (req: Request, res: Response, user: IUser) => {
    const isPasswordCorrect: boolean = await bcryptjs.compare(req.body.password, user.password);
    if (!isPasswordCorrect) return res.status(400).send("Incorrect password.");

    if (!user.isVerified) return res.status(401).send("This account isn't verified yet.");

    res.header("x-auth-token", jwt.sign({ email: user.email }, key))
        .status(200)
        .send("Logged in successfuly.");
};

const _sendRecoveryMail = (res: Response, user: IUser) => {
    user.passwordRecoveryToken = crypto({ length: 40, type: "url-safe" });

    // TODO:: implement
};

const _sendMail = (res: Response, mailOptions: Mail.Options) => {
    const transporter = nodemailer.createTransport({ service: "mailgun", auth });
    
    transporter.sendMail(mailOptions, err => {
        if (err) res.status(400).send(err);
    });
};