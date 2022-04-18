import Router from "express";
import passport from "passport";
import { resolve } from "path";

import AuthController from "../controllers/auth.controllers";
const router = Router();

router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);
router.post("/forgotPassword", AuthController.forgotPassword);
router.post("/resetPassword", AuthController.resetPassword);
router.put("/changePassword",
 // passport.authenticate("local"),
  AuthController.changePassword
);

export default router;
