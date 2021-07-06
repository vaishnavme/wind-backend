const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];

    if(!token) {
        return res.status(403).json({
            success: false,
            message: "Invalid Token, Authentication failed!"
        })
    }
    try {
        const decode = jwt.verify(toke, secret);
        req.user = { userId: decode.userId }
        return next();
    } catch(err) {
        console.log(err) 
        res.json({
            success: false,
            message: "Invalid Token, Authentication failed!"
        })
    }
}

module.exports = verifyToken;