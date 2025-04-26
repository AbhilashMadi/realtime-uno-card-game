import { Bcrypt, RoomStatus } from "@utils";
import { type Document, Schema, type Types, model } from "mongoose";

// --- Types ---
interface RoomPlayer {
	user: Types.ObjectId;
	username: string;
	joined_at: Date;
}

interface ChatMessage {
	user: Types.ObjectId;
	username: string;
	message: string;
	timestamp: Date;
}

export interface IRoom extends Document {
	room_id: string;
	name: string;
	created_by: Types.ObjectId;
	players: RoomPlayer[];
	max_players: number;
	status: RoomStatus;
	is_private: boolean;
	room_password?: string;
	chat_messages: ChatMessage[];
	chat_enabled: boolean;
	logs: string[];

	comparePassword(candidatePassword: string): Promise<boolean>;
}

// --- RoomPlayer Subschema ---
const RoomPlayerSchema = new Schema<RoomPlayer>(
	{
		user: { type: Schema.Types.ObjectId, ref: "User", required: true },
		username: { type: String, required: true },
		joined_at: { type: Date, default: Date.now },
	},
	{ _id: false },
);

// --- ChatMessage Subschema ---
const ChatMessageSchema = new Schema<ChatMessage>(
	{
		user: { type: Schema.Types.ObjectId, ref: "User", required: true },
		username: { type: String, required: true },
		message: { type: String, required: true },
		timestamp: { type: Date, default: Date.now },
	},
	{ _id: false },
);

// --- Room Schema ---
const RoomSchema = new Schema<IRoom>(
	{
		room_id: { type: String, required: true, unique: true, index: true },
		name: { type: String, required: true },
		created_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
		players: { type: [RoomPlayerSchema], default: [] },
		max_players: { type: Number, default: 4 },
		chat_enabled: { type: Boolean, default: true },
		status: {
			type: String,
			enum: Object.values(RoomStatus),
			default: RoomStatus.WAITING,
			required: true,
		},
		is_private: { type: Boolean, default: false },
		room_password: { type: String },
		chat_messages: { type: [ChatMessageSchema], default: [] },
		logs: { type: [String], default: [] },
	},
	{ timestamps: true },
);

// --- Pre-save Hook (hash room_password if room is private) ---
RoomSchema.pre<IRoom>("save", async function (next) {
	if (
		this.is_private &&
		this.isModified("room_password") &&
		this.room_password
	) {
		this.room_password = await Bcrypt.hashString(this.room_password);
	}
	next();
});

// --- Compare password method ---
RoomSchema.methods.comparePassword = function (candidatePassword: string) {
	return Bcrypt.compareString(candidatePassword, this.room_password ?? "");
};

// --- Export Room Model ---
const RoomModel = model<IRoom>("Room", RoomSchema);
export default RoomModel;
