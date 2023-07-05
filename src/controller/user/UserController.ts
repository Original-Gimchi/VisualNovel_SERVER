import express from "express";
import asyncify from "express-asyncify";
import UserService from "@service/user/UserService";
import SignUp from "@service/user/UserService";
import UserSignUpDto from "@service/user/UserSignUpDto";

const router = asyncify(express.Router());

router.post('/signup', (req, res) => {
    return SignUp(
        new UserSignUpDto(req.body.belonging, req.body.email, req.body.nickName, req.body.password)
    )
})


export default router;