const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");

dotenv.config()

const app = express();
const PORT = process.env.PORT || 8000;

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 100,
    max: 100,
    message: "Too many requests from this IP, please try again later."
});

app.use(apiLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error ", err));

const routes = require("./routes");
app.use("/api", routes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});