import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

export async function isLogin(req, res, next) {
    try {
        const decode = JWT.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );

        req.user = decode;
        next();

    } catch (error) {
        console.log(error.message);
        res.status(401).send({
            message: "Login is required!"
        })
    }
};

export async function isAdmin(req, res, next) {
    try {
        const user = await userModel.findById(req.user.id);
        if (user.role === 1) {
            next()
        }
        else {
            res.status(401).send("You cannot access this page!");
        }
    } catch (error) {
        console.log(error.message);
        res.status(401).send({
            message: "Login is required!"
        })
    }
};