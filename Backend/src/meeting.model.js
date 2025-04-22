import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    category: {
        type: String,
    },
    timeSlot: {
        type: String,
    },
    date: {
        type: Date,
    },
    status: {
        type: String,
        default: "Upcoming",
    }
}, {timestamps: true});

const Meeting = mongoose.model("Meeting", meetingSchema);

export default Meeting