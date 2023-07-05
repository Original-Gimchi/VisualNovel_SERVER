import type {Request, Response} from "express";
import express from "express";
import asyncify from "express-asyncify";
import signIn from "@service/auth/Auth";
import UserSignInDto from "@service/auth/SignInDto";

const router = asyncify(express.Router());

router.post('/signin', async (req: Request, res: Response) => {
    const {email, password} = req.body;
    return res.status(200).json(
        await signIn(
            new UserSignInDto(email, password)
        )
    )
})


export default router;