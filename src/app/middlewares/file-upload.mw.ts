import { Request, Response, NextFunction } from "express";
import * as multer from "multer";
import * as sharp from "sharp";
import * as fs from "fs/promises";
const multerStorage = multer.memoryStorage();
const multerFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! please upload only images"), false);
  }
};

const resizeImage = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    return next();
  }

  try {
    req.file.filename = `user-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
      .resize({ width: 500, height: 500 })
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/images/users/${req.file.filename}`);

    next();
  } catch (err) {
    next(err);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadImageMiddleware = upload.single("image");
export { uploadImageMiddleware, resizeImage };