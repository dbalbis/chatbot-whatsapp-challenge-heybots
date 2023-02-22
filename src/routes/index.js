import { Router } from "express";
import indexRouter from"./index.router.js"
import whatsAppRouter from "./whatsappBot.router.js"

const router = Router();

/* Index */
router.use('/', indexRouter);
/* Whatsapp Bot */
router.use("/whatsappbot", whatsAppRouter)


export default router;