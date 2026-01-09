
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./src/models/Product.js";

dotenv.config({ path: './.env' });

console.log("Current directory:", process.cwd());
console.log("Environment variables loaded:", Object.keys(process.env).filter(k => k.includes('MONGO')));

if (!process.env.MONGODB_URI) {
    console.error("CRITICAL: MONGODB_URI is undefined. Please check .env file.");
    process.exit(1);
}


const checkProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("Connected to DB");

        const count = await Product.countDocuments();
        console.log(`Total Products: ${count}`);

        const activeCount = await Product.countDocuments({ isActive: true });
        console.log(`Active Products: ${activeCount}`);

        if (count > 0) {
            const products = await Product.find().limit(3).select('name isActive packs categoryId');
            console.log("Sample Products:", JSON.stringify(products, null, 2));
        }

        await mongoose.disconnect();
    } catch (error) {
        console.error("Error:", error);
    }
};

checkProducts();
