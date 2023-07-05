import type {Request, Response} from "express";
import express from "express";
import asyncify from "express-asyncify";
import {autoUpdateJaso, deleteJaso, grantJaso, saveJaso, showJaso, updateJaso} from "@service/jaso/JasoService";
import JasoDto from "@service/jaso/JasoDto";
import GPTChatService from "@service/GPT/GPTChatService";
import GPTChatServiceDto from "@service/GPT/GPTChatServiceDto";

const router = asyncify(express.Router());

router.get('/show', async (req: Request, res: Response) => {
    return res.status(200).json(
        await showJaso(req.user.id)
    )
})

router.post('/create', async (req: Request, res: Response) => {
    const {company, job, skills, record, quest, experience, max} = req.body;
    return res.status(200).json(
        await GPTChatService(
            new GPTChatServiceDto(
                company, job, skills, record, quest, experience, max
            )
        )
    )
})


router.post('/save', async (req: Request, res: Response) => {
    const {title, oneLineIntroduce, jaso} = req.body;
    return res.status(200).json(
        await saveJaso(
            new JasoDto(title, oneLineIntroduce, jaso), req.user.id
        )
    )
})
router.put('/update/auto', async (req: Request, res: Response) => {
    return res.status(200).json(
        await autoUpdateJaso(
            req.body.content
        )
    )
})

router.put('/update/:id', async (req: Request, res: Response) => {
    const {title, oneLineIntroduce, jaso} = req.body;
    return res.status(200).json(
        await updateJaso(
            Number(req.params.id),
            new JasoDto(title, oneLineIntroduce, jaso), req.user.id
        )
    )
})


router.delete('/delete/:id', async (req: Request, res: Response) => {
    return res.status(200).json(
        await deleteJaso(
            Number(req.params.id), req.user.id
        )
    )
})
router.post('/grant', async (req: Request, res: Response) => {
    const {jasoId, grantUserId} = req.body;
    return res.status(200).json(
        await grantJaso(jasoId, req.user.id, grantUserId)
    )
})


export default router;