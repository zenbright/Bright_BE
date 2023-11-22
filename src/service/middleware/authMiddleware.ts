import jwt, { VerifyErrors } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ACCESS_TOKEN_SECRET } from "../../config"
import User from '../../models/userCredentials'

interface User {
    account: string,
    role: string
}

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401).json("Token not found");
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        ACCESS_TOKEN_SECRET,
        async (err: VerifyErrors | null, decoded: any) => {
            if (err) return res.sendStatus(401).json({ "message": "This session is Expired. Please Login again" }); //invalid token
            const { account, role } = decoded;
            req.User = {
                account: account,
                role: role
            };
            next();
        }
    );
}

const verifyRoles = (roles: String[]) => {
    return (req: Request, res: Response, next: NextFunction) => {

        const User = req.User;
        if (!User || !User.role) {
            return res.sendStatus(401);
        }
        
        if(User && !roles.includes(User.role)) {
            return res.status(403).json({ message: `Forbidden, you are a ${User.role} and this service is only available for ${roles}` });
        }
        next();
    }
}

export {verifyJWT, verifyRoles}