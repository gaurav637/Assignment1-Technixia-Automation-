import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import 'dotenv/config';

export const verifyToken = (req,res,next)=> {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({
            status: 'fail',
            message: 'Unauthorized!',
        });
    }
    try{
        const user = jwt.verify(token, process.env.SECRET_KEY);
        req.user = user; 
        next();

    } catch(error){
        return res.status(401).json({ message: 'Unauthorized' });
    }
}