import { Router } from "express";
import whatsappBot from "../bot/whatsappBot.js";
const router = Router();

router.use("/", whatsappBot);

export default router;
