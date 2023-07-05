import express from "express";
import asyncify from "express-asyncify";
import signIn from "@service/auth/Auth";

const router = asyncify(express.Router());

router.post('/signin', async (req, res) => {
    const {email,password} = req.body;
    return res.status(200).json(
        await signIn(
            new UserSignInDto(email,password)
        )
    )
})


export default router;