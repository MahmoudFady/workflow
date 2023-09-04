import { getRepository, SelectQueryBuilder, EntityTarget } from "typeorm";
import { AppDataSource } from "../data-source";

class Filter<TEntity extends object> {
  query: any;
  queryBody: any;
  entity: EntityTarget<TEntity>;
  entityName: String;

  constructor(
    queryBody: any,
    query: any,
    entity: EntityTarget<TEntity>,
    entityName: string
  ) {
    this.queryBody = queryBody;
    this.query = query;
    this.entity = entity;
    this.entityName = entityName;
  }

  filter(): SelectQueryBuilder<TEntity> {
    const filterObj = { ...this.queryBody };

    const queryBuilder = AppDataSource.getRepository(
      this.entity
    ).createQueryBuilder(this.entityName as string);
    const keys = Object.keys(filterObj);
    if (keys.length > 0) {
      for (const key of keys) {
        if (typeof filterObj[key] === "string") {
          queryBuilder.andWhere(`${this.entityName}.${key} LIKE :${key}`, {
            [key]: `${filterObj[key]}%`,
          });
        } else {
          queryBuilder.andWhere(`${this.entityName}.${key} = :${key}`, {
            [key]: filterObj[key],
          });
        }
      }
    }
    return queryBuilder;
  }

  fields(): any {
    if (!this.query.fields) {
      return null; // Return null to indicate selecting all fields
    }
    const arrayOfFields = [];
    const fields = this.query.fields.split(",");
    for (const field of fields) {
      console.log(field);
      arrayOfFields.push(`${this.entityName}.${field}`); // Push the string directly
    }
    return arrayOfFields;
  }

  sort(
    addOrderByCallback: (
      sort: string,
      order: "ASC" | "DESC"
    ) => SelectQueryBuilder<TEntity>,
    option: string = "id"
  ): void {
    let sortArray = [];
    if (this.query.sort) {
      const typeOfSort = this.query.sort.split(",").join(" ");
      sortArray = this.checkTypeOfSort(typeOfSort);
    } else {
      sortArray = this.checkTypeOfSort(option);
    }

    for (const item of sortArray) {
      const [sort, order] = item.split(",");
      addOrderByCallback(sort, order.trim().toUpperCase() as "ASC" | "DESC");
    }
  }

  checkTypeOfSort(typeOfSort: string): string[] {
    const sortArray = [];
    const typeOfSortArray = typeOfSort.split(" ");

    for (const item of typeOfSortArray) {
      let order: string;
      let sort: string;

      if (item.startsWith("-")) {
        order = "DESC";
        sort = item.substring(1);
      } else {
        order = "ASC";
        sort = item;
      }

      sortArray.push(`${this.entityName}.${sort}, ${order}`);
    }

    return sortArray;
  }

  pagination(): { limit: number; skip: number; page: number } {
    const DEFAULT_PAGE_NUMBER = 1;
    const DEFAULT_LIMIT = 10;

    const page = Math.abs(this.query.page) || DEFAULT_PAGE_NUMBER;
    const limit = Math.abs(this.query.limit) || DEFAULT_LIMIT;
    const skip = (page - 1) * limit;
    return {
      limit,
      skip,
      page,
    };
  }
}

async function callSearchEngine<TEntity extends object>(
  entity: EntityTarget<TEntity>,
  queryBody: any,
  query: any,
  entityName: string
): Promise<any> {
  const features = new Filter(queryBody, query, entity, entityName);

  const { limit, skip, page } = features.pagination();

  //{{url}}/get?lastName=u&page=2&limit=1
  const queryBuilder: SelectQueryBuilder<TEntity> = features.filter();
  features.sort((sort, order) => queryBuilder.addOrderBy(sort, order));
  const dataStored = await AppDataSource.getRepository(entity).count();
  let totalItems = dataStored;
  let totalPages = Math.ceil(totalItems / limit);

  const data = await queryBuilder
    .skip(skip)
    .take(limit)
    .select(features.fields())
    .getMany();

  return { data, limit, skip, page, totalItems, totalPages };
}

export { Filter, callSearchEngine };
