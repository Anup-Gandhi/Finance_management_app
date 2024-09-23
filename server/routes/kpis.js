import express from "express";

const router = express.Router();
router.get
    try{
        const kpis = await KPI.find();
    }catch(error){
        res.status(404).json({ message: error.message});
    }
export default router;