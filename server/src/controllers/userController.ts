import User, { validate, IUser } from "../models/User";
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

    async renderInputEmailForm(req: Request, res: Response) {
        res.render("inputEmailForm");
    },

    async passwordRecoveryEmail(req: Request, res: Response) {
        let user = await User.findOne({ email: req.query.email });
        if (!user) return res.status(401).send("User with this e-mail address doesn't exist.");
    
        try {
            user = await _generateRecoveryToken(user);
            await _sendRecoveryMail(res, user);
            res.status(200).send("An e-mail has been sent to you with further instructions.");
        } catch (e) {
            res.status(500).send();
        }
    },

    async renderPasswordRecoveryForm(req: Request, res: Response) {
        res.render("passwordRecoveryForm");
    },

    async updateUserPassword(req: Request, res: Response) {
        const user = await User.findOne({ passwordRecoveryToken: req.params.token });

        if (user && _isRecoveryTokenValid(user, req.params.token)) {
            // TODO:: implement
            await _deleteValidationToken(user);
        } else {
            res.status(400).send("Invalid password recovery token.");
        }
    }
}

export default userController;

const _saveNewUser = async (req: Request, res: Response) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User with this e-mail address already exists.");
    
    user = new User({
        email: req.body.email,
        password: await bcryptjs.hash(req.body.password, 10)
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

const _verifyAndGenerateJWT = async (req: Request, res: Response, user: IUser) => {
    const isPasswordCorrect: boolean = await bcryptjs.compare(req.body.password, user.password);
    if (!isPasswordCorrect) return res.status(400).send("Incorrect password.");

    if (!user.isVerified) return res.status(401).send("This account isn't verified yet.");

    res.header("x-auth-token", jwt.sign({ email: user.email }, key))
        .status(200)
        .send("Logged in successfuly.");
};

const _sendVerificationEmail = (res: Response, user: IUser) => {
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

const _sendRecoveryMail = (res: Response, user: IUser) => {
    const url = `http://localhost:5000/forgot/${user.passwordRecoveryToken}`;

    const mailOptions = {
        from: "quicknotes.bootcamp@gmail.com",
        to: user.email,
        subject: "Quick-notes password recovery",
        html: `
            To change your forgotten password click <a href=${url}>here</a>, or open the link below:<br><br>
            <a href=${url}>${url}</a>
            `
    };

    return _sendMail(mailOptions);
};

const _generateRecoveryToken = async (user: IUser) => {
    user.passwordRecoveryToken = crypto({ length: 64, type: "url-safe" });
    user.passwordRecoveryExpiration = new Date(Date.now() + 1000 * 60 * 60);

    await user.save();
    return user;
};

const _isRecoveryTokenValid = async (user: IUser, token: IUser["passwordRecoveryToken"]) => {
    const expiration = user.passwordRecoveryExpiration;
    if (!expiration) return false;

    const hasTokenExpired = expiration.getMilliseconds() > Date.now();
    const isTokenValid = user.passwordRecoveryToken === token;

    return hasTokenExpired && isTokenValid;
};

const _deleteValidationToken = async (user: IUser) => {

}

const _sendMail = (mailOptions: Mail.Options) => {
    const transporter = nodemailer.createTransport(
        smtpTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            auth: auth
        })
    );

    return transporter.sendMail(mailOptions);
};