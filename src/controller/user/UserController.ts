import express from "express";
import asyncify from "express-asyncify";
import UserService from "@service/user/UserService";
import SignUp from "@service/user/UserService";
import UserSignUpDto from "@service/user/UserSignUpDto";

const router = asyncify(express.Router());

router.post('/signup', async (req, res) => {
    const {belonging, email, nickName, password} = req.body;
    res.status(200).json(
        await SignUp(
            new UserSignUpDto(belonging, email, nickName, password)
        )
    )
})


export default router;