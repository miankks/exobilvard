import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
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
    const header = req.headers.authorization;
    
    if (!header) {
        return res.status(401).json({ success: false, message: "Not authorized" });
    }
    
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "admin" && decoded.role !== "superadmin") {
            return res.status(403).json({ success: false, message: "Admin access only" });
        }
        req.admin = decoded;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid token" });
    }
};

// export default {authMiddleware, protectAdmin};