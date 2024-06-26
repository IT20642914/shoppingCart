
import bcrypt from "bcrypt";  
import cookieParser from "cookie-parser";
import Customers from "../models/customers.js";
import generateTokens from "../JWT/generateTokens.js";
import logger from "../utils/logger.js";

import {
	signUpBodyValidation,
	logInBodyValidation,
} from "../utils/validationSchema.js";

//login
export const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = logInBodyValidation(req.body);
    if (error)
      return res
        .status(403)
        .json({ error: true, message: error.details[0].message });

    const user = await Customers.findOne({ Email: email });
    console.log("first", email, user)
    logger.info(user);
    if (!user) {
      const response = {
        states: 404,
        message: "User Doesn't Exist"
      };
      return res.status(403).json(response);
    }

    // Check if the passwords match
    if (password !== user.Password) {
      return res.status(401).json({
        error: "Wrong Email and password combination",
        message: "Wrong Email and password combination"
      });
    } else {
      // Passwords match, generate tokens
      const { accessToken, refreshToken } = await generateTokens(user);
      const userName = user.Name;
      const id = user._id;
      const email = user.Email;
      res.status(200).json({
        error: false,
        accessToken,
        refreshToken,
        id,
        userName,
        email,
        message: `${user.Name} Logged in successfully`
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};



//Registation
export const handleRegistration = async (req, res) => {
  try {
    const { error } = signUpBodyValidation(req.body);
    if (error) return res.status(403).json({ error: true, message: error.details[0].message });

    const { username, email, password } = req.body;
    const userByEmail = await Users.findOne({ email: email });
    // const userByUsername = await Users.findOne({ username: username });

    if (userByEmail) {
      return res.status(409).json({ message: "Email address is already used" });
    } else {
      const salt = await bcrypt.genSalt(10);  // Generate salt
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new Users({
        ...req.body,
        password: hashedPassword  // Use the hashed password
      });
      
      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};


const GetRefreshToken=async()=>{
  console.log("hello get token")
}
