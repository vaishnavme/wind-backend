const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];

    if(!token) {
        return res.status(401).json({
            success: false,
            message: "Invalid Token, Authentication failed!"
        })
    }
    try {
        const decode = jwt.verify(token, secret);
        req.user = { userId: decode.userId }
        return next();
    } catch(err) {
        console.log(err) 
        res.status(401).json({
            success: false,
            message: "Invalid Token, Authentication failed!"
        })
    }
}

module.exports = verifyToken;