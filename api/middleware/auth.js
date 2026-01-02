import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Not authorised, login again" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    res.json({ success: false, message: "Error" });
  }
};

export const protectAdmin = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Not authorized" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const role = decoded.role?.toLowerCase();

    if (role !== "admin" && role !== "superadmin") {
      return res
        .status(403)
        .json({ success: false, message: "Admin access only" });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

// export default {authMiddleware, protectAdmin};
