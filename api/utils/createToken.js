import jwt from "jsonwebtoken";

const createToken = (payload, expiresIn = "1d") => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

export default createToken;
