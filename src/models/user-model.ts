import { Bcrypt, UserRoles } from "@utils";
import type { Document, Model } from "mongoose";
import mongoose, { Schema } from "mongoose";

// --- Interface for a User document ---
export interface IUser extends Document {
	full_name: string;
	username: string;
	email: string;
	password: string;
	role: UserRoles;
	comparePassword(password: string): Promise<boolean>;
}

// --- Mongoose Schema ---
const UserSchema = new Schema<IUser>(
	{
		full_name: { type: String, required: true },
		username: { type: String, required: true, unique: true, index: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: { type: String, enum: Object.values(UserRoles), required: true },
	},
	{
		timestamps: true,
		toJSON: {
			transform: (_, ret) => {
				ret.user_id = ret._id.toString();
				ret.created_at = ret.createdAt;
				ret.updated_at = ret.updatedAt;

				ret._id = undefined;
				ret.__v = undefined;
				ret.password = undefined;
				ret.createdAt = undefined;
				ret.updatedAt = undefined;
				return ret;
			},
		},
	},
);

// --- Hash password before saving ---
UserSchema.pre<IUser>("save", async function (next) {
	if (!this.isModified("password")) return next();
	this.password = await Bcrypt.hashString(this.password);
	next();
});

// --- Compare method ---
UserSchema.methods.comparePassword = function (
	password: string,
): Promise<boolean> {
	return Bcrypt.compareString(password, this.password);
};

// --- Mongoose Model ---
const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
export default User;
