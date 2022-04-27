import Router from "express";
import usersStatusRoutes from "./user-status.routes"
import authRoutes from "./auth.routes"
import orderStatusRoutes from "./order.routes"
import productStatusRoutes from "aaa/nd/27-04-neo_deal/api/v1/routes/product.routes"
const router = Router();
//router.use("/v1/user", users);
router.use("/v1/auth", authRoutes);
router.use("/v1/user/status", usersStatusRoutes);
router.use("/v1/order", orderStatusRoutes);
router.use("/v1/product", productStatusRoutes);


export default router;