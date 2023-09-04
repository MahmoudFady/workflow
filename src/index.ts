import * as dotenv from "dotenv";
dotenv.config();
import app from "./app/app";
import { AppDataSource } from "./app/data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("db connection success");
    app.listen(8080, () => {
      console.log("server is running on port 8080");
    });
  })
  .catch((error) => console.log(error));
