import User, { validate, IUser, validateEmail } from "../models/User";
import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import key from "../privateKeyJWT";
import auth from "../gmailAuth";
import crypto from "crypto-random-string";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import smtpTransport from "nodemailer-smtp-transport";

const userController = {
    async registerUser(req: Request, res: Response) {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
    
        _saveNewUser(req, res);
    },

    async verifyEmail(req: Request, res: Response) {
        const user = await User.findOne({ accountVerificationToken: req.params.token });

        if (user && req.params.token === user.accountVerificationToken) {
            user.isVerified = true;
            user.accountVerificationToken = "";
            await user.save();
            res.status(200).send("Your account has been successfuly verified. You can start using it now!");
        } else {
            res.status(400).send("Invalid validation token or your account has already been verified.");
        }
    },

    async loginUser(req: Request, res: Response) {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
    
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(401).send("User with this e-mail address doesn't exist.");
    
        await _verifyAndGenerateJWT(req, res, user);
    },

    async renderRecovery(req: Request, res: Response) {
        // TODO:: implement
    },

    async passwordRecoveryEmail(req: Request, res: Response) {
        const { error } = validateEmail(req.params.email);
        if (error) return res.status(400).send(error.details[0].message);
    
        const user = await User.findOne({ email: req.params.email });
        if (!user) return res.status(401).send("User with this e-mail address doesn't exist.");
    
        _sendRecoveryMail(res, user);
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
        password: req.body.password
    });

    try {
        await _sendVerificationEmail(res, user);
        await user.save();
        res.status(200).send(`Successfuly registered user ${user.email}.`);
    } catch(e) {
        res.status(400).send("Unable to send a verification e-mail or to register a new user.");
        console.log(e);
    }
};

const _sendVerificationEmail = async (res: Response, user: IUser) => {
    const url = `http://localhost:5000/verify/${user.accountVerificationToken}`;

    const mailOptions = {
        from: "quicknotes.bootcamp@gmail.com",
        to: user.email,
        subject: "Quick-notes account verification",
        html: `
            Your Quick-notes account needs to be verified before you start using it.
            You can do so by clicking <a href=${url}>here</a>, or opening the link below:<br><br>
            <a href=${url}>${url}</a>
            `
    };

    return _sendMail(mailOptions);
};

const _verifyAndGenerateJWT = async (req: Request, res: Response, user: IUser) => {
    const isPasswordCorrect: boolean = await bcryptjs.compare(req.body.password, user.password);
    if (!isPasswordCorrect) return res.status(400).send("Incorrect password.");

    if (!user.isVerified) return res.status(401).send("This account isn't verified yet.");

    res.header("x-auth-token", jwt.sign({ email: user.email }, key))
        .status(200)
        .send("Logged in successfuly.");
};

const _sendRecoveryMail = async (res: Response, user: IUser) => {
    user.passwordRecoveryToken = crypto({ length: 40, type: "url-safe" });

    // TODO:: implement
};

const _sendMail = (mailOptions: Mail.Options) => {
    // const transporter = nodemailer.createTransport(mg(auth));
    const transporter = nodemailer.createTransport(smtpTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth
    }));

    return transporter.sendMail(mailOptions);
};