import { NextFunction } from "express";
import mongoose, { Schema, Document } from "mongoose";
import Joi from "joi";
import bcryptjs from "bcryptjs";

export interface IUser extends Document {
    email: string;
    password: string;
    isVerified?: boolean;
    passwordRecoveryToken?: string;
    accountVerificationToken?: string;
};

const userSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true, minlength: 5, maxlength: 255 },
    password: { type: String, required: true, minlength: 5, maxlength: 1024 },
    isVerified: { type: Boolean, default: false },
    resetPasswordToken: String,
    accountConfirmationToken: String
});

export const validate = (user: IUser) => {
    const validationSchema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(user, validationSchema);
};

export const validateEmail = (email: IUser["email"]) => {
    const validationSchema = { email: Joi.string().min(5).max(255).required().email() };

    return Joi.validate(email, validationSchema);
};

userSchema.pre<IUser>("save", async function(next: NextFunction) {
    this.password = await bcryptjs.hash(this.password, 10);
    next();
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;