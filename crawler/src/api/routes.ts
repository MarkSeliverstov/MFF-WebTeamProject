import express from "express";
import {
    startCrawling,
    stopCrawling,
    pingCrawler
} from "./controller";


export const router = express.Router();

router.get("/crawler/start/:id", startCrawling);
router.get("/crawler/abort/:id", stopCrawling);
router.get("/", pingCrawler);