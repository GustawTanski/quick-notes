import { NextFunction } from "express";
import mongoose, { Schema, Document } from "mongoose";
import Joi from "joi";
import bcryptjs from "bcryptjs";

export interface IUser extends Document {
    email: string;
    password: string;
}

const userSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true, minlength: 5, maxlength: 255 },
	password: { type: String, required: true, minlength: 5, maxlength: 1024 }
});

export function validate(user: IUser) {
    const validationSchema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(user, validationSchema);
}

userSchema.pre<IUser>("save", async function(next: NextFunction) {
    this.password = await bcryptjs.hash(this.password, 10);
    next();
})

const User = mongoose.model<IUser>('User', userSchema);
export default User;