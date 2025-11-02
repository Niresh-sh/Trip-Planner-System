import jwt from "jsonwebtoken";
import UserModel from "../Models/UserModel.js";

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECURE);

    // Fetch the full user from DB
    const user = await UserModel.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user; // Attach full Mongoose document

    if (req.user && req.user.id && !req.user._id) {
      req.user._id = req.user.id; // normalize shape for controllers that expect _id
    }
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default verifyToken;
