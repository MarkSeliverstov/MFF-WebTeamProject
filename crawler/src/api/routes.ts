import express from "express";
import {
    startCrawling,
    stopCrawling
} from "./crawlerController";


export const router = express.Router();

router.post("/crawling/start/:id", startCrawling);
router.post("/crawling/abort/:id", stopCrawling);