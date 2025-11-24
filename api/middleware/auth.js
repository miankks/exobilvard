import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    const {token} = req.headers;
    if (!token) {
        return res.json({success: false, message: 'Not authorised, login again'})
    }

    try {
        const token_decode= jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next()
    } catch (error) {
        console.log(error);
        res.json({success:false, message: 'Error'})
    }
}

export const protectAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer token
    if (!token) return res.status(401).json({ success: false, message: "Not authorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "admin") return res.status(403).json({ success: false, message: "Admin access only" });
        req.admin = decoded;
        next();
    } catch (err) {
        res.status(401).json({ success: false, message: "Invalid token" });
    }
};

export default {authMiddleware, protectAdmin};