import type {NextFunction, Request, Response} from "express";
import {findUserByIdNotNull} from "@utils/database/Reposiotory";
import {JWT_SECRET} from "@src/utils/env/env";

const jwt = require('jsonwebtoken');


const validateToken = async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization
        const data = jwt.verify(token, JWT_SECRET)

        req.user = await findUserByIdNotNull(data.id)

        next()
}

export default validateToken;