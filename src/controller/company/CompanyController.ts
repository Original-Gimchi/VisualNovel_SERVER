import express from "express";
import asyncify from "express-asyncify";
import signIn from "@service/auth/Auth";
import {saveCompany, showFitCompany, showOneCompany} from "@service/company/CompanyService";

const router = asyncify(express.Router());

router.post('/company', async (req, res) => {
    return res.status(200).json(
        await saveCompany(
            req.body.companyName
        )
    )
})

router.get('/fit', async (req, res) => {
    return res.status(200).json(
        await showFitCompany(
            String(req.query.keyword)
        )
    )
})

router.get('/:name', async (req, res) => {
    return res.status(200).json(
        await showOneCompany(
            req.body.companyName
        )
    )
})


export default router;