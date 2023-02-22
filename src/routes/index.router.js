import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
   
    return res.send("ChatBot Encendido... 🚀");
  });

  export default router;