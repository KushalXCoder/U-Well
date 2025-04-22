import mongoose from "mongoose";

const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`MongoDB successfully running at ${connectionInstance.connection.host}`)   
    } catch (error) {
        console.error("Error connecting to MongoDB: ", error);
    }
}

export default connectDB