import User, { validate, IUser } from "../models/User";
import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
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
        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(401).send("User with this e-mail address doesn't exist.");
    
        try {
            user = await _generateRecoveryToken(user);
            await _sendRecoveryMail(res, user);
            res.render("passwordRecoveryEmailSent");
        } catch (e) {
            res.status(500).send();
        }
    },

    async renderPasswordRecoveryForm(req: Request, res: Response) {
        res.render("passwordRecoveryForm");
    },

    async updateUserPassword(req: Request, res: Response) {
        const user = await User.findOne({ passwordRecoveryToken: req.body.token });

        if (user && _isRecoveryTokenValid(user, req.body.token)) {
            if (req.body.password !== req.body.password2)
                res.status(400).send("Provided passwords don't match.");

            await _deleteValidationTokenAndUpdatePassword(user, req.body.password)
                .catch(e => res.status(400).send("You have not provided enough data."));
            res.render("finishPasswordRecovery");
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
        password: await _hashPassword(req.body.password)
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

const _hashPassword = async (password: IUser["password"]) => {
    return bcryptjs.hash(password, 10);
}

const _verifyAndGenerateJWT = async (req: Request, res: Response, user: IUser) => {
    const isPasswordCorrect: boolean = await bcryptjs.compare(req.body.password, user.password);
    if (!isPasswordCorrect) return res.status(400).send("Incorrect password.");

    if (!user.isVerified) return res.status(401).send("This account isn't verified yet.");

    const jwt_secret = process.env.JWT_SECRET;
    if (!jwt_secret) return res.status(500).send("Environmental variable JWT_SECRET is missing.");

    res.header("x-auth-token", jwt.sign({ email: user.email }, jwt_secret))
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
    const url = `http://localhost:5000/recover?token=${user.passwordRecoveryToken}`;

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

const _deleteValidationTokenAndUpdatePassword = async (user: IUser, password: IUser["password"]) => {
    user.passwordRecoveryToken = "";
    user.passwordRecoveryExpiration = new Date(0);
    user.password = await _hashPassword(password);

    await user.save();
};

const _sendMail = (mailOptions: Mail.Options) => {
    const transporter = nodemailer.createTransport(
        smtpTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        })
    );

    return transporter.sendMail(mailOptions);
};