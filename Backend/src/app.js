import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Creating app

const app = express();

// Express Middlewares

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
});

export default app;