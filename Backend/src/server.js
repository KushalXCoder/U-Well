import app from "./app.js";
import http from "http";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./connectDB.js";
import apiRoutes from "./Routes.js";

// Creating the server

const server = http.createServer(app);

// Mounting the router at api

app.use("/api", apiRoutes);

connectDB()
.then(() => {
    server.listen(process.env.PORT, () => {
        console.log(`Example app running on PORT ${process.env.PORT}`);
    });
})
.catch((error) => {
    console.error("Failed establishing connection with MongoDB", error);
});