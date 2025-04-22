import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: "User",
    },
}, {timestamps: true});

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password,10);
}

userSchema.methods.checkPassword = async function (password) {
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateJWT = function () {
    return jwt.sign({email: this.email, role: this.role}, process.env.JWT_SECRET)
}

const User = mongoose.model("User", userSchema);

export default User