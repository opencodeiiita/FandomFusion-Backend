import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dbURL from "./src/config/db.config.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get("/", (req, res) => {
    res.send("Hello World");
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}! 🚀`);
});
mongoose.connect(dbURL)
.then(() => {
    console.log("Successfully connected to MongoDB Atlas");
})
.catch(err => {
    console.log("Could not connect to MongoDB Atlas. Exiting now...", err);
    process.exit();
});

