import type {Request, Response} from "express";
import express from "express";
import asyncify from "express-asyncify";
import {deleteJaso, saveJaso, showJaso, updateJaso} from "@service/jaso/JasoService";
import JasoDto from "@service/jaso/JasoDto";

const router = asyncify(express.Router());

router.get('/show', async (req: Request, res: Response) => {
    return res.status(200).json(
        await showJaso(req.user.id)
    )
})

router.post('/save', async (req: Request, res: Response) => {
    const {oneLineIntroduce, jaso} = req.body;
    return res.status(200).json(
        await saveJaso(
            new JasoDto(oneLineIntroduce, jaso), req.user.id
        )
    )
})

router.put('/update/:id', async (req: Request, res: Response) => {
    const {oneLineIntroduce, jaso} = req.body;
    return res.status(200).json(
        await updateJaso(
            Number(req.params.id),
            new JasoDto(oneLineIntroduce, jaso), req.user.id
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


export default router;