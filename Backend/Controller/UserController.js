import UserModel from "../Models/UserModel.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import UserTokenModel from "../Models/UserTokenModel.js";

const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ messsage: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "invalid password" });
    }
    const token = jsonwebtoken.sign(
      { id: user._id, email: user.email },
      process.env.SECURE,
      { expiresIn: "1d" }
    );
    const userToken = await UserTokenModel.create({ userId: user._id, token });
    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      token,
      message: "User logged in successfully",
    });
  } catch (e) {
    console.log(e.message);
  }
};

const RegisterController = async (req, res) => {
  try {
      

    const { firstName, lastName, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password does not match" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    res.status(200).json({ user, message: "User created successfully" });
  } catch (e) {
    console.log(e.message);
  }
};

const LogoutController = async (req, res) => {
  try {
    const { token } = req.headers;
    const splitToken = token.split(" ")[1];
    const decoded = jsonwebtoken.verify(splitToken, process.env.SECURE);
    req.user = decoded;
    const userToken = await UserTokenModel.findOneAndDelete({
      userId: req.user.id,
    });
    res.status(200).json({ message: "User Logged out Successfully" });
  } catch (e) {
    console.log(e.message);
  }
};

const GetAllUserController = async (req, res) => {
  try {
    const user = await UserModel.find();
    res
      .status(200)
      .json({ success: true, user, message: "User fetched successfully" });
  } catch (e) {
    console.log(e.message);
  }
};

export {
  LoginController,
  RegisterController,
  LogoutController,
  GetAllUserController,
};
