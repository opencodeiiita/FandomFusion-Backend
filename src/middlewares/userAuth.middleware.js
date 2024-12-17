import jwt from "jsonwebtoken";

const { verify } = jwt;

// Middleware to verify user JWT token
const userAuthMiddleware = (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: Token missing" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = verify(token, process.env.JWT_SECRET);

    if (!decoded.userID || !decoded.userName) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    req.user = {
      id: decoded.userID,
      username: decoded.userName,
    };

    next();
  } 
  catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid or expired token" });
  }
};

export default userAuthMiddleware;
