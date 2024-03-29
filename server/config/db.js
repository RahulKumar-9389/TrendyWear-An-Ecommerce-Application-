import mongoose from "mongoose";

export default async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Database connected successfully!');
    } catch (error) {
        console.log(`Error in while connect DB : ${error.message}`);
    }
}