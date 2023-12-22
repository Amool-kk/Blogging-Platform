const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded.userId;
        next();
    } catch (error) {
        console.error(error);
        res.clearCookie("token");
        res.status(401).json({ message: "Invalid token" });
    }
}