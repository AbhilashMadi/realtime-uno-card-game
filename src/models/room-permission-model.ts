import { PlayerRoles, RoomPermissions } from "@utils";
import { Schema, model } from "mongoose";

export interface IRoomPermission extends Document {
	room_id: Schema.Types.ObjectId;
	user_id: Schema.Types.ObjectId;
	role: PlayerRoles;
	permissions: RoomPermissions[];
}

const RoomPermissionSchema = new Schema<IRoomPermission>(
	{
		room_id: { type: Schema.Types.ObjectId, ref: "Room", required: true },
		user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
		role: {
			type: String,
			enum: Object.values(PlayerRoles),
			required: true,
		},
		permissions: {
			type: [String],
			enum: Object.values(RoomPermissions),
			default: [],
		},
	},
	{
		timestamps: true,
		toJSON: {
			transform: (_, ret) => {
				ret.user_id = ret._id.toString();

				ret.createdAt = undefined;
				ret.updatedAt = undefined;
				ret.__v = undefined;

				return ret;
			},
		},
	},
);

export default model("room_permission", RoomPermissionSchema);
