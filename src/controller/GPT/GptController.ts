import express from "express";
import asyncify from "express-asyncify";
const router = asyncify(express.Router());

router.post('/', (req, res) => {
    return res.send('Hello World!')
})


export default router;