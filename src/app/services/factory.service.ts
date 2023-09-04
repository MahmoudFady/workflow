import { DeepPartial, Repository } from "typeorm";

class DataBaseServices<T> {
  constructor(private repository: Repository<T>|any) {
    this.repository = repository;
  }
  create =  async (data: any) => {
    return await this.repository.save(data);
  };
  getAll = async() => {
    return await this.repository.find();
  };
  getById = async(id: string) => {
    return await this.repository.findOne({where:{id:id}});
  };

  delete = async (id: string)=> {
    return await this.repository.delete(id);
  };

  update = async (id: string , data :DeepPartial<T>)=> {
    return await this.repository.update(id, data);
  };

  getAllPagination = async (
    projection?:{},
    page?: number,
    limit?: number,
    sortOptions?: { field: string; order: "ASC" | "DESC" }[],
    sortOption?: {},
  ) => {
    let skip = limit * (page - 1);
    let totalItems = await this.repository.count();
    let totalPages = Math.ceil(totalItems / limit);

    if (Object.keys(sortOption).length === 1) {
      let result = await this.repository.find({
        select:projection,
        skip: skip,
        take: limit,
        order: sortOption
      });
      return { result, totalItems, page, totalPages, skip, limit };
    } else {
      const orderArray = sortOptions.map((sortOption) => ({
        [sortOption.field]: sortOption.order,
      }));
      const order = orderArray.reduce((acc, item) => {
        const field = Object.keys(item)[0];
        const value = item[field];
        acc[field] = value;
        return acc;
      }, {});

      let result = await this.repository.find({
        select:projection,
        skip: skip,
        take: limit,
        order: order,
      });
      return { result, totalItems, page, totalPages, skip, limit };
    }
  };
}

export default DataBaseServices;
