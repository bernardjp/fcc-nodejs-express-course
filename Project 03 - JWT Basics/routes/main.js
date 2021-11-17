import { Router } from "express";
import { login, dashboard } from "../controllers/main.js";
import authMiddleware from "../middleware/auth.js";

const router = Router();

router.route('/login').post(login);
router.route('/dashboard').get(authMiddleware, dashboard);

export default router;
