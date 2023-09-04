import * as path from "path";
import user from "../entity/User";
import * as fs from "fs";
import { AppDataSource } from "../data-source";

const userRepository = AppDataSource.getRepository(user);

export const create = async (data: any) => {
  return await userRepository.save(data);
};
export const updateImage = async (id: string, imagePath: string) => {
  const oldData = await userRepository.findOne({ where: { id: id } });
  const data = await userRepository.update(id, { image: imagePath });
  if (!data) return null;
  fs.unlinkSync(
    path.join(
      __dirname,
      "../../../public/images/users/",
      path.basename(oldData.image)
    )
  );

  return data;
};
