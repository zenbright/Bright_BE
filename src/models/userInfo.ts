import mongoose from "mongoose";

const userInfoSchema = new mongoose.Schema({
	fullname: {
		type: String,
		required: true
	},
	dayOfBirth: {
		type: Date,
		required: true
	},
	email: {
		address: String,
		isVerified: {
			type: Boolean,
			default: false
		},
	},
	gender: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	profileImage: String,
	userCredentialId: mongoose.Schema.Types.ObjectId,
}, {
	timestamps: true,
});

export default mongoose.model('User', userInfoSchema);
