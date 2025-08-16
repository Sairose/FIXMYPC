import { verifyToken } from "../utils/JWTtoken.js";

const auth = (req, res, next) =>{
    const cookie = req.headers.cookie; 

    //check if cookie exist
    if(!cookie) return res.status(401).send("cookie not valid");

    //getting token
    const token = cookie.split('=')[1];
    const isValidToken = verifyToken(token);

    if(!isValidToken) return res.status(401).send("Token not valid");

    req.user = isValidToken;
    console.log(isValidToken);
    next();
}


export {auth}