import type {Request, Response} from "express";
import express from "express";
import asyncify from "express-asyncify";
import {autoUpdateJaso, deleteJaso, grantJaso, saveJaso, showJaso, updateJaso} from "@service/jaso/JasoService";
import JasoDto from "@service/jaso/JasoDto";

const router = asyncify(express.Router());

router.get('/show', async (req: Request, res: Response) => {
    return res.status(200).json(
        await showJaso(req.user.id)
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

router.put('/update/:id', async (req: Request, res: Response) => {
    const {title, oneLineIntroduce, jaso} = req.body;
    return res.status(200).json(
        await updateJaso(
            Number(req.params.id),
            new JasoDto(title, oneLineIntroduce, jaso), req.user.id
        )
    )
})

router.put('/update/auto/:id', async (req: Request, res: Response) => {
    const {jasoContent, jasoId,} = req.body;
    return res.status(200).json(
        await autoUpdateJaso(
            jasoContent,
            jasoId,
            req.user.id
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