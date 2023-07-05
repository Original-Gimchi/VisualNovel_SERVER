import express from "express";
import asyncify from "express-asyncify";
import signIn from "@service/auth/Auth";

const router = asyncify(express.Router());

router.post('/signin', (req, res) => {
    return signIn(
        new UserSignInDto(req.body.email, req.body.password)
    )
})


export default router;