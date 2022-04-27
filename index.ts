import express, { Request, Response, NextFunction, Application } from "express";
import routes from "./api/v1/routes/index";
import passport from "passport";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import cors from "cors";
import { JwtStrategy, strategy } from "./api/v1/common/config";
import {SignupViewModel} from "./api/v1/view-models/auth";
import path from "path";
import http from "http";
import DBConnation from './db.connation'

dotenv.config();
//creating App
const app: Application = express();

//Connecting to database
DBConnation.connect(process.env.MONGO_DB_CONNECTION_STRING ?? "")

// creating socket server using http server.;
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());
//strategy(passport);
JwtStrategy(passport);

app.use(express.json());
app.use(fileUpload());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
passport.serializeUser(function (user, done) { done(null, user); });
passport.deserializeUser(function (user: SignupViewModel, done) { return done(null, user); });

app.use("/public", express.static("public"));
app.use("/api", (req: Request, res: Response, next: NextFunction) => {
  // console.log("headers>>>>", req.headers.authorization, "<<<<<headers");
  // console.log("req.body>>>>", req.method, req.originalUrl, req.body, "<<<<<req.body");
  next();
}, routes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`App listening on ${PORT}`));

