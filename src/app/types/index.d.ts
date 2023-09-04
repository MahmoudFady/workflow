import Iuser from "./user.type";
declare module "express-serve-static-core" {
  export interface Request {
    user: Iuser;
  }
}
