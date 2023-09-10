import jwt from "jsonwebtoken";
import createHttpError from "http-errors";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      throw new createHttpError.BadRequest("Access denied, missing token");
    }
    const initalStr = "Bearer ";

    if (token.startsWith(initalStr)) {
      token = token.slice(initalStr.length, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message }); // Use "error.status" instead of "error.code"
  }
};
