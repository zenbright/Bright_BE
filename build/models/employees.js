import mongoose from "mongoose";
const employeeSchema = new mongoose.Schema({
    facebook: { type: String },
    twitter: { type: String },
    google: { type: String },
    github: { type: String },
    instagram: { type: String },
    linkedin: { type: String },
    fullname: { type: String },
    gender: { type: String },
    address: { type: String },
    website: { type: String },
    picture: { type: String }
}, {
    timestamps: true,
});
module.exports = mongoose.model('Employee', employeeSchema);
