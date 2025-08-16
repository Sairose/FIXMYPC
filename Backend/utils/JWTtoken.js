import jwt from 'jsonwebtoken';

const generateToken = (user)=>{
    return jwt.sign({ id: user._id, role: user.role }, process.env.MY_JWT_KEY, {
        expiresIn: '1D'
    });
}

const verifyToken = (token) =>{
    return jwt.verify(token, process.env.MY_JWT_KEY);
}


export {generateToken, verifyToken};