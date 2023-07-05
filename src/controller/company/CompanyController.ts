import type {Request, Response} from "express";
import express from "express";
import asyncify from "express-asyncify";
import {saveCompany, showFitCompany, showOneCompany} from "@service/company/CompanyService";

const router = asyncify(express.Router());

router.post('/company', async (req: Request, res: Response) => {
    return res.status(200).json(
        await saveCompany(
            req.body.companyName
        )
    )
})

router.get('/fit', async (req: Request, res: Response) => {
    return res.status(200).json(
        await showFitCompany(
            String(req.query.keyword)
        )
    )
})

router.get('/find', async (req: Request, res: Response) => {
    return res.status(200).json(
        await showOneCompany(
            <string>req.query.name
        )
    )
})


export default router;