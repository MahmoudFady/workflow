import * as express from "express";
import * as cors from "cors";
import * as path from "path";
import * as expressBusboy from "express-busboy";
import notFoundMw from "./middlewares/not-found.mw";
import errorMw from "./middlewares/error.mw";
import "reflect-metadata";
const app = express();
app.use(express.urlencoded({ extended: true }));
expressBusboy.extend(app);
app.use(express.json());
app.use(cors());
app.use(
  "/public",
  express.static(path.join(__dirname, "../../public/images/", "users"))
);
app.use(notFoundMw);
app.use(errorMw);

export default app;
