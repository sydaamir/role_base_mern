import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
    try{
        const token = req.header('x-auth-token');
        if(!token)
            return res.status(401).json({msg: 'No authentication token, authorization denied.'});
        const JWT_SECRET = 'role-base-secret-key';
        const verifiedToken = jwt.verify(token, JWT_SECRET);
        if(!verifiedToken)
            return res.status(401).json({msg: 'Token verification failed, authorization denied.'});
        req.user = verifiedToken.id;
        next();


    }catch (error) {
        res.status(409).json({ message: error});
    }


}