import express from "express";
const router = express.Router();

import GptController from "@controller/user/UserController";


router.use('/gpt',GptController)


export default router;