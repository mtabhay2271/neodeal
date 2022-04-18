import Router from "express";
//import users from "./user.routes"
import authRoutes from "./auth.routes"

const router = Router();
//router.use("/v1/user", users);
router.use("/v1/auth", authRoutes);


export default router;