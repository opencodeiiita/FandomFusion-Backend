import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const UserAuthController = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      if(!username || !email || !password){
        return res.status(400).json({status: "error", error: "Insufficient data. Make sure to include username, email and password."})
      }

      if(!email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
        return res.status(400).json({status: "error", error: "Invalid Email."})
      }
            
      const usernameExists = await User.findOne({ username });
      if (usernameExists) {
        return res.status(400).json({ status: "error", error: "Given username is already used." });
      }
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ status: "error", error: "A user with that email is already registered." });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt)

      const user = new User({
        username,
        email,
        password: hashedPassword
      })

      await user.save()

      res.status(201).json({ status: "Ok", message: "Welcome to the FandomFusion Realm! Your identity has been secured. Start creating and sharing your lists today!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", error: "UpdateInfo failed check console for error" });
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      if(!username || !password){
        return res.status(400).json({status: "error", error: "Insufficient data. Make sure to include username and password."})
      }

      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ status: "error", error: "Invalid username or password." });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ status: "error", error: "Invalid username or password." });
      }

      const token = jwt.sign({ userID:user._id,userName:user.username }, process.env.JWT_SECRET);
      res.status(200).json({
        status: "Ok",
        message: "User logged successfully.",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          token: token
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", error: "UpdateInfo failed check console for error" });
    }
  },
};

export default UserAuthController;