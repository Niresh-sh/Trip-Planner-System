import User from "../Models/UserModel.js";
import jwt from "jsonwebtoken";

const checkAdminModels = async (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Please Login" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Please Login" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.SECURE);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }


    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    if (user.role === "admin") {
   
      req.user = user;
      console.log('User attached to request:', req.user);  
      next();
    } else {
      return res.status(401).json({ message: "You are not an admin" });
    }
  } catch (e) {
    console.error("Admin middleware error: ", e);
    return res.status(400).json({ message: "Something went wrong. Please try again." });
  }
};

export default checkAdminModels;
