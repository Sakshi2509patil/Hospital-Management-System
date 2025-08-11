// import mongoose from "mongoose";

// const connectDB = async () => {
//     try {
//         mongoose.connection.on('connected', () => console.log("✅ Database connected"));
//         await mongoose.connect(process.env.MONGODB_URI);
//     } catch (error) {
//         console.error("❌ MongoDB connection error:", error);
//         process.exit(1);
//     }
// };

// export default connectDB;


// import mongoose from "mongoose";

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGODB_URI);
//         console.log("✅ Database connected to:", mongoose.connection.name);
//     } catch (error) {
//         console.error("❌ MongoDB connection error:", error.message);
//     }
// };

// export default connectDB;

import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
        });
        console.log(`✅ MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
    } catch (error) {
        console.error("❌ MongoDB connection error:", error.message);
        process.exit(1); // Exit process on failure
    }
};

export default connectDB;
