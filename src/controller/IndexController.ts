import express from "express";
const router = express.Router();
import GptController from "@src/controller/GPT/GptController";



router.use('/gpt',GptController)


export default router;