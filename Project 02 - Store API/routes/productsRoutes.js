import { Router } from "express";
import { getAllProducts } from "../controllers/productsController.js";

const router = Router();

router.route('/').get(getAllProducts);

export default router;