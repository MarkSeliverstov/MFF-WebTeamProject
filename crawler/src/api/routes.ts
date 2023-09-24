import express from "express";
import {
    startCrawling,
    stopCrawling
} from "./controller";


export const router = express.Router();

router.get("/crawler/start/:id", startCrawling);
router.get("/crawler/abort/:id", stopCrawling);