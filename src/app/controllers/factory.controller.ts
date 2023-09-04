import { Request, Response, NextFunction } from "express";
import APIError from "../utils/error.util";
import resUtil from "../utils/response.util";
import DataBaseServices from "../services/factory.service";
import { Repository } from "typeorm";
import { callSearchEngine } from "../utils/filter";
import getSchemaAttributes from "../utils/get-model-options.util";
class ControllerFactory<T> {
  private successMsg = "data fetched successfully";
  private noDataMsg = "data doesn't exist";
  DataBaseServices: DataBaseServices<T>;
  constructor(private Model: Repository<T>) {
    this.DataBaseServices = new DataBaseServices(this.Model);
  }
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.file) {
        req.body["image"] = req.file.filename;
      }
      const data = await this.DataBaseServices.create(req.body);
      resUtil(req, res, "CREATED", this.successMsg, { data });
    } catch (err) {
      next(new APIError(err.message, err.statusCode));
    }
  };
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.DataBaseServices.getAll();
      resUtil(req, res, "OK", this.successMsg, { result });
    } catch (err) {
      next(new APIError(err));
    }
  };

  getById =
    (paramName: string) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = await this.DataBaseServices.getById(req.params[paramName]);
        if (!data) resUtil(req, res, "NOT_FOUND", this.noDataMsg);
        resUtil(req, res, "OK", this.successMsg, { data });
      } catch (err) {
        next(new APIError(err.message));
      }
    };

  updateById =
    (paramName: string) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = await this.DataBaseServices.update(
          req.params[paramName],
          req.body
        );
        if (!data) resUtil(req, res, "NOT_FOUND", this.noDataMsg);
        resUtil(req, res, "OK", "data updated successfully", {
          data: req.body,
        });
      } catch (err) {
        next(new APIError(err.message));
      }
    };

  delete =
    (paramName: string) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const deleteResult = await this.DataBaseServices.delete(
          req.params[paramName]
        );
        if (deleteResult.affected === 0) {
          resUtil(req, res, "NOT_FOUND", this.noDataMsg);
        } else {
          resUtil(req, res, "OK", "data deleted successfully");
        }
      } catch (err) {
        next(new APIError(err));
      }
    };

  getAllPagination =
    (projection: {}) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 10;
        const sortFields = req.query.sortBy as string[];
        const sortValues = req.query.sortValue as string[];
        const sortOptions: { field: string; order: "ASC" | "DESC" }[] = [];
        const sortOption: {} = {};

        if (Array.isArray(sortFields)) {
          sortFields.forEach((field, index) => {
            if (sortValues[index] === "ASC" || sortValues[index] === "DESC") {
              sortOptions.push({
                field,
                order: sortValues[index] as "ASC" | "DESC",
              });
            }
          });
        } else {
          sortOption[req.query.sortBy as string] = req.query.sortValue;
        }

        const result = await this.DataBaseServices.getAllPagination(
          projection,
          page,
          limit,
          sortOptions,
          sortOption
        );
        res.status(201).json({ ...result });
      } catch (err) {
        next(new APIError(err));
        console.log(err.message);
      }
    };

  getWithFeatures = (entity) => async (req: Request, res: Response) => {
    try {
      const entityName = entity.name.toLowerCase();
      const users = await callSearchEngine(
        entity,
        req.body,
        req.query,
        entityName
      );
      return resUtil(req, res, "OK", "data retrieved successfully", {
        length: users.data.length,
        users,
      });
    } catch (err) {
      console.log(err);
    }
  };

  getOptions = (entity) => async (req: Request, res: Response) => {
    const options = await getSchemaAttributes(entity);
    resUtil(req, res, "OK", "entity options", { attributes: options });
  };
}
export default ControllerFactory;
