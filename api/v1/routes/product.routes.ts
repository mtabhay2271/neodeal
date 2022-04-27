import Router from "express";

import ProductController from "../controllers/product.controller";
const router = Router();

router.post("/", ProductController.addProduct);
router.get("/", ProductController.getProducts);
router.get("/:productId", ProductController.getProductById);
router.put("/:productId", ProductController.updateProduct);
router.delete("/:productId", ProductController.deleteProduct);

export default router;
