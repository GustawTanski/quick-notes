import mongoose, { Schema, Document } from "mongoose";
import Joi from "joi";
import crypto from "crypto-random-string";

export interface IUser extends Document {
	email: string;
	password: string;
	accountVerificationToken: string;
	isVerified: boolean;
	passwordRecoveryToken?: string;
	passwordRecoveryExpiration?: Date;
}

const userSchema: Schema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		minlength: 5,
		maxlength: 255
	},
	password: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 1024
	},
	accountVerificationToken: {
		type: String,
		default: crypto({ length: 64, type: "url-safe" })
	},
	isVerified: { type: Boolean, default: false },
	passwordRecoveryToken: String,
	passwordRecoveryExpiration: Date
});

export const validate = (user: IUser) => {
	const validationSchema = {
		email: Joi.string()
			.min(5)
			.max(255)
			.required()
			.email(),
		password: Joi.string()
			.min(5)
			.max(255)
			.required()
	};

	return Joi.validate(user, validationSchema);
};

const User = mongoose.model < IUser > ("User", userSchema);
export default User;
