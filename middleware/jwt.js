const jwt = require("jsonwebtoken");
const SECRET_KEY = "SCHOOL1234";

const authenticateToken = (req,res,next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendstatus(401)


        jwt.verify(token , SECRET_KEY ,(err , user)=>{
             console.error("JWT verification error:", err);
             if(err) return res.sendStatus(403);
             
     
             req.user = user;
             next();
     
     
             
         })
}


module.exports = authenticateToken