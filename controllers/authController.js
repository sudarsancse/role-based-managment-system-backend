import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import UserData from "../models/usermodel.js";
// import dotenv from "dotenv";
// dotenv.config({ path: "../.env" });

export const test = (req, res) => {
  res.json({
    message: "Hello Sudarsan sarkar",
  });
};

export const register = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const existingUser = await UserData.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new UserData({ username, password: hashPassword, role });
    await newUser.save();

    res
      .status(201)
      .json({ message: `User registered with username ${username}` });
  } catch (error) {
    res.status(500).json({ message: `Somthing went worng` });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserData.findOne({ username });

    if (!user) {
      return res
        .status(404)
        .json({ message: `user with username : ${username} not fount` });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: ` Invalid credentails` });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRTE,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: `Somthing went worng` });
  }
};
