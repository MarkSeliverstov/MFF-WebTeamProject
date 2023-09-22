import express from "express";
import {
    startCrawling,
    stopCrawling
} from "./controller";


export const router = express.Router();

router.post("/crawler/start/:id", startCrawling);
router.post("/crawler/abort/:id", stopCrawling);