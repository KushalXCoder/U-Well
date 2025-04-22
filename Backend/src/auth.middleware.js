import jwt from "jsonwebtoken";

const authenticateUser = async (req,res,next) => {
    try {
        const token = req.cookies.authToken;

        if(!token) {
            return res.status(401).json({error: "No token found. Redirecting to login.", redirectTo: "/login"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log("Authentication Failed", error);
        return res.status(400).json({error: "Invalid or expired token. Please log in again.", user: null});
    }
};

export default authenticateUser;