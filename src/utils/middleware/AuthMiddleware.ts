import type {NextFunction, Request, Response} from "express";
import {User} from "@src/domain/user/User";
import {findUserByIdNotNull} from "@utils/database/Reposiotory";

const jwt = require('jsonwebtoken');
const {getConnection} = require("../models/connector");
const {jwtSecret} = require("../config/env");

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization
        const data = jwt.verify(token, jwtSecret)

        req.user = await findUserByIdNotNull(data.id)

        next()
    } catch (err) {
        return res.status(410).json(err)
    }
}

module.exports = validateToken;