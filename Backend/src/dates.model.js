import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
    date: {
        type: Date,
    },
    timeSlot: {
        type: String,
    }
}, {timestamps: true});

const Slot = mongoose.model("Slot", slotSchema);

export default Slot